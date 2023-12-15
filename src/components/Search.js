import { useAppState } from '../contexts/AppContext'
import React, { useState } from 'react'
import Button from './Button'
import TodoDialog from './TodoDialog'

/**
 * Component representing a search input field.
 * @returns {JSX.Element} React element representing the Search component.
 */
function Search () {
  const { state, dispatch } = useAppState()
  const [isNewTodoDialogOpen, setIsNewTodoDialogOpen] = useState(false)
  const searchQuery = state.searchQuery

  /**
     * Handles the change in the search query.
     * @param {Event} event - The input change event.
     * @returns {void}
     */
  function handleSearchQueryChange (event) {
    event.preventDefault()
    dispatch({ type: 'SEARCH_QUERY_CHANGE', payload: event.target.value })
  }

  function handleHamburgerClick () {
    dispatch({ type: 'SET_OPEN_SIDEBAR', payload: true })
  }

  /**
     * Handles the click event for adding a new todo.
     */
  function handleAddTodoClick () {
    setIsNewTodoDialogOpen(true)
  }

  /**
     * Handles the closing event of the todo dialog.
     */
  function handleTodoDialogOnClose () {
    setIsNewTodoDialogOpen(false)
  }

  return (<div className={'search-container'}>
        <label className={'search-wrapper'}>
            <span onClick={handleHamburgerClick} className="material-symbols-outlined hide-on-desktop show-on-mobile">menu</span>

            <input className={'search-input'} placeholder="Search" value={searchQuery}
                   onChange={handleSearchQueryChange}/>
        </label>
        {/* Button to Add Todo. Only visible on desktop mode. */}
        <div className={'desktop-add-todo-btn-container'}>
            <Button className={'btn btn-with-icon hide-on-mobile'} onClick={handleAddTodoClick}>Add Todo <span
                className="material-symbols-outlined">
add_circle
</span></Button>
        </div>
        {/* Render TodoDialog */}
        <div>
            <TodoDialog isOpen={isNewTodoDialogOpen} onClose={handleTodoDialogOnClose}/>
        </div>
    </div>)
}

export default Search
