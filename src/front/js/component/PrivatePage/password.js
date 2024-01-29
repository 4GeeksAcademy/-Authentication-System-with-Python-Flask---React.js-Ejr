import React, { useState } from "react";


const Password = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChangePassword = (e) => {
    e.preventDefault();

    // Add your logic here to handle the password change

    // Reset form fields
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  return (
    <div className="password-container">
      <h2>Change Password</h2>
      <form onSubmit={handleChangePassword}>
        <label>
          <input
            type={showPassword ? "text" : "password"}
            value={currentPassword}
            placeholder="Current Password"
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </label>
        <br />

        <label>
          <input
            type={showPassword ? "text" : "password"}
            value={newPassword}
            placeholder="New Password"
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </label>
        <br />

        <label>
          <input
            type={showPassword ? "text" : "password"}
            value={confirmNewPassword}
            placeholder="Confirm New Password"
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />
        </label>
        <br />

        <label>
        <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          Show Password
        </label>

        <br />

        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default Password;
