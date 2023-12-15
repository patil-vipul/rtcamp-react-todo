/**
 * Main App component that manages the rendering of the application.
 * @file Manages the primary rendering of the application.
 */
import './App.css'
import Search from './components/Search'
import Button from './components/Button'
import List from './components/List'
import { useAppState } from './contexts/AppContext'
import React, { useEffect, useMemo, useState } from 'react'
import TodoDialog from './components/TodoDialog'
import Sidebar from './components/Sidebar'

/**
 * Main App component responsible for rendering the entire application.
 * @returns {JSX.Element} Rendered React element.
 */
function App () {
  // Retrieve state from context
  const { state, dispatch } = useAppState()
  const [todoType, setTodoType] = useState('ACTIVE')
  const todos = state.todos
  const searchQuery = state.searchQuery
  const selectedLabel = state.selectedLabel
  const [isNewTodoDialogOpen, setIsNewTodoDialogOpen] = useState(false)

  /**
     * Filter and sort todos based on selected label, search query, and todo type.
     * We use 'useMemo' for performance improvements ( to only re-render if dependency is updated).
     *
     * @param {Array} todos - Array of todos to filter.
     * @param {string} todoType - Type of todo to filter ('ACTIVE' or 'COMPLETED').
     * @param {string} searchQuery - Search query for filtering todos.
     * @param {string} selectedLabel - Selected label for filtering todos.
     * @returns {Array} Filtered and sorted todos.
     */
  const filteredAndSortedTodos = useMemo(() => {
    const filteredByLabelTodos = selectedLabel && selectedLabel !== 'all-labels' ? todos.filter(todo => (todo.labels && todo.labels.some(label => label.label === selectedLabel))) : todos

    return filteredByLabelTodos.filter(todo => ((todo.title.toLowerCase().includes(searchQuery.toLowerCase()) || todo.description.toLowerCase().includes(searchQuery.toLowerCase())) && (todoType === todo.type)))
  }, [todos, todoType, searchQuery, selectedLabel])

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

  useEffect(() => {
    // We reset the selected label to all labels, on app initialization to override the previously used label.
    // This is also a hack to overcome limitations in our custom redux implementation.
    dispatch({ type: 'SELECTED_LABEL_CHANGE', payload: 'all-labels' })
  }, [])

  return (<div className="app-container">
        {/* Render Sidebar */}
        <Sidebar/>

        {/* Main content */}
        <div className="main-content">
            {/* Render Search Component */}
            <Search/>
            <div className={'content-section'}>
                {/* Tab buttons for switching between Todo Type list */}
                <div className={'tabs-wrapper'}>
                    <button className={`tabs-btn ${todoType === 'ACTIVE' ? 'tab-selected' : ''}`}
                            onClick={() => setTodoType('ACTIVE')}>Active
                    </button>
                    <button className={`tabs-btn ${todoType === 'COMPLETED' ? 'tab-selected' : ''}`}
                            onClick={() => setTodoType('COMPLETED')}>Completed
                    </button>
                </div>

                {/* Render Todo List */}
                <div>
                    <List data={filteredAndSortedTodos}/>
                </div>

                {/* Button to Add Todo */}
                <div className={'mobile-add-todo-container hide-on-desktop show-on-mobile'}>
                    <div className={'mobile-add-todo-inner'}>
                    <Button className={'btn'} onClick={handleAddTodoClick}>Add Todo +</Button>
                    </div>
                </div>
            </div>
        </div>

        {/* Render TodoDialog */}
        <div>
            <TodoDialog isOpen={isNewTodoDialogOpen} onClose={handleTodoDialogOnClose}/>
        </div>
    </div>)
}

export default App
