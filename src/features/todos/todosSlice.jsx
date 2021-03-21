import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchTodos = createAsyncThunk(

  'todos/fetchTodos',
  async () => {
    try {
      const data = await fetch('https://jsonplaceholder.typicode.com/todos/?_limit=5')
      return await data.json()
    } catch (e) {
      return e.message
    }

  }
)

export const checkTodo = createAsyncThunk(
  'todos/check',
  async (id, completed) => {
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ completed: !completed }),
      headers: {
        'Content-type': 'application.json'
      }
    })

    return id
  }
)

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodos',

  async (id) => {
    try {
      await fetch(`https://jsodnplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE'
      })
      return id
    } catch (e) {
      return alert('hi')
    }
  }
)

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {

  },
  extraReducers: {
    [fetchTodos.pending]: (state) => {
      state.loading = true
    },
    [fetchTodos.fulfilled]: (state, action) => {
      state.items = action.payload
      state.loading = false
    },
    [deleteTodo.fulfilled]: (state, action) => {
      const index = state.items.findIndex((item) => {
        return item.id === action.payload
      })

      state.items.splice(index, 1)
    },

    [deleteTodo.rejected]: (state, action) => {
      state.error = action.payload
    },

    [checkTodo.fulfilled]: (state, action) => {
      const checkIndex = state.items.findIndex(item => {
        return item.id === action.payload
      })
      state.items[checkIndex].completed = !state.items[checkIndex].completed
    }
  }
})

export default todosSlice.reducer