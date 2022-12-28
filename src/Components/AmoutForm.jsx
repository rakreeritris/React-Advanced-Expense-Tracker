import React, { useContext, useState } from "react";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { v4 as uuid } from "uuid";
function AmoutForm() {
  const [msg, setMsg] = useState("");
  const { currentUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const amount = parseInt(e.target[0].value);
    const person = e.target[1].value;
    const typeofAmount = e.target[2].value;
    const Msg = msg;
    /*   console.log(amount,person,typeofAmount,Msg);
    console.log(typeof(amount)); */
    const user = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(user);

    const prevCreditAmount = parseInt(docSnap.data().creditAmount);
    const prevDebitAmount = parseInt(docSnap.data().debitAmount);
    /*   console.log(prevDebitAmount,typeof(prevDebitAmount));
  console.log(prevCreditAmount,typeof(prevCreditAmount)); */
    await updateDoc(user, {
      creditAmount:
        typeofAmount === "CREDIT"
          ? amount + prevCreditAmount
          : prevCreditAmount,
      debitAmount:
        typeofAmount === "DEBIT" ? amount + prevDebitAmount : prevDebitAmount,
      TransactionArray: arrayUnion({
        amount,
        person,
        typeofAmount,
        Msg,
        Id: uuid(),
      }),
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="number" placeholder="Enter the amount..."></input>
        </div>
        <div>
          <input type="text" placeholder="Name of the person..."></input>
        </div>
        <div>
          <select name="Type">
            <option value="CREDIT">CREDIT</option>
            <option value="DEBIT">DEBIT</option>
          </select>
        </div>
        <div>
          <textarea
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Enter a short message..."
          ></textarea>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default AmoutForm;
