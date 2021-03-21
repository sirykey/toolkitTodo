import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkTodo, deleteTodo, fetchTodos } from '../features/todos/todosSlice'
import  '../style.css'

function App (props) {
  const dispatch = useDispatch()
  const todos = useSelector(state => state.items)
  const loading = useSelector(state => state.loading)

  useEffect(() => {
    dispatch(fetchTodos())
  }, [])

  const handleDelete = (id) => {
    dispatch(deleteTodo(id))
  }

  const handleCheck = (id, completed) => {
    dispatch(checkTodo(id, completed))
  }

  return (
    <div>
      {todos.map(todo => {
        return <div>
          <input type='checkbox'
                 checked={todo.completed}
                 onChange={() => {handleCheck(todo.id, todo.completed)}}
          />
          <button onClick={() =>{handleDelete(todo.id)}}>Delete</button>
          <div className='todo'>{todo.title}</div>
        </div>
      })}
    </div>
  )
}

export default App