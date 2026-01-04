import React, { useEffect, useState } from 'react'
import axios from 'axios'


const App = () => {
     const [userData,setUserData] = useState([]);
      const[useIndex,setUseIndex] = useState(2);

    const getData =async()=>{
 
    const response =  await axios.get(`https://picsum.photos/v2/list?page=${useIndex}&limit=30`) 


  setUserData(response.data)
  }

  function prev(){
    setUseIndex(useIndex-1)
    setUserData([]);

  }
  function next(){
    setUseIndex(useIndex+1)
    setUserData([]);  // in next render 
  }

  useEffect(function(){
    getData()
  },[useIndex])

    

    let printUserData = "No User Available"
    if(userData.length>0){
      printUserData = userData.map(function(elem,idx){
        console.log(elem)
        return (
         
        <div key={idx}>
           <a href={elem.url} target='_blank'>
        <div className='h-40 w-44 bg-white rounded-xl overflow-hidden'>
          <img src={elem.download_url} alt='' className='h-full w-full object-cover'/>
        </div>
        </a>
        <h2 className='font-bold text-lg'>{elem.author}</h2>
        </div>
        )
      })
    }
  
  return (
    <div className="bg-black h-screen p-4 text-white overflow-auto">
      
      <div className='flex flex-wrap gap-4'>
        {printUserData}
       

      </div>
       <div className='flex justify-center gap-6 items-center p-4'>
        <button className='bg-amber-400 text-sm cursor-pointer active:scale-95 text-black rounded px-4 py-2 font-semibold' onClick={()=>{
          prev()
          getData()
        }}> Prev
          
        </button >
         <button className='bg-amber-400 text-sm cursor-pointer active:scale-95 text-black rounded px-4 py-2 font-semibold' onClick={()=>{
          next()
          getData()
         }}> Next
          
        </button>
        </div>
    </div>

  )
}

export default App
