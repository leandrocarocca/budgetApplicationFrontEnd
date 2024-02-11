import Budget from "./Budget"
import { useAuth } from "./AuthContext"
import { useEffect, useState } from "react";
const Budgets = ({ onDelete }) => {
  const authContext = useAuth();
  
  return (
    <div>
    <h3 style={{fontSize: '30px'}}>Budgets:</h3>
      {
        authContext.user.budgets.map((budget) => {
          console.log("budget: ", budget)
            return(
              <Budget key={budget.id} onDelete={onDelete} budget={budget}/>
            )
        } 
        )
      }
    </div>
  )
}

export default Budgets;