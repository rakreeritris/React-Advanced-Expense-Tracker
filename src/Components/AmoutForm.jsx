import React, { useContext, useState } from "react";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { v4 as uuid } from "uuid";
import "../CSS/AmountForm.css";
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
        date: new Date(),
      }),
    });
  };
  return (
    <div className="formwrapper">
      <div className="heading">
        <h3 className="heading">ADD YOUR EXPENSES</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          {/*   <label htmlFor="amt">AMOUNT:</label> */}
          <input
            type="number"
            placeholder="ENTER THE AMOUNT..."
            id="amt"
            className="field"
          ></input>
        </div>
        <div>
          {/*   <label id="person">GIVEN BY/TO WHOM:</label> */}
          <input
            type="text"
            placeholder="GIVEN BY TO/WHOM.."
            className="field"
          ></input>
        </div>
        <div className="type">
          <label id="type">TYPE OF TRANSACTION: </label>
          <select name="Type" id="type">
            <option value="CREDIT" className="field">
              CREDIT
            </option>
            <option value="DEBIT" className="field">
              DEBIT
            </option>
          </select>
        </div>
        <div>
          <textarea
            id="msg"
            onChange={(e) => setMsg(e.target.value)}
            placeholder="ENTER A SHORT MESSAGE FOR YOUR SELF.."
            className="textfield"
          ></textarea>
        </div>
        <button type="submit" className="btn">
          SUBMIT
        </button>
      </form>
    </div>
  );
}

export default AmoutForm;
