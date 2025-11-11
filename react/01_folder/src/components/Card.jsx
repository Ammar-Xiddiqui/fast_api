import React from 'react'

const Card = (props) => {
  return (
    <div className="Card">
        <img src={props.image} alt="no picture" />

    <h1>I am {props.name} and my age is {props.age}</h1>
    <p>My moto is {props.moto}</p>
    
    <button>view me </button>
  </div>
  )
}

export default Card