import { useState} from 'react';
import { useAuth } from './AuthContext';
const AddBudget = ({ onAddBudget }) => {

  const authContext = useAuth();
  const [budgetName, setBudgetName] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if(!budgetName){
      alert("Enter a text!")
      return
    }
    
    addBudget(authContext, {name: budgetName});
    setBudgetName("");
  }

  const addBudget = async (authContext, budget) => {
    const res = await fetch(`http://localhost:8080/budgets/user/${authContext.user.id}`, {
      method: 'POST', 
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(budget),
    })
    const data = await res.json();
    const oldUser = authContext.user;
    const oldUserBudgets = oldUser.budgets;
    const updatedUserBudgets = [...oldUserBudgets, data];
    const updatedUser = {...oldUser, budgets: updatedUserBudgets};
    authContext.setUser(updatedUser);
  }

  return(
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Budget Name</label>
        <input type="text" placeholder="Add description" value={budgetName} onChange={(e) => setBudgetName(e.target.value)}/>
      </div>
      <input className='btn btn-block' type="submit" value="Save Budget" />
    </form>
  );
}

export default AddBudget;