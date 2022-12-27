import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth } from "../firebase";
import { storage } from "../firebase";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Register.css";
import img from "../Images/logo.jpg";
function Register() {
  const [err, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    /*     console.log(file); */
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log("res is ", res);
      const storageRef = ref(storage, file.name);

      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          setError(true);
          setErrMsg(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(auth.currentUser, {
              displayName: name,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName: name,
              email: email,
              photoURL: downloadURL,
              creditAmount: 0,
              debitAmount: 0,
              TransactionArray: [],
            });
            navigate("/home");
          });
        }
      );
    } catch (error) {
      setError(true);
      setErrMsg(error);
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
            <span className="title">REGISTER</span>
          </div>
          {err && <span>something went wrong -{errMsg}</span>}
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                placeholder="NAME"
                className="form-name"
              ></input>
            </div>
            <div>
              <input
                type="email"
                placeholder="EMAIL"
                className="form-email"
              ></input>
            </div>
            <div>
              <input
                type="password"
                placeholder="PASSWORD"
                className="form-password"
              ></input>
            </div>
            <div className="form-image-upload">
              <label htmlFor="file" className="input-fle">
                <FontAwesomeIcon icon={faUser} />
                <span>Add your profile image</span>
              </label>
              <input type="file" id="file" hidden></input>
            </div>
            <div>
              <button className="form-login">SignUp</button>
            </div>
          </form>
          <div className="signup-url">
            <p className="form-tag">Already have an account ?</p>
            <Link to="/login" className="link-login">
              LOGIN
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
