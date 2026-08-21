import EditDeleteUser from "./EditDeleteUser";

const ViewUsers = ({user, setUsers, setSuccess}) => {

  return (
    <div className="card w-50">
      <div className="card-body">
        <h5 className="card-title">User {user.id}</h5>
        <p className="card-text">
          NAME: {user.name}
        </p>
        <p className="card-text">
          ROLE: {user.role}
        </p>
        <EditDeleteUser user={user} id={user.id} setSuccess={setSuccess} setUsers={setUsers}/>
      </div>
    </div>
  );
};

export default ViewUsers;
