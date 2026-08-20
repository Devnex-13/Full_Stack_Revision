import { useEffect, useState } from "react";
import AddUserForm from "./Components/AddUserForm";

function App() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/users")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
      });
  }, []);

  return (
    <>
      <h1>Users</h1>
      <AddUserForm setUsers={setUsers}/>
      {users && (
        <div>
          {users.map((user) => (
            <p key={user.id}>
              Name:{user.name}
              <br />
              Role:{user.role} 
            </p>
          ))}
        </div>
      )}
    </>
  );
}

export default App;
