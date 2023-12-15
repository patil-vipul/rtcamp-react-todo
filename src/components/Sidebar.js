import { useAppState } from '../contexts/AppContext'
import React, { useState } from 'react'
import LabelsDialog from './LabelsDialog'

/**
 * Component representing the sidebar of the application.
 * @returns {JSX.Element} React element representing the Sidebar.
 */
function Sidebar () {
  const { state, dispatch } = useAppState()
  const [isLabelsDialogOpen, setIsLabelsDialogOpen] = useState(false)
  const labels = state.labels
  const openSidebar = state.openSidebar
  const selectedLabel = state.selectedLabel

  /**
     * Handles the change in selected label.
     * @param {string} label - The selected label.
     * @returns {void}
     */
  function handleSelectedLabelChange (label) {
    dispatch({ type: 'SELECTED_LABEL_CHANGE', payload: label })
  }

  function handleSidebarScrimClick () {
    dispatch({ type: 'SET_OPEN_SIDEBAR', payload: false })
  }

  return (<div onClick={handleSidebarScrimClick}
                 className={`sidebar-container ${openSidebar ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className={'sidebar'}>
            <h2 className={'sidebar-title'}>rt-2Do</h2>
            <p className={'labels-title'}>Labels</p>

            <div>
                <ul className={'labels-container'}>
                    <li className={`labels-container-item ${selectedLabel === 'all-labels' ? 'labels-container-selected-item' : ''}`}
                        onClick={() => handleSelectedLabelChange('all-labels')}>All
                    </li>
                    {labels && labels.map((label) => (
                        <li className={`labels-container-item ${selectedLabel === label.label ? 'labels-container-selected-item' : ''}`}
                            onClick={() => handleSelectedLabelChange(label.label)}
                            key={label.id}>{label.label}</li>))}
                </ul>
            </div>
            <button className={'text-btn'} onClick={() => setIsLabelsDialogOpen(true)}>Manage Labels</button>
            <LabelsDialog isOpen={isLabelsDialogOpen} onClose={() => setIsLabelsDialogOpen(false)}/>
        </div>
    </div>)
}

export default Sidebar
