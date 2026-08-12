const Message = ({count}) => {
  return (
    <div>
      {count == 10 ? <h3 style={{color:"green"}}>🎉Great Job!</h3>:<p>Current Count: {count}</p>}
    </div>
  )
}

export default Message