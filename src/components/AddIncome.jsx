import { useState} from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
const AddIncome = ({onAdd}) => {

  const location = useLocation();
  const authContext = useAuth();

  const [description, setDescription] = useState("");
  const [salaryBeforeTaxes, setSalaryBeforeTaxes] = useState(0);
  const [charityFactor, setCharityFactor] = useState(0);


  const onSubmit = (e) => {
    e.preventDefault();
    if(!description || !salaryBeforeTaxes || !charityFactor){
      alert("Enter a text!")
      return
    }
    const user = authContext.user;
    const budget = location.state.budget;
    const charityFactorAsFloat = parseFloat(charityFactor)
    const newIncome = { user, budget, description, salaryBeforeTaxes, charityFactor: charityFactorAsFloat}
    
    onAdd(newIncome);
    setDescription("");
    setSalaryBeforeTaxes(0);
    setCharityFactor(0);
  }

  return(
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Description</label>
        <input type="text" placeholder="Add description" value={description} onChange={(e) => setDescription(e.target.value)}/>
      </div>
      <div className="form-control">
        <label>Salary before taxes</label>
        <input type="text" placeholder="Add salary" value={salaryBeforeTaxes} onChange={(e) => setSalaryBeforeTaxes(e.target.value)} />
      </div>
      <div className="form-control">
        <label>Charity factor</label>
        <input type="text" placeholder="Add charity factor" value={charityFactor} onChange={(e) => setCharityFactor(e.target.value)} />
      </div>
      <input className='btn btn-block' type="submit" value="Save salary" />
    </form>
  );
}

export default AddIncome;