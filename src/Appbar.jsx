import { useNavigate } from "react-router-dom";

const Appbar = () => {
  const navigate = useNavigate();

  return <div style={{display: "flex", justifyContent: "space-between"}}>
    <div>
    <h1>Coursera</h1>
    </div>
    <div>
    <button onClick={() => {
      // alert("Clicked");
      // window.location.href = "/signup";
      navigate("/signup");
    }} style={{padding: "5px", margin: "3px", backgroundColor: "blueviolet"}}>Signup</button>
    <button onClick={() => {
      // alert("Clicked");
      // window.location.href = "/signin";
      navigate('/signin');
    }} style={{padding: "5px", margin: "3px", backgroundColor: "blueviolet"}}>Signin</button>
    </div>
  </div>
}

export default Appbar;