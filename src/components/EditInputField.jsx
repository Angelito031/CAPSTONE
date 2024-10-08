import React from 'react'

const EditInputField = ({id, placeholder, type, name, handleInputChange, value}) => {
  return (
    <div className="w-full mt-2">
        <input type={type} name={name} id={id} value={value} className="mt-1 p-4 w-full border-2 rounded-lg text-gray-800 border-gray-600 bg-gray-50" placeholder={placeholder} onChange={handleInputChange} />
    </div>
  )
}

export default EditInputField