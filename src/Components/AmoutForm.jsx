import React, { useContext, useState } from "react";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { v4 as uuid } from "uuid";
import "../CSS/AmountForm.css";
import moment from "moment/moment";
function AmoutForm() {
  const [amt, setAmt] = useState(0);
  const [Person, setPerson] = useState("");
  const [msg, setMsg] = useState("");
  const [type, SetType] = useState("CREDIT");
  const { currentUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const amount = parseInt(amt);
    const person = Person;
    const typeofAmount = type;
    console.log(typeofAmount);
    const Msg = msg;
    const user = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(user);

    const prevCreditAmount = parseInt(docSnap.data().creditAmount);
    const prevDebitAmount = parseInt(docSnap.data().debitAmount);
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
        id: uuid(),
        date: moment().format("MMMM Do YYYY, h:mm:ss a"),
      }),
    });
    /*   setAmt(0);
    setMsg("");
    setPerson(""); */
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
            onChange={(e) => setAmt(e.target.value)}
            value={amt}
          ></input>
        </div>
        <div>
          {/*   <label id="person">GIVEN BY/TO WHOM:</label> */}
          <input
            type="text"
            placeholder="GIVEN BY TO/WHOM.."
            className="field"
            onChange={(e) => setPerson(e.target.value)}
            value={Person}
          ></input>
        </div>
        <div className="type">
          <label id="type">TYPE OF TRANSACTION: </label>
          <select
            name="Type"
            id="type"
            onChange={(e) => SetType(e.target.value)}
          >
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
            value={msg}
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
