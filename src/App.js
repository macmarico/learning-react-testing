import logo from "./logo.svg";
import { useState } from "react";
import "./App.css";
import validator from "validator";

function App() {
  const [signupInput, setSignupInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setSignupInput({
      ...signupInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (!validator.isEmail(signupInput.email)) {
      return setError("the email you input is invalid");
    }else if(signupInput.password.length < 5){
      return setError("the password you input is invalid");
    }else if(signupInput.password !== signupInput.confirmPassword){
      return setError("the passwords does not match. Try again");
    }
  };
  return (
    <div className="container my-5">
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={signupInput.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={signupInput.password}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="confirm-password" className="form-label">
            confirm password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirm-password"
            name="confirmPassword"
            value={signupInput.confirmPassword}
            onChange={handleChange}
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          submit
        </button>
      </form>
    </div>
  );
}

export default App;
