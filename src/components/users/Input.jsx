import React from 'react'

function Input({onChange , title , error , value , type = "text", name = ""}) {
  return (
    <div className='flex gap-1 flex-col'>
        <label className='text-sm'>{title}:</label>
        <input name={name} type={type} className='flex-grow outline-none text-main px-4 py-1 rounded-sm'  onChange={(e)=>onChange(e.target.value)} defaultValue={value} />
        <p className='text-xs text-second px-3'>{error}</p>
    </div>
  )
}

export default Input