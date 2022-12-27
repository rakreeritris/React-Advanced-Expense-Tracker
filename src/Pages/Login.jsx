import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "./Login.css";
import img from "../Images/logo.jpg";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <>
      <div className="nav">
        <img src={img} alt="logo" className="logoimg" />
        <span className="logo">EXPENSE TRACKER</span>
      </div>
      <div className="formContainer">
        <div className="formWrapper">
          <div>
            <span className="title">LOGIN</span>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="email"
                  placeholder="EMAIL"
                  className="form-email"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="PASSWORD"
                  className="form-password"
                />
              </div>
              <div>
                <button className="form-login">SIGN IN</button>
              </div>
              <div>{err && <span>Something went wrong</span>}</div>
            </form>
          </div>
          <div className="signup-url">
            <p className="form-tag">You don't have an account ?</p>
            <Link to="/register" className="link-register">
              REGISTER
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
