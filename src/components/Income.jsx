import {FaTimes} from 'react-icons/fa';

function Income({ income, onDelete }) {

  return (
    <div className={`income`}>
      <h3>{income.description} <FaTimes style={{color: "red", cursor: 'pointer'}} onClick={() => onDelete(income.id)}/></h3>
      <p>{`Salary (before taxes): ${income.salaryBeforeTaxes}`}</p>
      <p>{`Salary (after taxes): ${income.salaryBeforeTaxes}`}</p>
      <p>{`Charity factor: ${income.charityFactor}`}</p>
    </div>
  )
}
export default Income;