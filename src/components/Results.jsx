import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Results = ({ incomes, expenses }) => {
  const [netIncome, setNetIncome] = useState(0);
  const [netExpense, setNetExpense] = useState(0);
  const authContext = useAuth();
  const location = useLocation();

  useEffect(() => {
    //const expensesToFilter = expenses.filter((expense) => expense.userId === authContext.user.id && expense.budgetId === location.state.budgetId)
    const expensesToFilter = expenses.filter((expense) => expense.budget.id === location.state.budget.id);
    const incomesToFilter = incomes.filter((income) => income.budget.id === location.state.budget.id);

    setNetExpense(expensesToFilter.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0));
    setNetIncome(incomesToFilter.reduce((accumulator, currentValue) => accumulator + currentValue.salaryBeforeTaxes, 0));
  }, [incomes, expenses])

  return (
    <div className='container'>
      <h1>Income: {netIncome}</h1>
      <h1>Expenses: {-netExpense}</h1>
      <h1>Result: {netIncome - netExpense}</h1>
    </div>
  )
}

export default Results;