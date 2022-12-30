import React, { useContext } from "react";
import AmoutForm from "../Components/AmoutForm";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import img from "../Images/logo.jpg";
import "../CSS/Home.css";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";
import CreditAmount from "../Components/CreditAmount";
import DebitAmount from "../Components/DebitAmount";
import PieChart from "../Components/PieChart";
import { Link } from "react-router-dom";
function Home() {
  const { currentUser } = useContext(AuthContext);
  return (
    <>
      <div className="home-nav">
        <div className="nav-heading">
          <img src={img} alt="logo" className="nav-logoimg" />
          <span className="nav-logo-title">EXPENSE TRACKER</span>
        </div>
        <div className="nav-profile">
          <img
            src={currentUser.photoURL}
            alt="user profile"
            className="nav-profileimg"
          ></img>
          <span className="nav-profilename">{currentUser.displayName}</span>
          <button onClick={() => signOut(auth)} className="nav-logout">
            {/*     <img src={logout} alt="logout"></img> */}
            <LogoutSharpIcon></LogoutSharpIcon>
            LOGOUT
          </button>
        </div>
      </div>
      <div className="Home">
        <div className="creditsanddebits">
          <Link to="/credit" className="link-credit">
            <CreditAmount></CreditAmount>
          </Link>
          <Link to="/debit" className="link-debit">
            <DebitAmount></DebitAmount>
          </Link>
        </div>
        <div className="formandchart">
          <AmoutForm></AmoutForm>
          <PieChart></PieChart>
        </div>
      </div>

      <div></div>
    </>
  );
}

export default Home;
