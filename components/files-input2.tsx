"use client";

import { FileDropzone } from "./ui/dropzone";
import { FileList } from "./ui/filelist";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";

export type S3UploadedFile = {
    key: string;
    etag: string;
    size: number;
    type: string;
    originalName: string;
    url: string;
};

type PresignedUpload = {
    key: string;
    url: string;
    publicUrl: string;
    headers: Record<string, string>;
};

interface FilesInput2Props {
    accept: string;
    s3BucketDirectory: string;
    onUploadedFiles?: (files: S3UploadedFile[]) => void;
    onUploadingChange?: (isUploading: boolean) => void;
}

function uploadFileToS3(
    file: File,
    presignedData: PresignedUpload,
    onProgress: (progress: number) => void
): Promise<S3UploadedFile> {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener("progress", (event) => {
            if (event.lengthComputable) {
                onProgress(Math.round((event.loaded / event.total) * 100));
            }
        });

        xhr.addEventListener("load", () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                const etag = xhr.getResponseHeader("ETag")?.replace(/"/g, "") || "";
                resolve({
                    key: presignedData.key,
                    etag,
                    size: file.size,
                    type: file.type,
                    originalName: file.name,
                    url: presignedData.publicUrl,
                });
                return;
            }

            reject(new Error(`upload_failed:${file.name}`));
        });

        xhr.addEventListener("error", () => {
            reject(new Error(`upload_failed:${file.name}`));
        });

        xhr.open("PUT", presignedData.url);
        Object.entries(presignedData.headers).forEach(([header, value]) => {
            xhr.setRequestHeader(header, value);
        });
        xhr.send(file);
    });
}

export default function FilesInput2({
    accept,
    s3BucketDirectory,
    onUploadedFiles,
    onUploadingChange,
}: FilesInput2Props) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [s3UploadedFiles, setS3UploadedFiles] = useState<S3UploadedFile[]>([]);
    const [fileProgresses, setFileProgresses] = useState<Record<string, number>>({});
    const [uploadingCount, setUploadingCount] = useState(0);
    const isUploading = uploadingCount > 0;

    useEffect(() => {
        onUploadingChange?.(isUploading);
    }, [isUploading, onUploadingChange]);

    useEffect(() => {
        onUploadedFiles?.(s3UploadedFiles);
    }, [s3UploadedFiles, onUploadedFiles]);

    const updateS3UploadedFiles = (updater: (prev: S3UploadedFile[]) => S3UploadedFile[]) => {
        setS3UploadedFiles((prev) => updater(prev));
    };

    const uploadFiles = async (newFiles: File[]) => {
        if (newFiles.length === 0) return;

        setUploadingCount((count) => count + 1);
        setUploadedFiles((prev) => [...prev, ...newFiles]);
        newFiles.forEach((file) => {
            setFileProgresses((prev) => ({ ...prev, [file.name]: 0 }));
        });

        try {
            const presignResponse = await fetch("/api/uploads/presign", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    directory: s3BucketDirectory,
                    files: newFiles.map((file) => ({
                        name: file.name,
                        type: file.type,
                        size: file.size,
                    })),
                }),
            });

            const presignJson = await presignResponse.json();
            if (!presignResponse.ok || !presignJson.uploads) {
                throw new Error(presignJson.error || "presign_failed");
            }

            const uploads = presignJson.uploads as PresignedUpload[];
            const uploadedResults = await Promise.all(
                newFiles.map((file, index) =>
                    uploadFileToS3(file, uploads[index], (progress) => {
                        setFileProgresses((prev) => ({
                            ...prev,
                            [file.name]: progress,
                        }));
                    })
                )
            );

            updateS3UploadedFiles((prev) => [...prev, ...uploadedResults]);
        } catch (error) {
            const failedNames = new Set(newFiles.map((file) => file.name));

            setUploadedFiles((prev) => prev.filter((file) => !failedNames.has(file.name)));
            setFileProgresses((prev) => {
                const next = { ...prev };
                newFiles.forEach((file) => {
                    delete next[file.name];
                });
                return next;
            });

            toast.error("Error", {
                description: error instanceof Error ? error.message : "Upload failed",
            });
        } finally {
            setUploadingCount((count) => Math.max(0, count - 1));
        }
    };

    const handleFileSelect = (files: FileList | null) => {
        if (!files) return;
        void uploadFiles(Array.from(files));
    };

    const handleBoxClick = () => {
        fileInputRef.current?.click();
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        handleFileSelect(e.dataTransfer.files);
    };

    const removeFile = (filename: string) => {
        setUploadedFiles((prev) => prev.filter((file) => file.name !== filename));
        setFileProgresses((prev) => {
            const next = { ...prev };
            delete next[filename];
            return next;
        });
        updateS3UploadedFiles((prev) =>
            prev.filter((file) => file.originalName !== filename)
        );
    };

    return (
        <div className="w-full">
            <FileDropzone
                accept={accept}
                fileInputRef={fileInputRef}
                handleBoxClick={handleBoxClick}
                handleDragOver={handleDragOver}
                handleDrop={handleDrop}
                handleFileSelect={handleFileSelect}
            />
            <FileList
                uploadedFiles={uploadedFiles}
                fileProgresses={fileProgresses}
                removeFile={removeFile}
            />
        </div>
    );
}
