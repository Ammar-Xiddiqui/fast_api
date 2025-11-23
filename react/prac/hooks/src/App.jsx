import { useState } from "react";

const App =()=>{
  const [num, setnum] = useState(10)

  const increment=()=>{
    setnum(prev=>prev+1)
  }
  const decrement=()=>{
    setnum(prev=>prev-1)
  }
  
  return (<div>
    <h1>{num}</h1>
    <button className="bg-black" onClick={increment}>increment</button>
    <button onClick={decrement}>decrement</button>




  </div>)
}
export default App;