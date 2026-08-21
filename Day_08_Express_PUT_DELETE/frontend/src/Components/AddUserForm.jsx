import { useRef } from "react";

const AddUserForm = ({ setUsers, setSuccess }) => {
  const nameElement = useRef("");
  const roleElement = useRef("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const username = nameElement.current.value;
    const userrole = roleElement.current.value;

    if(username.trim() !== "" || userrole.trim() !== ""){

    fetch("http://localhost:3001/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: username,
        role: userrole,
      }),
    })
      .then((res) => {
        if(!res.ok){
          throw new Error("Something wents Wrong!!")
        }

        return res.json()
      })
      .then((data) => {
        console.log(data);
        setUsers((preData) => [...preData, data]);
        setSuccess("✅ User Added Successfully!!");
        setTimeout(() => {
          setSuccess(null);
        }, 3000);

        nameElement.current.value = "";
        roleElement.current.value = "";
      });
    }
    else{
      setSuccess("⚠️Name or Role is Empty, Value Required!!")
      setTimeout(() => {
          setSuccess(null);
        }, 3000);
    }
  };

  return (
    <div>
      <h1>Add User:</h1>
      <form action="/api/users" onSubmit={handleSubmit}>
        <label>Name:</label>
        <div>
          <input
            type="text"
            style={{ width: "25%", margin: "1rem" }}
            ref={nameElement}
            placeholder="Enter The Name"
          />
        </div>
        <label>Role:</label>
        <div>
          <input
            type="text"
            style={{ width: "25%", margin: "1rem" }}
            ref={roleElement}
            placeholder="Enter The Name"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddUserForm;
