import "bootstrap/dist/css/bootstrap.min.css"
import Heading from "./Components/Heading"
import { useState } from "react"
import AddTodo from "./Components/AddTodo"
import TodoItems from "./Components/TodoItems"

function App() {

  const initialTodoItem = []

  const [todoItems, setTodoItems] = useState(initialTodoItem)

  const HandleNewItem = (itemName, itemDate) => {
    const newTodoItemList = [...todoItems, {name: itemName, Date: itemDate}]
    setTodoItems(newTodoItemList)
  }

  const HandleDeleteItem = (todoItemName) => {
    const newTodoItems= todoItems.filter((item) => item.name !== todoItemName);
    setTodoItems(newTodoItems)
  }

  return (
    <center>
    <Heading />
    <AddTodo HandleNewItem={HandleNewItem}/>
    <TodoItems todoItems={todoItems} HandleDeleteItem={HandleDeleteItem}/>
    </center>
  )
}

export default App
