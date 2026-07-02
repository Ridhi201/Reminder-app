import React from "react";
import Card from "../../../../components/common/Card";
import { FaPaperclip, FaTrash } from "react-icons/fa";

export default function ReminderAttachment({ formData, setFormData }) {
  const handleAttachmentChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        attachment: {
          name: file.name,
          size: (file.size / 1024).toFixed(1) + " KB",
          preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : null
        }
      }));
    }
  };

  const handleRemoveAttachment = () => {
    setFormData((prev) => ({ ...prev, attachment: null }));
  };

  return (
    <Card>
      <h3>Attachment</h3>
      
      <div className="form-textarea-group" style={{ marginTop: "15px" }}>
        {formData.attachment ? (
          <div className="attachment-display-card" style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 16px",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--border)",
            background: "var(--bg)"
          }}>
            <div className="attachment-details" style={{ display: "flex", alignItems: "center", gap: "12px", overflow: "hidden" }}>
              {formData.attachment.preview ? (
                <img src={formData.attachment.preview} alt="Attachment Preview" className="attachment-thumb" style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "var(--radius-sm)",
                  objectFit: "cover",
                  border: "1px solid var(--border)"
                }} />
              ) : (
                <FaPaperclip className="attachment-icon" style={{ color: "var(--cobalt)", fontSize: "18px" }} />
              )}
              <div className="attachment-info" style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
                <span className="attachment-name" style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "var(--ink)",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                }}>{formData.attachment.name}</span>
                <span className="attachment-size" style={{ fontSize: "12px", color: "var(--ink-faint)" }}>{formData.attachment.size}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleRemoveAttachment}
              className="remove-attachment-btn"
              style={{
                background: "none",
                border: "none",
                color: "var(--coral)",
                cursor: "pointer",
                padding: "8px",
                borderRadius: "var(--radius-sm)",
                display: "inline-flex",
                alignItems: "center"
              }}
            >
              <FaTrash size={14} />
            </button>
          </div>
        ) : (
          <label className="attachment-upload-zone" style={{
            border: "2px dashed var(--border)",
            borderRadius: "var(--radius-md)",
            padding: "30px 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            background: "var(--bg)",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: 600,
            color: "var(--ink-muted)",
            transition: "all 0.2s ease"
          }}>
            <FaPaperclip style={{ color: "var(--ink-faint)", fontSize: "20px" }} />
            <span>Upload Image, PDF, or Document</span>
            <input type="file" onChange={handleAttachmentChange} hidden />
          </label>
        )}
      </div>
    </Card>
  );
}
