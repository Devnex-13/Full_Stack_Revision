import "bootstrap/dist/css/bootstrap.min.css";
import Form from "./Components/Form";
import { useState } from "react";
import Display from "./Components/Display";

function App() {
  const [mail, setMail] = useState(null)
  const [password,setPassword] = useState(null)

  return (
    <div style={{height:"100vh",alignItems:"center",justifyContent:"center",display:"flex"}}>
    {mail && password ? (<Display Mail={mail} Pass={password}/>): (<Form setMail={setMail} setPass={setPassword}/>)}
    </div>
  );
}

export default App;
