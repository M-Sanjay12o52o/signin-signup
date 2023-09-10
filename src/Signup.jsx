import { useState } from "react";

const Signup = () => {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  return <div style={{backgroundColor: "#eeeeee", border: "2px solid black", textAlign: "center", width: "500px", margin: "5px", padding: "15px"}}>
    <div>
    <h1>Welcome to Coursera. Signup below.</h1>
    </div>
    <div>
    Username - <input type="text" value={email} onChange={(e) => {
      setEmail(e.target.value);
    }} />
    <br />
    Password - <input type="password" value={password} onChange={(e) => {
      setPassword(e.target.value);
    }} />
    <br />
    <button onClick={() => {
      // alert("Clicked");
      fetch("http://localhost:3000/users/signup", {
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
        res.json().then((data) => {
          localStorage.setItem("token", data.token);
          console.log(data);
        })
      })
    }}>Signup</button>
    </div>
  </div>
}

export default Signup;