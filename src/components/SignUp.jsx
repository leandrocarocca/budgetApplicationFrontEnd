import { useState } from 'react';
import { UNSAFE_NavigationContext, useNavigate } from "react-router-dom";

const SignUp = (props) => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const postUser = async () => {
    const users = await fetchUsers();
    const ids = users.map((user) => user.id);
    const new_id = Math.max(...ids) + 1;
    const user_object = {id: new_id, userName, password};
    const res = await fetch("http://localhost:5000/users", {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(user_object)
    })
    const data = res.json();
  }

  const fetchUsers = async () => {
      const res = await fetch("http://localhost:5000/users");
      const data = await res.json();
      return data;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if(!firstName || !lastName || !userName || !password){
      alert("Enter a text!")
      return
    }
    postUser();
    setFirstName("");
    setLastName("");
    setUserName("");
    setPassword("");
    navigate("/");

  }

  return(
  <>
    <form className="add-form" onSubmit={onSubmit}>

      <div className="form-control">
        <label>First name</label>
        <input type="text" placeholder="Enter your first name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
      </div>

      <div className="form-control">
        <label>Last name</label>
        <input type="text" placeholder="Enter your last name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
      </div>

      <div className="form-control">
        <label>Username</label>
        <input type="text" placeholder="Enter username" value={userName} onChange={(e) => setUserName(e.target.value)}/>
      </div>
      <div className="form-control">
        <label>Password</label>
        <input type="text" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <input className='btn btn-block' type="submit" value="Sign up" />
    </form>
    <div className='signupLink'>
      <p>Already have account? Login here <a href="/">here</a></p>
    </div>
    </>
  );
}
export default SignUp;