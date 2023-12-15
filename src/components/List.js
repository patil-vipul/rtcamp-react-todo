import React from 'react'
import TodoItem from './TodoItem'

/**
 * Component representing a list of Todo items.
 * @param {Object} props - The props for the List component.
 * @param {data[]} props.data - The array of Todo items.
 * @returns {JSX.Element} React element representing a list of Todo items.
 */
function List ({ data }) {
  return (<div className={'todo-list-container'}>
        {data && data.map((item) => (
            <TodoItem key={item.id} data={item}/>
        ))}
    </div>)
}

export default List
