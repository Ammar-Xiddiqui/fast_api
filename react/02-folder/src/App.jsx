import React, { useState } from 'react'



const App = () => {

  const [user, setuser] = useState({name:"ammar",age:21})
  function chang(){
    setuser(prev=>({...prev,age:30}))
  }
  // const [num, setnum] = useState(0)
  // function inc(){
  //   setnum(num+10)

  // }
  // function dec(){
  //   setnum(num-10)
  //   setnum(num-21)

  // }
  return (

    <div>
      <h1>{user.age} and {user.name}</h1>
      <button onClick={chang}>change</button>
    </div>
    // <div>
    //   <h1>this is small app</h1>
    //   <h1>{num}</h1>
    //   <button onClick={inc}>Increment</button>
    //   <button onClick={dec}>decrement</button>
    // </div>
  )
}

export default App
