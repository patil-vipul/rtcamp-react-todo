/**
 * @file Manages the application state and provides the AppContext.
 * This implementation of context is inspired from redux.
 * I've tried to keep it simple while keeping it similar to redux.
 */

import React, { createContext, useContext, useEffect, useReducer } from 'react'

// Define initial state.
const initialState = {
  todos: [],
  labels: [],
  deletingTodo: false,
  searchQuery: '',
  selectedLabel: 'all-labels',
  openSidebar: false
}

/**
 * Handles the deletion of a todo item from state.
 * @param {Object} state - Current state object.
 * @param {Object} payload - Payload containing todo ID for deletion.
 * @returns {Object} Updated state after todo deletion.
 */
function handleDeleteTodo (state, payload) {
  // Deletion logic for todos.
  const { id } = payload
  const updatedTodos = state.todos.filter(todo => todo.id !== id)
  return { ...state, todos: updatedTodos }
}

/**
 * Handles the deletion of a label from state and associated todos.
 * @param {Object} state - Current state object.
 * @param {Object} payload - Payload containing label ID for deletion.
 * @returns {Object} Updated state after label deletion.
 */
function handleDeleteLabel (state, payload) {
  // Deletion logic for labels and associated todos.
  const { id } = payload
  const updatedLabels = state.labels.filter(label => label.id !== id)
  const updatedTodosWithoutLabel = state.todos.map(todo => {
    const filteredLabels = todo.labels?.filter(todoLabel => todoLabel.id !== id)

    return {
      ...todo,
      labels: filteredLabels
    }
  })
  return { ...state, labels: updatedLabels, todos: updatedTodosWithoutLabel }
}

function handleUpdateLabel (state, payload) {
  const updatedLabel = payload
  // Update labels
  const updatedLabels = state.labels.map(label => {
    if (label.id === updatedLabel.id) {
      return { ...label, ...updatedLabel }
    }
    return label
  })

  // Update todos with the updated label text
  const updatedTodosWithLabel = state.todos.map(todo => {
    const updatedTodoLabels = todo.labels?.map(todoLabel => {
      if (todoLabel.id === updatedLabel.id) {
        return { ...todoLabel, label: updatedLabel.label }
      }
      return todoLabel
    })

    return {
      ...todo,
      labels: updatedTodoLabels
    }
  })

  return {
    ...state,
    labels: updatedLabels,
    todos: updatedTodosWithLabel
  }
}

function handleUpdateTodo (state, payload) {
  const updatedTodo = payload
  const updatedTodos = state.todos.map(todo => {
    if (todo.id === updatedTodo.id) {
      return { ...todo, ...updatedTodo }
    }
    return todo
  })
  return { ...state, todos: updatedTodos }
}

/**
 * Define reducer actions, similarly to mutations in Redux.
 * As we cannot use Redux or other library we create a simple imitation of it.
 *
 * @param state
 * @param action
 */
const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, counter: state.counter + 1 }
    case 'DECREMENT':
      return { ...state, counter: state.counter - 1 }
    case 'SET_OPEN_SIDEBAR':
      return { ...state, openSidebar: action.payload }
    case 'DELETING_TODO_STATE':
      return { ...state, deletingTodo: action.payload }
    case 'ADD_LABEL':
      return { ...state, labels: [...state.labels, action.payload] }
    case 'UPDATE_LABEL':
      return handleUpdateLabel(state, action.payload)
    case 'DELETE_LABEL':
      return handleDeleteLabel(state, action.payload)
    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, action.payload] }
    case 'SEARCH_QUERY_CHANGE':
      return { ...state, searchQuery: action.payload }
    case 'SELECTED_LABEL_CHANGE':
      return { ...state, selectedLabel: action.payload }
    case 'UPDATE_TODO':
      return handleUpdateTodo(state, action.payload)
    case 'DELETE_TODO':
      return handleDeleteTodo(state, action.payload)
    default:
      return state
  }
}

// We create custom context for our states.
const AppContext = createContext(undefined)

/**
 * Provider to wrap the app, providing access to state and dispatch.
 * @param {Object} props - Component props.
 * @param {ReactNode} props.children - Nested elements/components.
 * @returns {JSX.Element} Rendered React element.
 */
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
    const storedState = localStorage.getItem('appState')
    const parsedStoredState = storedState ? JSON.parse(storedState) : {}

    // Merge localStorage data with initialState.
    return {
      ...initial,
      ...parsedStoredState
    }
  })

  // Save state to local storage whenever state changes.
  useEffect(() => {
    localStorage.setItem('appState', JSON.stringify(state))
  }, [state])

  return (<AppContext.Provider value={{ state, dispatch }}>
        {children}
    </AppContext.Provider>)
}

/**
 * Custom hook to access the state and dispatch from the context.
 * @returns {Object} State and dispatch objects from the context.
 */
const useAppState = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppState must be used within a AppProvider')
  }
  return context
}

export { AppProvider, useAppState }
