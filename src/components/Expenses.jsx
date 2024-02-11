import Expense from "./Expense"
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from './AuthContext';

const Expenses = ({ expenses, onDelete, onToggle}) => {
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const authContext = useAuth();

  useEffect(() => {
    const expensesToFilter = expenses.filter((expense) => expense.budget.id === location.state.budget.id)
    const allCategories = expensesToFilter.map((expense) => expense.category)
    const categoriesWithoutDuplicates = [...new Set(allCategories)];
    categoriesWithoutDuplicates.sort((a,b) => {
      if(a === "Other"){
        return 1;
      } 
      else if(b === "Other"){
        return -1;
      }
      return a.localeCompare(b);
    })
    setCategories(categoriesWithoutDuplicates);
  }, [expenses])

  return (
    <>
    {
      expenses.length > 0 && <h3 style={{fontSize: '25px'}}>Expenses:</h3>
    }
      {categories.map((category, idx) => {
        return (
        <div key={idx}>
              <p key={`category_${idx}`}>{category}</p>
              {expenses.map((expense) => {
                if(expense.category === category){
                  return(
                  <div key={`div_${expense.id}`}>
                  {location.state.budget.id === expense.budget.id && <Expense key={expense.id} expense={expense} onDelete={onDelete} onToggle={onToggle}/>}
                  </div>
                )  
                }
              })}
          </div>
        )
      })}
    </>
  )
}

export default Expenses;