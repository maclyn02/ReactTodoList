import React from 'react'

function Todo(props) {
    return (
        <div>
            <li>
                {props.todo}
            </li>
        </div>
    )
}

export default Todo
