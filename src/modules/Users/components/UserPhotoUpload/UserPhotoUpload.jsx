import { useRef } from "react";
import { FaCamera, FaTrash } from "react-icons/fa";
import "./UserPhotoUpload.css";

export default function UserPhotoUpload({ image, setImage }) {
  const fileRef = useRef();

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage({
        file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  return (
    <div className="upload-card">

      {/* Avatar / Preview */}
      <div className="avatar-preview">
        {image ? (
          <img src={image.preview} alt="Profile preview" />
        ) : (
          <div className="avatar-placeholder">👤</div>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleImage}
      />

      {/* Action buttons */}
      <div className="upload-buttons">
        <button
          type="button"
          className="upload-btn"
          onClick={() => fileRef.current.click()}
        >
          <FaCamera size={14} />
          {image ? "Change Photo" : "Upload Photo"}
        </button>

        {image && (
          <button
            type="button"
            className="remove-btn"
            onClick={() => setImage(null)}
          >
            <FaTrash size={13} />
            Remove
          </button>
        )}
      </div>

    </div>
  );
}
