const InputBox = ({Label,Ref,Type,Placeholder}) => {
  return (
    <div className="mb-3" style={{ margin: "3rem" }}>
      <label className="form-label">{Label}</label>
      <input
        type={Type}
        className="form-control"
        ref={Ref}
        id="exampleFormControlInput1"
        placeholder={Placeholder}
      />
    </div>
  );
};

export default InputBox;
