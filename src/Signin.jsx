import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const navigate = useNavigate();

  return <div style={{backgroundColor: "#eeeeee", border: "2px solid black", textAlign: "center", width: "500px", margin: "5px", padding: "15px"}}>
    <h1>Welcome to Coursera. Signin below.</h1>
    Username - <input type="text" value={email} onChange={(e) => {
      setEmail(e.target.value);
    }} />
    <br />
    Password - <input type="password" value={password} onChange={(e) => {
      setPassword(e.target.value);
    }} />
    <br />
    <button 
    onClick={() => {
      fetch("http://localhost:3000/users/login", {
        method: "POST",
        body: JSON.stringify({
          username: email,
          password: password
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Failed to sign in");
        }
      })
      .then((data) => {
        localStorage.setItem("token", data.token);
        console.log(data);

        // Redirect to the home page
        navigate("/homepage")
      })
      .catch((error) => {
        console.log("Signin Error: ", error);
      })
    }}
    >Signin</button>
  </div>
}

export default Signin