import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

function Login(props) {
    const port = process.env.PORT || 5000;

    //use below host for development in localhost
    //while hosting it somewhere else use address accordingly
    // const host = `http://localhost:${port}`;
    const host = "https://inotebookserver-o0mi.onrender.com";   //link of server hosted on render
    const [credentials, setCredentials] = useState({email: "", password: ""});
    let navigate = useNavigate();

    const handleSubmit = async (e)=> {
        e.preventDefault();

        // For development server use url fetch('http://localhost:5000/routes/auth/login')
        // For deployed server on heroku use fetch('/routes/auth/login')
        const response = await fetch(`${host}/routes/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
          });
          const json = await response.json();
          console.log(json);
          if(json.success) {
            //save the auth token and redirect
            localStorage.setItem('token', json.authToken);
            localStorage.setItem('username', json.username);
            navigate("/", { replace: true });
            props.showAlert(`Logged In as ${json.username}`, "success");
          }
          else {
            props.showAlert("Invalid Credentials", "danger")
          }
    };
    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value});
    };

  return (
    <div className="login_page">
      <div className="login">
        <div className="login_box">
          <h2>Sign In</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name="password"/>
            </div>
            <button type="submit" className="submit-btn">
              Submit
            </button>
            <div className="offer_signup">
              <h4>New to iNotebook? <Link className="signup-link" to="/signup">Sign Up</Link></h4>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
