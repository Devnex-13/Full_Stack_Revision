const DisplayData = ({Image, Uname, Name, Following, Followers, P_Repos}) => {
  return (
    <div style={{justifyContent:"center",display:"flex"}}>
    <div className="card" style={{width: "18rem"}}>
      <img src={Image} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">User: {Uname}</h5>
        <p>Name: {Name}</p>
        <p>Followers: {Followers}</p>
        <p>Following: {Following}</p>
        <p>Publics Repos: {P_Repos}</p>
      </div>
    </div>
    </div>
  );
};

export default DisplayData;
