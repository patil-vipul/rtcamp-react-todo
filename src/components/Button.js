/** File: Button.js
 Description: This file contains the Button component used for user interactions.
 Export: Default export of the Button component.
 */
import React from 'react'

/**
 * Functional component representing a customizable button.
 * @param {Object} props - The props for the Button component.
 * @param {React.ReactNode} props.children - The content within the button.
 * @param {Function} props.onClick - The function to be executed on button click.
 * @returns {JSX.Element} React element representing the button.
 */
function Button ({ children, onClick, className }) {
  return (<button className={className} onClick={onClick}>
        {children}
    </button>)
}

export default Button
