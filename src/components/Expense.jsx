import {FaTimes} from 'react-icons/fa';

function Expense({ expense, onDelete, onToggle}) {
  return (
    <div className={`expense ${expense.reminder ? 'reminder' : ''} ${expense.paid ? 'paid': ''}`} onDoubleClick={() => onToggle(expense.id)}>
      <h3>{expense.description} <FaTimes style={{color: "red", cursor: 'pointer'}} onClick={() => onDelete(expense.id)}/></h3>
      <p>Category: {expense.category}</p>
      <div className='lastRow'>
        <div className='dueDate'><p>{expense.dueDate ? `Due date: ${expense.dueDate}` : 'No due date'}</p></div>
        <div className='expenseAmount' style={{fontSize: "25px"}}> <p>{`${expense.amount} SEK`}</p></div>
      </div>
    </div>
  )
}

export default Expense;