import React from "react";
import { useStore } from 'use-store'
 
export default function ComponentA() {
  let [ value, setValue ] = useStore('myValue')

  // traditional event handler no longer needed for inputs
  //const changeHandler = (e) => setValue(e.target.value)

  return (
    <div>
      Hook Component B should have the same value {value}
      <input value={value} onChange={setValue} style={{ marginLeft: '15px' }}/>
    </div>
  )
}

