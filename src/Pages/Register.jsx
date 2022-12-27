import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons'
import {  createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {auth} from '../firebase';
import {storage} from '../firebase';
import {db} from '../firebase';
import { doc, setDoc } from "firebase/firestore";
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';
function Register() {
  const [err,setError]=useState(false);
  const [errMsg,setErrMsg]=useState('');
  const navigate=useNavigate();
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const name=e.target[0].value;
    const email=e.target[1].value;
    const password=e.target[2].value;
    const file=e.target[3].files[0];
/*     console.log(file); */
    try {
    const res=  await createUserWithEmailAndPassword(auth, email, password);
    console.log('res is ',res);
    const storageRef = ref(storage, file.name);


const uploadTask = uploadBytesResumable(storageRef, file);
uploadTask.on('state_changed', 
  (snapshot) => {
  
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
  }, 
  (error) => {
    setError(true);
    setErrMsg(error);
  }, 
  () => {
   
    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
       await updateProfile(auth.currentUser, {
        displayName:name, photoURL: downloadURL
      })
      await setDoc(doc(db, "users",  res.user.uid), {
        uid:res.user.uid,
        displayName: name,
        email:email,
        photoURL:downloadURL,
        creditAmount:0,
        debitAmount:0,
        TransactionArray:[]
      });
      navigate('/home');
    });


  }
); 
} 
catch (error) 
{
  setError(true);
  setErrMsg(error);    
}  
}
  return (
    <div className='formContainer'>
        <div className='formWrapper'>
            <span className='logo'>Lama Chat</span>
            <span className='title'>Register</span>
            {err && <span>something went wrong -{errMsg}</span>}
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='display-name'></input>
                <input type='email' placeholder='email'></input>
                <input type='password' placeholder='password'></input>
                <label htmlFor='file' className='input-fle'>
                <FontAwesomeIcon icon={faUser} />
                    <span>Add your profile image</span>
                  </label>
                <input type='file' id='file' hidden></input>
                <button>SignUp</button>
            </form>
            <p>Don't have an account  ? <Link to='/login'>Login</Link></p>
        </div>
    </div>
  )
}

export default Register