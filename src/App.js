import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from "./components/Header";
import Expenses from './components/Expenses';
import { useState, useEffect} from "react";
import AddExpense from './components/AddExpense';
import Footer from './components/Footer';
import About from './components/About';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Budgets from './components/Budgets';
import AddBudget from './components/AddBudget';
import AuthProvider, { useAuth } from './components/AuthContext';
import Incomes from './components/Incomes';
import Navbar from './components/Navbar';
import Results from './components/Results';
import AddIncome from './components/AddIncome';

const App = () => {
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showAddIncome, setShowAddIncome] = useState(false);
  const [showAddBudget, setShowAddBudget] = useState(false);
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  
  useEffect(() => {
    
    const getExpenses = async () => {
      const expensesFromServer = await fetchExpenses();
      setExpenses(expensesFromServer);
    }
    getExpenses();

    const getIncomes = async () => {
      const incomesFromServer = await fetchIncomes();
      setIncomes(incomesFromServer);
    }
    getIncomes();
   }, []);

  const fetchIncomes = async () => {
      const res = await fetch("http://localhost:8080/incomes");
      const data = await res.json(); 
      return data;
    };

  const fetchExpenses = async () => {
      const res = await fetch("http://localhost:8080/expenses");
      const data = await res.json();
      return data;
    };
  
  const fetchExpense = async (id) => {
    const res = await fetch(`http://localhost:8080/expenses/${id}`);
    const data = await res.json();
    return data;
  }

  const addIncome = async (income) => {
    const salary = parseFloat(income.salaryBeforeTaxes);
    const newIncome = {...income, salaryBeforeTaxes: salary}
    const res = await fetch("http://localhost:8080/incomes", {
      method: 'POST', 
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newIncome),
    })
      const data = await res.json();
      setIncomes([...incomes, data]);
  }

  const deleteIncome = async (id) => {
    await fetch(`http://localhost:8080/incomes/${id}`, {
      method: 'DELETE'
    })
    setIncomes(incomes.filter((income) => income.id !== id))
  }


  const addExpense = async (expense) => {
    const amount = parseFloat(expense.amount);
    const newExpense = {...expense, amount};
    const res = await fetch("http://localhost:8080/expenses", {
      method: 'POST', 
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(newExpense),
    })
      const data = await res.json();
      setExpenses([...expenses, data]);
  }


  const deleteExpense = async (id) => {
    await fetch(`http://localhost:8080/expenses/${id}`, {
      method: 'DELETE'
    })
    setExpenses(expenses.filter((expense) => expense.id !== id))
  }


 
  const toggleReminder = async (id) => {
    const expenseToToggle = await fetchExpense(id);
    const updatedExpense = {...expenseToToggle, reminder: !expenseToToggle.reminder};

    
    const res = await fetch(`http://localhost:8080/expenses/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedExpense),
    })
    const data = await res.json();
    setExpenses(expenses.map((expense) => expense.id === id ? {...expense, reminder: data.reminder}: expense))
  }

  return(
    <AuthProvider>
      <div>
          <Router>
            <Routes>
              <Route path="/" element={
                <>
                <Navbar/>
                <div className='container'>
                  <Header onAdd={() => setShowAddExpense(!showAddExpense)} showAdd={showAddExpense}/>
                  <Login/>
                </div>
                </>
                }
              />
              <Route path="/budgets" element={
                <><Navbar/>
                  <div className='container'>
                    <Header onAddBudget={() => setShowAddBudget(!showAddBudget)} showAddBudget={showAddBudget}/>
                      {
                        showAddBudget && <AddBudget/>
                      }    
                      {
                  
                        <Budgets/>
                      }
                      <Footer/>
                  </div>
                </>
                }/>
              <Route 
                path="/budget"
                element={
                  <><Navbar/>
                <div className='budgets'>
                  <div className='container'>
                    <Header onAddIncome={() => setShowAddIncome(!showAddIncome)} onAddExpense={() => setShowAddExpense(!showAddExpense)} showAddIncome={showAddIncome} showAddExpense={showAddExpense}/>
                      {
                        showAddIncome && <AddIncome onAdd={addIncome}/>
                      }
                      {
                        showAddExpense && <AddExpense onAdd={addExpense}/>
                      }
                      {
                        incomes.length > 0 ? 
                        <Incomes incomes={incomes} onDelete={deleteIncome}/>
                        : 
                        <h3>No incomes</h3>
                      }
                      {
                      expenses.length > 0 ?
                      <Expenses expenses={expenses} onDelete={deleteExpense} onToggle={toggleReminder}/>
                      :
                      <h3>No expenses</h3>
                      }
                  </div>
                  <Results incomes={incomes} expenses={expenses}/>
                </div>
                <Footer/>
                </>
              }/>
              <Route path="/signup" element={<div className='container'> <Navbar/> <SignUp/> <Footer/></div>}/>
              <Route path="/about" element={<div className='container'> <Navbar/> <About/> <Footer/></div>}/>
            </Routes>
          </Router>
      
      </div>
      
    </AuthProvider>
   );
}

export default App;