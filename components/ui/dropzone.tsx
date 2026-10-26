import { Plus, Upload } from "lucide-react";
import React, { RefObject } from "react";

export type DropzoneLabels = { title: string; or: string; browse: string; addMore: string };

const defaultLabels: DropzoneLabels = { title: "Sube tu carta", or: "o,", browse: "haz click para buscar", addMore: "Añadir otra página" };

interface FileDropzoneProps {
  accept: string;
  fileInputRef: RefObject<HTMLInputElement | null>;
  handleBoxClick: () => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent) => void;
  handleFileSelect: (files: FileList | null) => void;
  labels?: DropzoneLabels;
  /** Once a file is in, the big box shrinks to a one-line link so the form fits a phone screen. */
  compact?: boolean;
}

export function FileDropzone({
  accept,
  fileInputRef,
  handleBoxClick,
  handleDragOver,
  handleDrop,
  handleFileSelect,
  labels = defaultLabels,
  compact = false,
}: FileDropzoneProps) {
  const input = (
    <input
      type="file"
      id="fileUpload"
      ref={fileInputRef}
      className="hidden"
      accept={accept}
      onChange={(e) => handleFileSelect(e.target.files)}
    />
  );

  if (compact) {
    return (
      <div onDragOver={handleDragOver} onDrop={handleDrop}>
        <button
          type="button"
          onClick={handleBoxClick}
          className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/90"
        >
          <Plus className="size-4" />
          {labels.addMore}
        </button>
        {input}
      </div>
    );
  }

  // Phones: a low row (icon beside the text). From sm: the tall centred box.
  return (
    <div className="">
      <div
        className="flex cursor-pointer flex-row items-center gap-3 rounded-md border-2 border-dashed border-border px-4 py-3 text-left sm:flex-col sm:justify-center sm:gap-0 sm:px-8 sm:py-4 sm:text-center"
        onClick={handleBoxClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="shrink-0 rounded-full bg-muted p-3 sm:mb-2">
          <Upload className="h-5 w-5 text-muted-foreground" />
        </div>
        <div>
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
        </div>
        {input}
      </div>
    </div>
  );
}