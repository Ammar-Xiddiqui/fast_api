import React, { useState } from 'react'

const App = () => {
  const [name, setname] = useState('')
  
  function prnt(e){
    e.preventDefault()
    
    console.log('form is submitted by ',name)
    
  }
  return (
    <div>
      <form onSubmit={(e)=>{
        prnt(e)
        setname("")
      }}>
         <input  value={name} onChange={(e)=>{
          setname(e.target.value)
          
         }} className='px-20 py-10 m-10' type="text" name="" id="" placeholder='enter your name' />
         
      <button  className='bg-black text-white px-20 py-10 m-10 '>submit</button>
      </form>
     
    </div>
  )
}

export default App
