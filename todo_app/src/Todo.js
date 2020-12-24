import React, { useState } from 'react'
import { Button, Checkbox, IconButton, Input, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Modal } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import './Todo.css'
import db from './firebase'
import firebase from 'firebase'

function Todo(props) {

    const [open, setOpen] = useState(false)
    // Setup state for the title field
    const [titleInput, setTitleInput] = useState(props.title)
    // Setup state for the description field
    const [descriptionInput, setDescriptionInput] = useState(props.description)

    const updateTodo = () => {
        db.collection('todos').doc(props.id).set({
            title: titleInput,
            description: descriptionInput,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true })

        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }


    return (
        <div className="Todo">
            <List>
                <ListItem button onClick={handleOpen}>
                <ListItemIcon>
                    <Checkbox edge="start" />
                </ListItemIcon>
                <ListItemText primary={props.title} secondary={props.description}/>
                <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={event => db.collection('todos').doc(props.id).delete()} >
                        <DeleteIcon />
                    </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
            <Modal open={open} onClose={handleClose} className='Modal'>
                <div>
                    <form className='EditForm'>
                        <h2>Edit</h2>
                        <Input className='Elements' value={titleInput} onChange={event => setTitleInput(event.target.value)} />
                        <Input className='Elements' value={descriptionInput} onChange={event => setDescriptionInput(event.target.value)} />
                        <Button className='Elements' disabled={!titleInput} variant="contained" color="primary" type="submit" onClick={updateTodo}>
                            Save
                        </Button>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default Todo
