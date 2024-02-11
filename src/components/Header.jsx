import PropTypes from 'prop-types';
import Button from './Button';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
const Header = ({ title, onAddExpense, onAddIncome , onAddBudget, showAddIncome, showAddExpense, showAddBudget}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const authContext = useAuth();

  const onLogout = () => {
    authContext.setIsAuthenticated(false);
    authContext.setUser({});
    navigate("/");
  }
  return (
    <div>
        {
          location.pathname === "/budget" && (
              <div className='header'>
                <div className='headerTitle'>
                  <Button color="blue" text="Go back" onClick={() => navigate("/budgets")}/>
                </div>
                <div className='headerButtons'>
                  <Button color={showAddIncome ? 'black' : 'green'} text={showAddIncome ? 'Close' : 'Add income'} onClick={onAddIncome}/>
                  <Button color={showAddExpense ? 'black' : 'red'} text={showAddExpense ? 'Close' : 'Add expense'} onClick={onAddExpense}/>
                </div>
            </div>
            
          )
        }
        {
          location.pathname === "/budgets" && (
            <div className='header'>
              <div className='headerTitle'>
                <h1 style={{fontSize: '30px'}}>BUDGET APPLICATION</h1>
              </div>
              <div className='headerButtons'>
                <Button color={showAddBudget ? 'red' : 'green'} text={showAddBudget ? 'Close' : 'Add budget'} onClick={onAddBudget}/>
              </div>
            </div>
          )
        }
        {
          location.pathname === "/" && (
            <div>
            <h1>Login</h1>
            </div>
          )
        }
    </div>
  )
}

Header.defaultProps = {
  title: 'Budget'
}

Header.propTypes = {
  title: PropTypes.string.isRequired
}

export default Header;