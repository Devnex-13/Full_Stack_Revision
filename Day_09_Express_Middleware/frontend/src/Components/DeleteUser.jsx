import { useState } from "react";

const DeleteUser = ({ user, id, setUsers, setSuccess }) => {

  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = (id) => {
    setIsDeleting(true)
    fetch(`http://localhost:3001/api/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if(!res.ok){
          throw new Error("Something wents Wrong!!")
        }

        return res.json()
      })
      .then((data) => {
        console.log(data);
        setUsers((currentUser) => currentUser.filter((user) => user.id !== id));
        setSuccess("✅ User Deleted Successfully");
        setIsDeleting(false)
        setTimeout(() => {
          setSuccess(null);
        }, 3000);
      });
  };

  return (
    <button
      type="button"
      className="btn btn-danger"
      disabled={isDeleting}
      onClick={() => {
        if(confirm(`Are You Sure you want to Delete ${user.name}?`)){
          handleDelete(id)
        }
      }}
    >
      {isDeleting ? "Deleting...":"Delete"}
    </button>
  );
};

export default DeleteUser;
