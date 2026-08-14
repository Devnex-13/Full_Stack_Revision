import { useEffect, useRef, useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import DisplayData from "./Components/DisplayData"

function App() {
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState()
  const [profileData, setProfileData] = useState(null)


  const usernameElement = useRef("")

  const HandleInput = (e) => {
    e.preventDefault()
    setUsername(usernameElement.current.value)
    usernameElement.current.value = ""
  }

  useEffect(() => {

    if(!username){
      return 
    }


    const url = `https://api.github.com/users/${username}`

    setLoading(true)

    fetch(url)
    .then(res => {
      if(res.ok){
        throw new Error("User Not Found")
      }
      return res.json()
    })
    .then(data => {
      console.log(data)
      setProfileData(data)
      setLoading(false)
    })
  },[username])

  return (
    <center>
      <h1 style={{margin:"20px", fontFamily:"sans-serif"}}>Github Profile Founder</h1>
      <div style={{margin:"1.5rem"}}>
      <input type="text" ref={usernameElement} style={{width:"40%",border:"solid 1.5px gray",height:"50px",borderRadius:"10px"}}placeholder="Enter The Username" />
      <button className="btn btn-primary" style={{margin:"0.5rem"}} onClick={HandleInput}>Find</button>
      </div>
      {loading && <p>Loading...</p>}
      {profileData && (<DisplayData Image={profileData.avatar_url} Uname={profileData.login} Name={profileData.name} Following={profileData.following} Followers={profileData.followers} P_Repos={profileData.public_repos}/>)}
    </center>
  )
}

export default App
