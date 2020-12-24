import React from 'react'
import { Checkbox, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import './Todo.css'

function Todo(props) {
    return (
        <div className="Todo">
            <List>
                <ListItem button>
                <ListItemIcon>
                    <Checkbox edge="start" />
                </ListItemIcon>
                <ListItemText primary={props.title} secondary={props.description}/>
                <ListItemSecondaryAction>
                    <IconButton edge="end">
                        <DeleteIcon />
                    </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
        </div>
    )
}

export default Todo
