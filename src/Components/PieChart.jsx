// ./components/PieChart.js
import React, { useContext, useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Pie } from "react-chartjs-2";
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase";
import "../CSS/PieChart.css";
const label = ["CREDITS AND DEBITS"];

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
    labels: ["CREDIT", "DEBIT"],
    datasets: [
      {
        backgroundColor: ["#fd0909", "#15ff00"],

        data: [credit, debit],
      },
    ],
  };
  return (
    <div className="piechart">
      <Pie
        data={data}
        height="200px"
        width="400px"
        options={{ maintainAspectRatio: false }}
      />
    </div>
  );
};
export default PieChart;
