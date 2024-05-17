import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import "./../../../styles/Landing-styles/login.css";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState({});
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleLogOut = () => {
    actions.logOut();
  };

  const handleInputChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    handleRedirection();
  }, [JSON.stringify(store.role)]);

  const handleRedirection = () => {
    switch (store.role) {
      case "user":
        navigate(`/user/${store.user_id}`);
        break;
      case "trainer":
        navigate(`/trainer/${store.user_id}`);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    actions.login(data);

    setShowModal(false);
  };

  return (
    <div className="login">
      <button className="login-button" onClick={() => setShowModal(true)}>
        Login
      </button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <label>Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={data.email}
                onChange={handleInputChange}
                placeholder="Email"
                required
              />
              <label>Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={data.password}
                onChange={handleInputChange}
                placeholder="Password"
                required
              />
              <button type="submit">Login</button>
              <button onClick={handleLogOut}>LogOut</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};