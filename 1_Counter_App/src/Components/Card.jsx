import Box from "./Box";
import Buttons from "./Buttons";
import { useState } from "react";
import Message from "./Message";

const Card = () => {

  const[count,setCount] = useState(0)

  return (
    <div className="card" style={{ width: '18rem' }}>
        <Box count={count}/>
        <div className="card-body">
          <h5 className="card-title">Buttons</h5>
          <Buttons setCount={setCount}/>
          <br/>
          <Message count={count}/>
        </div>
      </div>
  )
}

export default Card