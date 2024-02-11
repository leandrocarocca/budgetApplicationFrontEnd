import { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { useAuth } from './AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const authContext = useAuth();

  const fetchUsers = async () => {
      const res = await fetch("http://localhost:8080/users");
      const data = await res.json();
      return data;
  };

  const handleLogin = async () => {
    const users = await fetchUsers().then((users) => {
      for (const user of users) {
        console.log("Iteration user: ", user);
        if (user.userName === username && user.password === password) {
          authContext.setUser({...user});
          authContext.setIsAuthenticated(true);
          console.log("User", user, " has logged in")
          navigate("budgets");
          return;
        }
      authContext.setUser({});
      authContext.setIsAuthenticated(false);
      alert("Could not find this user, try again or sign up");
    }
    });

    
   
  };


  const onSubmit = async (e) => {
    e.preventDefault();
    if(!username || !password){
      alert("Please enter username and password.");
      return;
    }
    await handleLogin();
  }
  return (
    <>
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Username</label>
        <input type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)}/>
      </div>
      <div className="form-control">
        <label>Password</label>
        <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <input className='btn btn-block' type="submit" value="Login" />
    </form>
    <div className='signupLink'>
      <p>Have no account? Sign up <Link to="/signup">here</Link></p>
    </div>
    </>

  );
}

export default Login;