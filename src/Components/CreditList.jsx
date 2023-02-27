import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import DeleteButton from "./DeleteButton";
import UpdateButton from "./UpdateButton";
import CreditAmount from "./CreditAmount";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import "../CSS/CreditList.css";
function CreditList() {
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

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "person",
      headerName: "Transaction Done With",
      width: 150,
      editable: true,
    },
    {
      field: "Msg",
      headerName: "Message",
      width: 150,
      editable: true,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "type",
      headerName: "Type of Transaction",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
    },
    {
      field: "date",
      headerName: "Date and Time",
      sortable: true,
      with: 100,
    },
  ];

  /*  const handleDelete=async(Id)=>{
      const res=msgArr.filter(msg=>msg.Id===Id);
      const obj=res[0];
    
       const user = doc(db, "users",currentUser.uid);
      await updateDoc(user,{
      TransactionArray:arrayRemove(obj)
      });
   } */

  const updatedArray = msgArr.filter((msg) => msg.typeofAmount === "CREDIT");
  console.log(updatedArray);
  return (
    <div>
      <div className="creditAmt">
        <CreditAmount></CreditAmount>
      </div>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          style={{
            width: "60%",
            margin: "auto",
          }}
          rows={updatedArray}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </div>
  );
}

export default CreditList;

/* export const credit=credit; */
