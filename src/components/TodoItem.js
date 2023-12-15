import { useAppState } from '../contexts/AppContext'
import React, { useState } from 'react'
import ConfirmationDialog from './ConfirmationDialog'
import TodoDialog from './TodoDialog'

/**
 * Component representing a single Todo item.
 * @param {Object} props - The props for the TodoItem component.
 * @param {Object} props.data - The data for the Todo item.
 * @returns {JSX.Element} React element representing a Todo item.
 */
function TodoItem ({ data }) {
  const { dispatch } = useAppState()
  // const deletingTodo = state.deletingTodo
  const [isDeleteTodoDialogOpen, setIsDeleteTodoDialogOpen] = useState(false)
  const [isTodoDialogOpen, setIsTodoDialogOpen] = useState(false)

  /**
     * Handles the toggle between completed and active state of the Todo item.
     * @returns {void}
     */
  function handleTodoCompletedToggle (event) {
    event.stopPropagation()
    const todoToUpdate = data
    if (todoToUpdate.type === 'COMPLETED') {
      todoToUpdate.type = 'ACTIVE'
    } else {
      todoToUpdate.type = 'COMPLETED'
    }

    dispatch({
      type: 'UPDATE_TODO', payload: todoToUpdate
    })
  }

  /**
     * Handles the confirmation of deleting a Todo item.
     * @returns {void}
     */
  function handleConfirmDeleteTodo () {
    dispatch({ type: 'DELETE_TODO', payload: { id: data.id } })
    dispatch({ type: 'DELETING_TODO_STATE', payload: false })
  }

  /**
     * Initiates the process of deleting a Todo item.
     * @returns {void}
     */
  function deleteTodo (event) {
    event.stopPropagation()
    dispatch({ type: 'DELETING_TODO_STATE', payload: true })
    setIsDeleteTodoDialogOpen(true)
  }

  /**
     * Handles the click event on the Todo item.
     * @returns {void}
     */
  function handleTodoItemClick (e) {
    e.preventDefault()
    setIsTodoDialogOpen(true)
  }

  function handleCancelDeleteTodo (event) {
    event.stopPropagation()
    setIsDeleteTodoDialogOpen(false)
    dispatch({ type: 'DELETING_TODO_STATE', payload: false })
  }

  return (
        <div>
            <div onClick={handleTodoItemClick}
                 className={`todo-item ${data?.type === 'COMPLETED' ? 'todo-completed' : ''}`}>
                <label className={'todo-check'} onClick={handleTodoCompletedToggle}>
                    <input type="checkbox" checked={data.type === 'COMPLETED'}/>
                    <span className={'checkmark'}></span>
                </label>
                <div className={'todo-item-content'}>
                    <p className={'todo-title'}>{data?.title}</p>
                    <p className={'todo-description'}>{data?.description}</p>
                    <div className={'todo-item-labels-container'}>
                        {data.labels && data.labels.map((label) => (
                            <span className={'todo-item-label'} key={label.id}>{label.label}</span>))}
                    </div>

                    <ConfirmationDialog title="Delete todo!" description="Are you sure you want to delete todo!"
                                        isOpen={isDeleteTodoDialogOpen} onClose={handleCancelDeleteTodo}
                                        onConfirm={handleConfirmDeleteTodo}/>

                </div>
                <button onClick={deleteTodo} className={'todo-delete-btn'}>
                    <span
                        className="material-symbols-outlined">delete</span>
                </button>

            </div>
            <TodoDialog isOpen={isTodoDialogOpen} data={data} onClose={() => setIsTodoDialogOpen(false)}/>
        </div>)
}

export default TodoItem
