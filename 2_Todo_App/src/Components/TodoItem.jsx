const TodoItem = ({todoName, todoDate, HandleDeleteItem}) => {
  return (
     <div style={{"padding":"10px"}}>
      <div className="container">
          <div className="row">
            <div className="col-sm-9">
              <div className="row">
                <div className="col-8 col-sm-6">{todoName}</div>
                <div className="col-4 col-sm-6">{todoDate}</div>
              </div>
              <button onClick={() => HandleDeleteItem(todoName)}>X</button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default TodoItem