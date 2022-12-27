import React,{useContext,useState,useEffect} from 'react'
import { doc,onSnapshot, arrayRemove ,updateDoc,getDoc } from "firebase/firestore";
import { AuthContext } from '../context/AuthContext';
import {db} from '../firebase';
function DeleteButton(props) {
    const [msgArr,setMsgArr]=useState([]);
    const {currentUser}=useContext(AuthContext);
    useEffect(() => {
        const getChats = () => {
          const unsub = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
            setMsgArr(doc.data().TransactionArray);
          });
    
          return () => {
            unsub();
          };
        };
    
        currentUser.uid && getChats();
      }, [currentUser.uid]);
    const handleDelete=async(Id)=>{
        const res=msgArr.filter(msg=>msg.Id===Id);
        const obj=res[0];
      
         const user = doc(db, "users",currentUser.uid);
         const docSnap = await getDoc(user);
     
       const prevCreditAmount=docSnap.data().creditAmount;
       const prevDebitAmount=docSnap.data().debitAmount;
        await updateDoc(user,{
        TransactionArray:arrayRemove(obj),
        creditAmount:obj.typeofAmount==='CREDIT' ?prevCreditAmount-obj.amount:prevCreditAmount,
        debitAmount:obj.typeofAmount==='DEBIT' ?prevDebitAmount-obj.amount:prevDebitAmount,
        });
     }
  return (
    <div>
        <button onClick={()=>handleDelete(props.Id)}>Delete Transaction</button>
    </div>
  )
}

export default DeleteButton