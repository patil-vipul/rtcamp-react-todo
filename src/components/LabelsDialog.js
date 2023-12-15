import { useAppState } from '../contexts/AppContext'
import ConfirmationDialog from './ConfirmationDialog'
import React, { useState } from 'react'
import CreateLabel from './CreateLabel'

/**
 * Component representing a dialog for managing labels.
 * @param {Object} props - The props for the LabelsDialog component.
 * @param {boolean} props.isOpen - Determines if the dialog is open.
 * @param {Function} props.onClose - Function to close the dialog.
 * @returns {JSX.Element} React element representing a LabelsDialog.
 */
function LabelsDialog ({ isOpen, onClose }) {
  const { state, dispatch } = useAppState()
  const [isDeleteLabelDialogOpen, setIsDeleteLabelDialogOpen] = useState(false)
  const [labelToDelete, setLabelToDelete] = useState(null)
  const labels = state.labels

  /**
     * Handles changes to a label's text.
     * @param {Event} event - The input change event.
     * @param {Label} label - The label object being edited.
     * @returns {void}
     */
  function handleLabelInputChange (event, label) {
    event.preventDefault()
    label.label = event.target.value
    dispatch({ type: 'UPDATE_LABEL', payload: label })
  }

  /**
     * Handles the click to delete a label.
     * @param {Label} label - The label object to be deleted.
     * @returns {void}
     */
  function handleDeleteLabelClick (label) {
    setLabelToDelete(label)
    setIsDeleteLabelDialogOpen(true)
  }

  /**
     * Handles the confirmation to delete a label.
     * @returns {void}
     */
  function handleConfirmDeleteLabelClick () {
    dispatch({ type: 'DELETE_LABEL', payload: labelToDelete })
    setLabelToDelete(null)
    setIsDeleteLabelDialogOpen(false)
  }

  return (
        <>
            {isOpen &&
                <div className={'dialog-wrapper'}>
                    <div className={'dialog-container'}>
                        <p>Labels Manager</p>
                        <div>
                            <CreateLabel/>
                        </div>

                        <div className={'label-selector-container'}>
                            {labels && labels.map((label) => (
                                <div key={label.id} className={'label-manager-item'}>
                                    <label>
                                        <input value={label.label}
                                               onChange={(event) => handleLabelInputChange(event, label)}/>
                                    </label>
                                    <button className={'btn '} onClick={() => handleDeleteLabelClick(label)}>
                                      <span className="material-symbols-outlined">
delete
</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className={'dialog-btn-container'}>
                            <button className={'dialog-btn btn'} onClick={onClose}>Done</button>
                        </div>

                        <ConfirmationDialog isOpen={isDeleteLabelDialogOpen} title={'Delete Label'}
                                            description={'Are you sure? Notes associated with label wont be deleted.'}
                                            onConfirm={handleConfirmDeleteLabelClick}
                                            onClose={() => setIsDeleteLabelDialogOpen(false)}/>

                    </div>
                </div>}
        </>)
}

export default LabelsDialog
