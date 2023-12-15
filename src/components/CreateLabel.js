import React, { useState } from 'react'
import { customNanoId, sanitizeAlphanumeric } from '../libraries/helper'
import { useAppState } from '../contexts/AppContext'

/**
 * Component for creating a new label.
 * @returns {JSX.Element} React component for creating a new label.
 */
function CreateLabel () {
  const { dispatch } = useAppState()
  const [errors, setErrors] = useState({})
  const [newLabel, setNewLabel] = useState('')

  /**
     * Handles changes in the input field for the new label.
     * Clears errors if any on label change.
     * @param {Event} event - The input change event.
     */
  function handleLabelChange (event) {
    setNewLabel(event.target.value)
    if (errors.label) {
      setErrors({ ...errors, label: '' })
    }
  }

  /**
     * Handles the click event for adding a new label.
     * Validates the label and dispatches action to add the label.
     * @param {Event} event - The click event.
     */
  function handleAddNewLabelClick (event) {
    event.preventDefault()
    const labelToCreate = {
      id: customNanoId(3), label: newLabel
    }

    // Validate label before submission.
    if (labelToCreate.label.trim() === '') {
      setErrors({ ...errors, label: 'Label should not be empty.' })
      return
    } else if (labelToCreate.label.length > 256) {
      setErrors({ ...errors, label: 'Label should be less than 64 letters.' })
      return
    }

    // We strip all the characters except alphabets and numbers.
    const sanitizedLabel = sanitizeAlphanumeric(labelToCreate.label)

    // Check if the sanitized label is different from the original label
    if (sanitizedLabel !== labelToCreate.label) {
      setErrors({ ...errors, label: 'Label contains invalid characters.' })
      return
    }

    // If code reached here clear all errors.
    setErrors({})

    // Use the sanitized label.
    labelToCreate.title = sanitizedLabel

    dispatch({ type: 'ADD_LABEL', payload: labelToCreate })

    setNewLabel('')
  }

  return (
      <div>
      <div className={'create-label-container'}>
        <label className={'labeled-input'}>
            <p>Create New Label</p>
            <input placeholder="New label" onChange={handleLabelChange}
                   value={newLabel}/>

        </label>

        <button className={'btn '} onClick={handleAddNewLabelClick}><span className="material-symbols-outlined">
add
</span></button>

    </div>{errors.label && <span className={'error-message'}>{errors.label}</span>}</div>)
}

export default CreateLabel
