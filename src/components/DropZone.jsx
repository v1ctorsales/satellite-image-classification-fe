import { useState, useRef } from "react";
import styles from "./DropZone.module.css";

export default function DropZone({ onSubmit, loading, onOpenSettings }) {
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  function addFiles(incoming) {
    const imageFiles = Array.from(incoming).filter((f) =>
      f.type.startsWith("image/"),
    );
    setFiles((prev) => {
      const existing = new Set(prev.map((f) => f.name + f.size));
      const fresh = imageFiles.filter((f) => !existing.has(f.name + f.size));
      return [...prev, ...fresh];
    });
  }

  function removeFile(index) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  }

  function handleChange(e) {
    addFiles(e.target.files);
    e.target.value = "";
  }

  function handleSubmit() {
    if (files.length === 0 || loading) return;
    onSubmit(files);
  }

  return (
    <div className={styles.dropzoneWrapper}>
      {" "}
      <div
        className={`${styles.dropzone} ${dragging ? styles.dragging : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        {" "}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleChange}
          onClick={(e) => e.stopPropagation()}
        />{" "}
        <svg
          className={styles.dropzoneIcon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          {" "}
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
          />{" "}
        </svg>{" "}
        <span className={styles.dropzoneLabel}>
          {dragging ? "Drop image here" : "Drag or click to upload"}{" "}
        </span>{" "}
        <span className={styles.dropzoneSublabel}>
          PNG, JPG, TIF · multiple files supported{" "}
        </span>{" "}
      </div>{" "}
      {files.length > 0 && (
        <div className={styles.previewGrid}>
          {" "}
          {files.map((file, i) => (
            <div className={styles.previewItem} key={i}>
              {" "}
              <img src={URL.createObjectURL(file)} alt={file.name} />
              <button onClick={() => removeFile(i)}>×</button>{" "}
            </div>
          ))}{" "}
        </div>
      )}{" "}
      <div className={styles.actions}>
        {" "}
        <button
          className={styles.settingsBtn}
          onClick={(e) => {
            e.stopPropagation();
            onOpenSettings();
          }}
          title="Model settings"
          type="button"
        >
          {" "}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <circle cx="12" cy="12" r="3" />{" "}
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />{" "}
          </svg>{" "}
        </button>{" "}
        <button
          className={styles.dropzoneSubmit}
          disabled={files.length === 0 || loading}
          onClick={handleSubmit}
          type="button"
        >
          {loading ? "Classifying..." : "Classify"}{" "}
        </button>{" "}
      </div>{" "}
    </div>
  );
}
