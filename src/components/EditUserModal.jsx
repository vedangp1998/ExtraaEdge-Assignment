import React, { useState, useEffect } from "react";
import "./EditUserModal.css";

const EditUserModal = ({ user, isOpen, onClose, onSave }) => {
  const [transitionClass, setTransitionClass] = useState("");
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    website: user.website,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
  });

  const validate = () => {
    let valid = true;
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid.";
      valid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
      valid = false;
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number is invalid.";
      valid = false;
    }

    if (!formData.website.trim()) {
      newErrors.website = "Website is required.";
      valid = false;
    } else if (!/^https?:\/\/\S+$/.test(formData.website)) {
      newErrors.website = "Website URL is invalid.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSave = () => {
    if (validate()) {
      onSave(formData);
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      setTransitionClass("modal-open");
    } else {
      setTransitionClass("modal-close");
    }
  }, [isOpen]);

  return (
    <div className={`modal-overlay ${transitionClass}`}>
      <div className="modal-content">
        <h2>Edit User </h2>
        <form>
          <div className="form">
            <div className="field">
              <label className="label">
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input"
                />
                {errors.name && <p className="error-message">{errors.name}</p>}
              </label>
            </div>
            <div className="field">
              <label className="label">
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input"
                />
                {errors.email && (
                  <p className="error-message">{errors.email}</p>
                )}
              </label>
            </div>
            <div className="field">
              <label className="label">
                Phone:
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input"
                />
                {errors.phone && (
                  <p className="error-message">{errors.phone}</p>
                )}
              </label>
            </div>
            <div className="field">
              <label className="label">
                Website:
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="input"
                />
                {errors.website && (
                  <p className="error-message">{errors.website}</p>
                )}
              </label>
            </div>
          </div>
        </form>
        <div className="modal-buttons">
          <button className="cancel-buttons" onClick={onClose}>
            Cancel
          </button>
          <button className="ok-buttons" onClick={handleSave}>
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
