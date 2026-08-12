const Buttons = ({setCount}) => {
  return (
    <div>
      <button type="button" class="btn btn-success" style={{marginRight:"3rem"}} onClick={() => setCount((preCount) => preCount+1)}>+</button>
      <button type="button" class="btn btn-warning" style={{marginRight:"3rem"}} onClick={() => setCount(0)}>Reset</button>
      <button type="button" class="btn btn-danger" onClick={() => setCount((preCount) => preCount <= 0 ? 0 : preCount-1)}>-</button>
    </div>
  )
}

export default Buttons