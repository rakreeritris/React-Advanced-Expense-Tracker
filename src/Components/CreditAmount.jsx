import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import "../CSS/CreditAmount.css";
function CreditAmount() {
  const [credit, setCredit] = useState(0);
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    console.log("use Effect triggered");
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
        setCredit(doc.data().creditAmount);
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);
  return (
    <div className="credit">
      <span>CREDIT</span>
      <div className="credit-amt">
        <span>{credit}</span>
        <CurrencyRupeeIcon></CurrencyRupeeIcon>
      </div>
    </div>
  );
}

export default CreditAmount;
