import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import "../CSS/DebitAmount.css";
function DebitAmount() {
  const [debit, setDebit] = useState(0);
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    console.log("use Effect triggered");
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
        setDebit(doc.data().debitAmount);
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);
  return (
    <div className="debit">
      <span>DEBIT</span>
      <div className="debit-amt">
        <span>{debit}</span>
        <CurrencyRupeeIcon></CurrencyRupeeIcon>
      </div>
    </div>
  );
}

export default DebitAmount;
