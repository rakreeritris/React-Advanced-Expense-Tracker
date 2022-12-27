import React,{useContext} from 'react'
import AmoutForm from '../Components/AmoutForm'
import Credit from '../Components/Credit'
import Debit from '../Components/Debit'
import {signOut} from 'firebase/auth';
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import './Home.css'
import PieChart from '../Components/PieChart';
function Home() {
    const {currentUser}=useContext(AuthContext);
  return (
    <div>
        <h1>{currentUser.displayName}</h1>
        <img src={currentUser.photoURL} alt='user profile' id='img'></img>
    <AmoutForm></AmoutForm>
      <Credit></Credit>
      <Debit></Debit>
      <PieChart></PieChart>
    <button onClick={()=>signOut(auth)}>Logout</button>
    </div>
  )
}

export default Home
