import React, { useEffect, useState } from 'react';
import { Button, Input } from '@material-ui/core';
import './App.css';
import Todo from './Todo';
import db from './firebase'
import firebase from 'firebase'

function App() {
  // Setup state for list of todos using 'useState' Hook -> short term memory
  const [todos, setTodos] = useState([])
  // Setup state for the title field
  const [titleInput, setTitleInput] = useState('')
  // Setup state for the description field
  const [descriptionInput, setDescriptionInput] = useState('')

  // onload functionality to read from database
  // useEffect runs once when the page loads(or when a field(if provided as argument in []) refreshes)
  useEffect(() => {
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => (
          {
            'title': doc.data().title,
            'description': doc.data().description
          })
      ))
    })
  }, [])


  // Setup onclick add event
  const addTodo = (event) => {
    // Prevent page from refreshing when form is submitted
    event.preventDefault()
    // execute this part of code when 'SAVE' button is clicked
    db.collection('todos').add({
      title: titleInput,
      description: descriptionInput,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    // setTodos([
    //     ...todos, 
    //     {
    //       'title': titleInput,
    //       'description': descriptionInput
    //   }])

    // clear input after submitting
    setTitleInput('')
    setDescriptionInput('')
  }
  
  // Stuff to render
  return (
    <div className="App">
      <h1>Plan your to-do's...</h1>
      <h2>Lets get started 🚀</h2>
      <form className='TodoForm'>
        <Input value={titleInput} onChange={event => setTitleInput(event.target.value)} placeholder='Title'/>
        <Input value={descriptionInput} onChange={event => setDescriptionInput(event.target.value)} placeholder='Description' className='DescriptionInput' />
        <Button disabled={!titleInput} variant="contained" color="primary" type="submit" onClick={addTodo}>
          {/* { console.log(input.toString()) } */}
          Save
        </Button>
      </form>
      <div>
        {/* Loop through the todos set in useState */}
        {todos.map((todo, index) => (
          <Todo title={todo.title} description={todo.description} key={index} />
        ))
        }
      </div>
    </div>
  )
}

export default App;
