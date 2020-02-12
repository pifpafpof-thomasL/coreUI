import React from "react";


import { useStore } from 'use-store'
 
export default function ComponentA() {
  let [ value, setValue ] = useStore('myValue', 3)

  // traditional event handler no longer needed for inputs
  const changeHandler = (e) => setValue(e.target.value)

  return (
    <div>
      Global Hook! :-) / useStore on ComponentA value = { value }
      <p>
        <input value={value} onChange={changeHandler} />
      </p>

      <input value={value} onChange={setValue} />
    </div>
  )
}

