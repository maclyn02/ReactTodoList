import { Button, FormControl, Input } from '@material-ui/core';
import React, { useState } from 'react';
import './App.css';
import Todo from './Todo';

function App() {
  // Setup state for list of todos using 'useState' Hook -> short term memory
  const [todos, setTodos] = useState([])
  // Setup state for the input field
  const [input, setInput] = useState('')

  // Setup onclick add event
  const addTodo = (event) => {
    // Prevent page from refreshing when form is submitted
    event.preventDefault()
    // execute this part of code when 'SAVE' button is clicked
    setTodos([...todos, input])
    // clear input after submitting
    setInput('')
  }

  // Stuff to render
  return (
    <div className="App">
      <h1>Plan your to-do's...</h1>
      <h2>Lets get started 🚀</h2>
      <form>
        <FormControl>
          <Input value={input} onChange={event => setInput(event.target.value)} />
        </FormControl>
        <Button disabled={!input} variant="contained" color="primary" type="submit" onClick={addTodo}>
          {/* { console.log(input.toString()) } */}
          Save
        </Button>
      </form>
      <div>
        <ul>
          {/* Loop through the todos set in useState */}
          {todos.map((todo, index) => (
            <Todo todo={todo} key={index} />
          ))
          }
        </ul>
      </div>
    </div>
  )
}

export default App;
