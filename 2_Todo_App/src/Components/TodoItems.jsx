import TodoItem from "./TodoItem"

const TodoItems = ({todoItems, HandleDeleteItem}) => {
  return (
    <div>
      {todoItems.map((item,index) => (<TodoItem key={index} todoName={item.name} todoDate={item.Date} HandleDeleteItem={HandleDeleteItem}/>))}
    </div>
  )
}

export default TodoItems