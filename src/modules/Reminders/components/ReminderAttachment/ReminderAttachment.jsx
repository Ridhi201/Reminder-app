import React from "react";
import { FaPaperclip, FaTrash } from "react-icons/fa";
import "./ReminderAttachment.css";

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
    <div className="form-section-card reminder-attachment-section">
      <h3 className="form-section-heading">Attachment</h3>
      
      <div className="form-textarea-group">
        <label className="form-label" style={{ marginBottom: "8px", display: "block" }}>Upload File (Image, PDF, Document)</label>
        
        {formData.attachment ? (
          <div className="attachment-display-card">
            <div className="attachment-details">
              {formData.attachment.preview ? (
                <img src={formData.attachment.preview} alt="Attachment Preview" className="attachment-thumb" />
              ) : (
                <FaPaperclip className="attachment-icon" />
              )}
              <div className="attachment-info">
                <span className="attachment-name">{formData.attachment.name}</span>
                <span className="attachment-size">{formData.attachment.size}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleRemoveAttachment}
              className="remove-attachment-btn"
              title="Remove attachment"
            >
              <FaTrash size={14} />
            </button>
          </div>
        ) : (
          <label className="attachment-upload-zone">
            <FaPaperclip className="upload-icon" />
            <span>Choose a file or drag here...</span>
            <input type="file" accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt" onChange={handleAttachmentChange} hidden />
          </label>
        )}
      </div>
    </div>
  );
}
