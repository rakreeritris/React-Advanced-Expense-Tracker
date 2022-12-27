import React,{useContext,useState,useEffect} from 'react'
import { doc,onSnapshot, arrayRemove ,updateDoc,getDoc,arrayUnion } from "firebase/firestore";
import { AuthContext } from '../context/AuthContext';
import {db} from '../firebase';
import { v4 as uuid } from "uuid";
function UpdateButton(props) {
    const [vis,setVis]=useState(false);
    const [name,setName]=useState("");
    const [amount,setAmount]=useState(0);
    const [msg,setMsg]=useState("");
    const {currentUser}=useContext(AuthContext);
    const [msgArr,setMsgArr]=useState([]);
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
  const handleUpdate=()=>{
    const res=msgArr.filter(msg=>msg.Id===props.Id);
        const obj=res[0];
     /*    console.log(typeof(obj.amount)); */
        setName(obj.person);
        setAmount(obj.amount);
        setMsg(obj.Msg);
        setVis(!vis);
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
     const res=msgArr.filter(msg=>msg.Id===props.Id);
     const obj=res[0];
     const userprev=parseInt(res[0].amount);
     /* console.log(name,amount,msg); */
      
     const user = doc(db, "users",currentUser.uid);
     const docSnap = await getDoc(user);
       
         let prevCreditAmount=parseInt(docSnap.data().creditAmount);
         let prevDebitAmount=parseInt(docSnap.data().debitAmount);
      /*    console.log(prevCreditAmount,typeof(prevCreditAmount));
         console.log(prevDebitAmount,typeof(prevDebitAmount)); */
         if(obj.typeofAmount==='CREDIT')
         {
            /* console.log(docSnap.data().creditAmount,typeof(docSnap.data().creditAmount));
            console.log(userprev,typeof(userprev));
            console.log(amount,typeof(amount)); */
             prevCreditAmount=parseInt(docSnap.data().creditAmount)-userprev+parseInt(amount);
             console.log(prevCreditAmount);
         }
         else
         {
            prevDebitAmount=parseInt(docSnap.data().debitAmount)-userprev+parseInt(amount);
         }
         
         await updateDoc(user,{
           creditAmount:prevCreditAmount,
           debitAmount:prevDebitAmount,
           TransactionArray:arrayUnion({
             amount,
             person:name,
             typeofAmount:obj.typeofAmount,
             Msg:msg,
             Id:uuid()  
            })
            
          })
          await updateDoc(user,{
         TransactionArray: arrayRemove(obj)
         });
    setVis(!vis);
  }
  return (
    <div>
        <button onClick={()=>handleUpdate()}>Update Transaction</button>
        {
            vis &&
            <form onSubmit={handleSubmit}>
            <label htmlFor="name">Person Name</label>
            <input type='text' value={name} id='name' onChange={(e)=>setName(e.target.value)}></input>
            <label htmlFor='number' id='amount' >Amount</label>
            <input type='number' id='amount' value={amount} onChange={(e)=>setAmount(e.target.value)}></input>
            <label htmlFor='Msg'>Message</label>
            <input type='Msg' id='Msg' value={msg} onChange={(e)=>setMsg(e.target.value)}></input>
            <button type='submit'>Submit</button>
            </form>

        }
    </div>
  )
}

export default UpdateButton