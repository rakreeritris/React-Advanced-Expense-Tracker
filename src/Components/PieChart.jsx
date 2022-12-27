// ./components/PieChart.js
import React, { useContext, useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";

const labels = ["Credits,Debits"];

const PieChart = () => {
  const [credit, setCredit] = useState(0);
  const [debit, setDebit] = useState(0);
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
        setCredit(doc.data().creditAmount);
        setDebit(doc.data().debitAmount);
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);
  let data = {
    labels: labels,
    datasets: [
      {
        label: "Credits and Debits",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "#0000ff",
        data: [credit, debit],
      },
    ],
  };
  return (
    <div>
      <Pie data={data} />
    </div>
  );
};
export default PieChart;
