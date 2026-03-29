import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FileUpload({ files, setFiles }) {
  const inputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFiles = useCallback(
    (fileList) => {
      const newFiles = Array.from(fileList).filter(
        (f) => f.size <= 10 * 1024 * 1024,
      );
      setFiles((prev) => [...prev, ...newFiles].slice(0, 5));
    },
    [setFiles],
  );

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
    },
    [handleFiles],
  );

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="space-y-3">
      {/* Drop zone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative rounded-2xl border-2 border-dashed p-6 text-center cursor-pointer transition-all duration-300 ${
          dragActive
            ? "border-accent/50 bg-accent/[0.04]"
            : "border-dark-border/20 hover:border-dark-border/40 bg-white/[0.01] hover:bg-white/[0.02]"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.figma,.sketch,.xd"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
          className="hidden"
        />
        <div className="flex flex-col items-center gap-2">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${
              dragActive
                ? "bg-accent/15 text-accent"
                : "bg-white/[0.04] text-text-dim/40"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <div>
            <p className="font-body text-sm text-text-primary/70">
              <span className="text-accent font-medium">Click to upload</span>{" "}
              or drag and drop
            </p>
            <p className="font-mono text-[10px] text-text-dim/40 mt-1 uppercase tracking-wider">
              PDF, DOC, PNG, JPG, Figma · Max 10MB each · Up to 5 files
            </p>
          </div>
        </div>
      </div>

      {/* File list */}
      <AnimatePresence>
        {files.map((file, i) => (
          <motion.div
            key={`${file.name}-${i}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-3 p-3 rounded-xl border border-dark-border/15 bg-white/[0.02]"
          >
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
              <svg
                className="w-4 h-4 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-body text-xs text-text-primary truncate">
                {file.name}
              </p>
              <p className="font-mono text-[10px] text-text-dim/40">
                {formatSize(file.size)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => removeFile(i)}
              className="w-6 h-6 rounded-lg flex items-center justify-center text-text-dim/30 hover:text-red-400 hover:bg-red-400/10 transition-colors flex-shrink-0"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
