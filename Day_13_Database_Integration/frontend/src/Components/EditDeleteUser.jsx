import { useState } from "react"
import EditForm from "./EditForm"
import DeleteUser from "./DeleteUser"

const EditDeleteUser = ({user, setSuccess, setUsers}) => {

  const [showEditForm, setShowEditForm] = useState(false)

  return (
    <div>
    <div style={{display:"flex",justifyContent:"center"}}>
    <button type="button" className="btn btn-primary" onClick={() => setShowEditForm(true)}>Edit</button>
    <div style={{padding:"5px"}}>
    <DeleteUser user={user} id={user.id} setUsers={setUsers} setSuccess={setSuccess}/>
    </div></div>
    {showEditForm && <EditForm user={user} setSuccess={setSuccess} setShowEditForm={setShowEditForm}/>}
    </div>
  )
}

export default EditDeleteUser