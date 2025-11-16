import React from 'react'

const App = () => {

  const funct =(val)=>{
    console.log(val)
  }

  const fun=(elem)=>{
    if(elem>0){
      console.log('positive scrolling',elem)

    }
    else{
      console.log('negative scrolling',elem)

    }
        
      }

  return (
    <div onWheel={(elem)=>{
      fun(elem.deltaY)
    }}>
      {/* <input type="text" placeholder='write here' onChange={function(elem){
        funct(elem.target.value)

      }} /> */}

      {/* <div onMouseMove={function(elem){
        console.log(elem.clientX)
      }}
      className='box'style={{color:'red', backgroundColor:"blue"}}>ammar</div> */}

      


      <div className="page1"></div>
      <div className="page2"></div>
      <div className="page3"></div>
    </div>
  )
}

export default App