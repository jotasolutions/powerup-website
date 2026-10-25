import { Upload } from "lucide-react";
import React, { RefObject } from "react";

export type DropzoneLabels = { title: string; or: string; browse: string };

const defaultLabels: DropzoneLabels = { title: "Sube tu carta", or: "o,", browse: "haz click para buscar" };

interface FileDropzoneProps {
  accept: string;
  fileInputRef: RefObject<HTMLInputElement | null>;
  handleBoxClick: () => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent) => void;
  handleFileSelect: (files: FileList | null) => void;
  labels?: DropzoneLabels;
}

export function FileDropzone({
  accept,
  fileInputRef,
  handleBoxClick,
  handleDragOver,
  handleDrop,
  handleFileSelect,
  labels = defaultLabels,
}: FileDropzoneProps) {
  return (
    <div className="">
      <div
        className="border-2 border-dashed border-border rounded-md px-8 py-4 flex flex-col items-center justify-center text-center cursor-pointer"
        onClick={handleBoxClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="mb-2 bg-muted rounded-full p-3">
          <Upload className="h-5 w-5 text-muted-foreground" />
        </div>
        <p className="text-sm font-medium text-foreground">
          {labels.title}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          {labels.or}{" "}
          <label
            htmlFor="fileUpload"
            className="text-primary hover:text-primary/90 font-medium cursor-pointer"
            onClick={(e) => e.stopPropagation()} // Prevent triggering handleBoxClick
          >
            {labels.browse}
          </label>{" "}
          (4MB max)
        </p>
        <input
          type="file"
          id="fileUpload"
          ref={fileInputRef}
          className="hidden"
          accept={accept}
          onChange={(e) => handleFileSelect(e.target.files)}
        />
      </div>
    </div>
  );
}