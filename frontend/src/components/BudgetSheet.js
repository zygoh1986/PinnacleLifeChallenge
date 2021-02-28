import React from "react";

export default function yearRecord(props) {
  const { yearRecord } = props;

    return (
        <div key={Math.random} className="card">
          <div>This year: {yearRecord.year}</div>
          <div>Salary: {yearRecord.salary}</div>
          <div>Total Commission: {yearRecord.total_commission}</div>
          <div>Total Expense: {yearRecord.total_expense}</div>
          <div>Nett Worth: {yearRecord.nett_worth}</div>
        </div>
      );



}