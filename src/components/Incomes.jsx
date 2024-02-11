import Income from "./Income"
import { useLocation } from "react-router-dom";
const Incomes = ({ incomes, onDelete}) => {
  const location = useLocation();

  return (
    <>
    {
      incomes.length > 0 ? <h3 style={{fontSize: '25px'}}>Incomes:</h3> : "No income"
    }
    {
      incomes.map((income) => {
        
        return(
          <div key={income.id}>
            {
            location.state.budget.id === income.budget.id && <Income key={income.id} income={income} onDelete={onDelete}/>
            }
          </div>
          )
      }) 
    }
    
    
    </>
  )
}

export default Incomes;