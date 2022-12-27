import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import "./credit.css";
import DeleteButton from "./DeleteButton";
import UpdateButton from "./UpdateButton";
function Credit() {
  const [credit, setCredit] = useState(0);
  const [msgArr, setMsgArr] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
        setCredit(doc.data().creditAmount);
        setMsgArr(doc.data().TransactionArray);
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);
  localStorage.setItem("credit", credit);

  /*  const handleDelete=async(Id)=>{
      const res=msgArr.filter(msg=>msg.Id===Id);
      const obj=res[0];
    
       const user = doc(db, "users",currentUser.uid);
      await updateDoc(user,{
      TransactionArray:arrayRemove(obj)
      });
   } */

  const updatedArray = msgArr.filter((msg) => msg.typeofAmount === "CREDIT");
  return (
    <div>
      credit amout-{credit}
      {updatedArray?.map((msg) => (
        <div id="tran" key={msg.Id}>
          <div>Given by whom-{msg.person}</div>
          <div>Amount-{msg.amount}</div>
          <div>short message-{msg.Msg}</div>
          <div>
            <DeleteButton Id={msg.Id}></DeleteButton>
          </div>
          <div>
            <UpdateButton Id={msg.Id}></UpdateButton>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Credit;

/* export const credit=credit; */
