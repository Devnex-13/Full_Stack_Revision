import { useEffect, useState } from "react";
import AddUserForm from "./Components/AddUserForm";
import ViewUsers from "./Components/ViewUsers";
import "bootstrap/dist/css/bootstrap.min.css";
import LoadSpinner from "./Components/LoadSpinner";

function App() {

  const [success, setSuccess] = useState(null)

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error,setError] = useState(null)

  const fetchUsers = () => {
    setError(null)
    setLoading(true);
    fetch("http://localhost:3001/api/users")
      .then((res) => {
        if(!res.ok){
          throw new Error("Something wents Wrong!!")
        }

        return res.json()
      })
      .then((data) => {
        console.log(data);
        setUsers(data);
      })
      .catch((error) => {
        console.log(error)
        setError("❌Failed To fetch API!!")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchUsers();
  },[])

  return (
    <center>
      <AddUserForm setUsers={setUsers} setSuccess={setSuccess}/>
      <button type="button" className="btn btn-secondary" onClick={fetchUsers}>Refresh Users</button>
      <center style={{margin:"2rem",width:"100%",height:"100vh"}}>
      {error && <h2>{error}</h2>}
      {success && (<div>{success}</div>)}
      {loading ? <LoadSpinner />: (
        <div>
          <h1>Users</h1>
          {users && (
            <div style={{display:"flex",margin: "2rem", gap: "2rem" }}>
              {users.map((user) => (
                <ViewUsers key={user.id} user={user} setUsers={setUsers} setSuccess={setSuccess}/>
              ))}
            </div>
          )}
        </div>
      )}
      {users.length === 0 && <div>🙍‍♂️ User Not Found!!</div>}
      </center>
    </center>
  );
}

export default App;
