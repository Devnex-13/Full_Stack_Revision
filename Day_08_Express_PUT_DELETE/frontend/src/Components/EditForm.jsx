import { useRef } from "react"

const EditForm = ({user, setSuccess, setShowEditForm}) => {

  const newNameElement = useRef("")
  const newRoleElement = useRef("")

  const handleNewValue = (id) => {
    const newName = newNameElement.current.value;
    const newRole = newRoleElement.current.value;

    fetch(`http://localhost:3001/api/users/${id}`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        name: newName,
        role: newRole,
      }),
    })
    .then(res => {
      if(!res.ok){
          throw new Error("Something wents Wrong!!")
        }

        return res.json()
    })
    .then(data => {
      setSuccess("✅ User Updated Successfully!!")
      console.log(data)

      newNameElement.current.value = "";
      newRoleElement.current.value = "";
    })

  }

  const handleCancel = () => {
    setShowEditForm(false)
  }

  return (
    <center>
      <form action="/api/users" onSubmit={() => handleNewValue(user.id)}>
        <label>New Name:</label>
        <div>
          <input
            type="text"
            style={{width:"100%",margin:"1rem"}}
            ref={newNameElement}
            defaultValue={user.name}
            placeholder="Enter The Name"
          />
        </div>
        <label>New Role:</label>
        <div>
        <input
            type="text"
            style={{width:"100%",margin:"1rem"}}
            ref={newRoleElement}
            defaultValue={user.role}
            placeholder="Enter The Name"
          />
          </div>
        <div style={{display:"flex", justifyContent:"center",gap:"2rem"}}>
          <div>
        <button type="submit">Update</button>
        </div>
        <div>
        <button onClick={() => handleCancel}>Cancel</button>
        </div>
        </div>
      </form>
    </center>
  )
}

export default EditForm