import { useAppState } from '../contexts/AppContext'
import React, { useEffect, useState } from 'react'
import { customNanoId, sanitizeAlphanumeric } from '../libraries/helper'
import CreateLabel from './CreateLabel'

/**
 * Component representing a dialog for creating or updating a Todo item.
 * @param {Object} props - The props for the TodoDialog component.
 * @param {boolean} props.isOpen - Determines if the dialog is open.
 * @param {Function} props.onClose - Function to close the dialog.
 * @param {data} props.data - The data for the Todo item being edited (if any).
 * @returns {JSX.Element} React element representing a Todo item dialog.
 */
function TodoDialog ({ isOpen, onClose, data }) {
  // We determine if it dialog is used for update or creation of todo.
  const isUpdate = !!data

  const { state, dispatch } = useAppState()
  const [errors, setErrors] = useState({})
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedLabels, setSelectedLabels] = useState([])

  const labels = state.labels

  function handleCheckboxChange (label) {
    const isSelected = selectedLabels.some((selectedLabel) => selectedLabel.id === label.id)

    if (isSelected) {
      const updatedLabels = selectedLabels.filter((selectedLabel) => selectedLabel.id !== label.id)
      setSelectedLabels(updatedLabels)
    } else {
      setSelectedLabels([...selectedLabels, label])
    }
  }

  function handleTitleChange (event) {
    setTitle(event.target.value)
    if (errors.title) {
      setErrors({ ...errors, title: '' })
    }
  }

  function handleDescriptionChange (event) {
    setDescription(event.target.value)
    if (errors.description) {
      setErrors({ ...errors, description: '' })
    }
  }

  function handleTodoFormSubmit (event) {
    event.preventDefault()
    const newTodoData = {
      id: isUpdate ? data.id : customNanoId(3),
      title,
      description,
      labels: selectedLabels,
      type: isUpdate ? data.type : 'ACTIVE',
      updatedAt: new Date()
    }

    // Validate title before submission.
    if (newTodoData.title.trim() === '') {
      setErrors({ ...errors, title: 'Title should not be empty.' })
      return
    } else if (newTodoData.title.length > 256) {
      setErrors({ ...errors, title: 'Title should be less than 256 letters.' })
      return
    }

    if (newTodoData.description.length > 512) {
      setErrors({ ...errors, description: 'Description should be less than 512 letters.' })
      return
    }

    // We strip all the characters except alphabets and numbers.
    const sanitizedTitle = sanitizeAlphanumeric(newTodoData.title)

    // Check if the sanitized title is different from the original title
    if (sanitizedTitle !== newTodoData.title) {
      setErrors({ ...errors, title: 'Title contains invalid characters.' })
      return
    }

    // If code reached here clear all errors.
    setErrors({})

    // Use the sanitized title.
    newTodoData.title = sanitizedTitle

    if (newTodoData) {
      if (isUpdate) {
        dispatch({ type: 'UPDATE_TODO', payload: newTodoData })
        dispatch({ type: 'UPDATE_TODO', payload: newTodoData })
      } else {
        dispatch({ type: 'ADD_TODO', payload: newTodoData })
      }
    }

    // We reset the dialog states.
    resetDialogStates();

    onClose()
  }

  function resetDialogStates(){
    setTitle('');
    setDescription('');
    setSelectedLabels([]);
    setErrors({})
  }

  useEffect(() => {
    if (data?.title) {
      setTitle(data.title)
    }
    if (data?.description) {
      setDescription(data.description)
    }
    if (data?.labels) {
      setSelectedLabels(data.labels)
    }
  }, [])
  return (<>
        {isOpen &&

            <div className={'dialog-wrapper'}>
                <form className={'dialog-container'} onSubmit={handleTodoFormSubmit}>
                    <div>
                        <label className={'labeled-input'}>
                            <p>Title</p>
                            <input placeholder='Title' onChange={handleTitleChange} value={title}/>
                        </label>
                        {errors.title && <span className={'error-message'}>{errors.title}</span>}
                    </div>
                    <div>
                        <label className={'labeled-input'}>
                            <p>Description</p>
                            <input placeholder='Description' onChange={handleDescriptionChange}
                                   value={description}/>
                        </label>
                        {errors.description && <span className={'error-message'}>{errors.description}</span>}
                    </div>
                    <div>
                        <p>Labels</p>
                        <div className={'label-selector-container'}>
                            {labels && labels.map((label) => (
                                <div key={label.id}>
                                    <label className={'label-selector-item'}>
                                        <input className={'label-selector-checkbox'} type="checkbox"
                                               checked={selectedLabels.some((selectedLabel) => selectedLabel.id === label.id)}
                                               onChange={() => handleCheckboxChange(label)}/> <span>{label.label}</span>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <CreateLabel/>
                    </div>
                    <div className={'dialog-btn-container'}>
                        <button type="button" onClick={()=>{
                          resetDialogStates();
                          onClose();
                        }} className={'dialog-btn btn'}>Close</button>
                        <button type='submit' className={'dialog-btn btn'}>{isUpdate ? 'Update' : 'Add'}</button>
                    </div>
                </form>
            </div>}
    </>)
}

export default TodoDialog
