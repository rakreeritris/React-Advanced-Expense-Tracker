import React,{useContext, useEffect, useState} from 'react'
import { doc,onSnapshot } from "firebase/firestore";
import { AuthContext } from '../context/AuthContext';
import {db} from '../firebase';
function Debit() {
    const [debit,setDebit]=useState(0);
    const {currentUser}=useContext(AuthContext);
    useEffect(() => {
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
      localStorage.setItem('debit',debit);
  return (
    <div>
      Debit-{debit}
    </div>
  )
}

export default Debit
