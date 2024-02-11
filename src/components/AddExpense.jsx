import { useState} from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
const AddExpense = ({onAdd}) => {

  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [amount, setAmount] = useState(0);
  const [reminder, setReminder] = useState(false);

  const location = useLocation();
  const authContext = useAuth();

  const onSubmit = (e) => {
    e.preventDefault();
    if(!description || !amount){
      alert("Enter a text!")
      return
    }
    const user = authContext.user;
    const budget = location.state.budget;
    const newExpense = { user, budget, description, category, dueDate, amount, reminder}

    onAdd(newExpense);
    setDescription("");
    setDueDate("");
    setCategory("");
    setAmount(0);
    setReminder(false);
  }

  return(
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Description</label>
        <input type="text" placeholder="Add description" value={description} onChange={(e) => setDescription(e.target.value)}/>
      </div>
      <div className="form-control">
        <label>Category</label>
        <input type="text" placeholder="Add category" value={category} onChange={(e) => setCategory(e.target.value)} />
      </div>
      <div className="form-control">
        <label>Due Date</label>
        <input type="text" placeholder="Add due date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
      </div>
      <div className="form-control">
        <label>Amount</label>
        <input type="text" placeholder="Add amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>
      <div className="form-control form-control-check">
        <label>Set reminder</label>
        <input 
        type="checkbox"
        value={reminder}
        onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>
      <input className='btn btn-block' type="submit" value="Save task" />
    </form>
  );
}

export default AddExpense;