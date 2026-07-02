import { useRef }     from "react";
import { FaCloudUploadAlt, FaTimes } from "react-icons/fa";
import "./Form.css";

/**
 * FileUpload — generic drag-area file picker with preview.
 *
 * Props:
 *   accept   — MIME types string, e.g. "image/*"
 *   preview  — current preview URL (string) or null
 *   onChange — (file) => void
 *   onRemove — () => void
 *   label    — optional field label
 *   hint     — helper text (shown inside the dropzone)
 *
 * Usage:
 *   <FileUpload
 *     label="Profile Photo"
 *     accept="image/*"
 *     preview={image?.preview}
 *     onChange={(file) => setImage({ file, preview: URL.createObjectURL(file) })}
 *     onRemove={() => setImage(null)}
 *   />
 */
export default function FileUpload({
  label,
  accept    = "*",
  preview   = null,
  onChange,
  onRemove,
  hint      = "Click to upload or drag and drop",
}) {
  const inputRef = useRef();

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file && onChange) onChange(file);
  };

  return (
    <div className="form-textarea-group">
      {label && <label className="form-label">{label}</label>}

      <div
        className="file-upload-card"
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
      >
        {preview ? (
          <img src={preview} alt="Preview" className="file-upload-preview" />
        ) : (
          <>
            <span className="file-upload-icon"><FaCloudUploadAlt /></span>
            <div className="file-upload-text">
              <p>Upload File</p>
              <span>{hint}</span>
            </div>
          </>
        )}
      </div>

      {preview && onRemove && (
        <button
          type="button"
          onClick={onRemove}
          style={{
            marginTop: "8px",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            background: "none",
            border: "1.5px solid #fca5a5",
            color: "#dc2626",
            padding: "6px 14px",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          <FaTimes size={12} /> Remove
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        hidden
        onChange={handleChange}
      />
    </div>
  );
}
