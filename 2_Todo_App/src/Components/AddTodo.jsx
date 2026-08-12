import { useRef } from "react";

const AddTodo = ({HandleNewItem}) => {
  const todoNameElement = useRef("");
  const todoDateElement = useRef("");

  const handleAddButtonClick = (event) => {
    event.preventDefault();
    const todoName = todoNameElement.current.value;
    const todoDate = todoDateElement.current.value;

    HandleNewItem(todoName, todoDate);

    todoNameElement.current.value = "";
    todoDateElement.current.value = "";

  }

  return (
    <div>
      <form className="container text-center" onSubmit={handleAddButtonClick}>
        <div className="row">
          <div className="col-sm-9">
            <div className="row">
              <div className="col-8 col-sm-6">
                <input
                  ref={todoNameElement}
                  type="text"
                  placeholder="Enter Todo Here..."
                ></input>
              </div>
              <div className="col-4 col-sm-6">
                <input
                  type="date"
                  ref={todoDateElement}
                ></input>
              </div>
            </div>
          </div>
          <div className="col-sm-3">
            <button className="btn btn-success">
              <p>ADD</p>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTodo;
