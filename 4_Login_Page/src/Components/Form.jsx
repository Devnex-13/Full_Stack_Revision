import { useRef} from "react"
import InputBox from "./InputBox"

const Form = ({setMail,setPass}) => {

  const mailElement = useRef("")
  const passElement = useRef("")

  const HandleInput = (e) => {
    e.preventDefault() 

    setMail(mailElement.current.value)
    setPass(passElement.current.value)

    mailElement.current.value = ""
    passElement.current.value = ""
  }



  return (
      <div className="card" style={{width: "30rem",height:"32rem",border: "solid 1px black",borderRadius:"5%",boxShadow:"18px 18px 18px 18px rgba(0, 0, 0, 0.1)"}}>
        <div className="card-body">
          <form onSubmit={HandleInput}>
            <h5 className="card-title" style={{fontFamily: "system-ui",fontSize:"2rem",margin:"15px"}}>Log in</h5>
            <InputBox Label="Email" Ref={mailElement} Type="email" Placeholder="name@example.com"/>
            <InputBox Label="Password" Ref={passElement} Type="password" Placeholder="Enter The Password"/>
            <button style={{margin:"2.5rem",width:"150px",height:"50px"}} type="submit" className="btn btn-primary">Log in</button>
          </form>
        </div>
      </div>
  )
}

export default Form