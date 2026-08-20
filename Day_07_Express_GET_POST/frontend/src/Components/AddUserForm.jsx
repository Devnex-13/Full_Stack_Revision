import { useRef } from "react";

const AddUserForm = ({setUsers}) => {
  const nameElement = useRef("");
  const roleElement = useRef("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const username = nameElement.current.value
    const userrole = roleElement.current.value

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
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers(preData => [...preData,data])

        nameElement.current.value = "";
        roleElement.current.value = "";
      });
  };

  return (
    <div>
      <form action="/api/users" onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          ref={nameElement}
          placeholder="Enter The Name"
        />
        <label>Role:</label>
        <input
          type="text"
          ref={roleElement}
          placeholder="Enter The Name"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddUserForm;
