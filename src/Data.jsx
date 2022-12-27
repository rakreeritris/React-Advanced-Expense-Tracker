import { doc,onSnapshot } from "firebase/firestore";
import { AuthContext } from '../context/AuthContext';
import {db} from '../firebase';
const {currentUser}=useContext(AuthContext);
const user = doc(db, "users",currentUser.uid);
const docSnap = await getDoc(user);

const prevCreditAmount=parseInt(docSnap.data().creditAmount);
const prevDebitAmount=parseInt(docSnap.data().debitAmount);