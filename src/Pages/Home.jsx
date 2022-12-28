import React, { useContext } from "react";
import AmoutForm from "../Components/AmoutForm";
import Credit from "../Components/Credit";
import Debit from "../Components/Debit";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import img from "../Images/logo.jpg";
import "./Home.css";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import logout from "../Images/logout.svg";
import LogoutSharpIcon from "@mui/icons-material/LogoutSharp";
/* import PieChart from "../Components/PieChart"; */
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
      <div className="creditsanddebits">
        <div className="credit">
          <span>CREDIT</span>
          <div className="credit-amt">
            <span>80</span>
            <CurrencyRupeeIcon></CurrencyRupeeIcon>
          </div>
        </div>
        <div className="debit">
          <span>DEBIT</span>
          <div className="debit-amt">
            <span>80</span>
            <CurrencyRupeeIcon></CurrencyRupeeIcon>
          </div>
        </div>
      </div>
      <div>
        <AmoutForm></AmoutForm>
      </div>

      {/*   <div>
        <PieChart></PieChart>
      </div> */}
    </>
  );
}

export default Home;
