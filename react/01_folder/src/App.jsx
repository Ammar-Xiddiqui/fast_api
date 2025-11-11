import React from "react";
import Card from "./components/Card";
import Navbar from "./components/Navbar";

const App = () => {
  const arr = [
    {
      name: "ammar",

      age: 21,

      moto: "hello bro",

      image:
        "https://images.unsplash.com/photo-1519865885898-a54a6f2c7eea?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3BsYXNofGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
    },

        {
      name: "sammar",

      age: 24,

      moto: "work",

      image:
        "https://images.unsplash.com/photo-1519865885898-a54a6f2c7eea?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3BsYXNofGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
    },
  ];
  return (
    <div className="parent">

      {arr.map(function(elem,idx){

        return <div key={idx}> 
        

        <Card image={elem.image} name={elem.name} age={elem.age} moto={elem.moto}/>  
        
        </div>
      }

      )}




    </div>
  );
};

export default App;
