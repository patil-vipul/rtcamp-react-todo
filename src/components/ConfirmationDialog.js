import React from 'react'

/**
 * Component representing a confirmation dialog.
 * @param {Object} props - The props for the ConfirmationDialog component.
 * @param {boolean} props.isOpen - Determines if the dialog is open.
 * @param {Function} props.onConfirm - Function to confirm the action.
 * @param {Function} props.onClose - Function to close the dialog.
 * @param {string} props.title - Title of the confirmation dialog.
 * @param {string} props.description - Description/content of the confirmation dialog.
 * @returns {JSX.Element} React element representing a confirmation dialog.
 */
function ConfirmationDialog ({ isOpen, onConfirm, onClose, title, description }) {
  return (<>
        {isOpen &&
            <div className={'dialog-wrapper'}>
                <div className={'dialog-container'}>
                    <p>{title}</p>
                    <p>{description}</p>
                    <div className={'dialog-btn-container'}>
                        <button className={'dialog-btn btn'} onClick={onClose}>Cancel</button>
                        <button className={'dialog-btn btn'} onClick={onConfirm}>Confirm</button>
                    </div>

                </div>
            </div>}
    </>)
}

export default ConfirmationDialog
