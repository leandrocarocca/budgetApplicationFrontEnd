import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Button from './Button';

function Budget({ budget }) {
  const navigate = useNavigate();
  const authContext = useAuth();

  const onDelete = async (id) => {
    await fetch(`http://localhost:8080/budgets/${id}`, {
      method: 'DELETE'
    });
    await updateUser();
  };

  const updateUser = async () => {
    const user = authContext.user;
    const updatedUserBudgets = await fetchUserBudgets(user.id);
    const updatedUser = { ...user, budgets: updatedUserBudgets };
    authContext.setUser(updatedUser); 
  };

  const fetchUserBudgets = async (id) => {
    const res = await fetch(`http://localhost:8080/users/${id}/budgets`);
    const data = await res.json();
    return data; 
  };

  return (
    <div className={"expense"}>
      <h3>{budget.name}</h3>
      <div className='selectBudget'>
        <Button  color="blue" text="Select" onClick={() => {
          navigate("/budget", {
            state: {
              budget
            }
          })
        }}/>
        <Button color='red' text='Delete' onClick={() => onDelete(budget.id)}/>
      </div>
    </div>
  );
}

export default Budget;
