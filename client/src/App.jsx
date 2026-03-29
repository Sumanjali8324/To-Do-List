import React, { useState } from 'react'
import { useEffect } from 'react'

const App = () => {
  const [val, setval] = useState("")
  const [task, settask] = useState([])
  const [editId, setEditId] = useState(null);
  const handleChanges = () => {
    fetch("http://localhost:3000/task",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({task:val})
    })
      .then(res=>res.json())
      .then(data=>{
        console.log(data)
        //settask(data)
         fetchTask()
         setval("")
      })
      .catch(err=>console.log(err)) 
  }
  const updateTask=()=>{
    fetch(`http://localhost:3000/task/${editId}`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({task:val})
    })
      .then(res=>res.json())
      .then(()=>{
        fetchTask()
        setval("")
        setEditId(null)
      })
      .catch(err=>console.log(err))
  }
  const taskDelete=(id)=>{
    fetch(`http://localhost:3000/task/${id}`,{
      method:"DELETE"
    })
     .then(res=>res.json())
     .then(()=>{
      fetchTask()
     })
      .catch(err=>console.log(err))
  }
  const fetchTask=()=>{
    fetch("http://localhost:3000/task") 
      .then(res=>res.json())
      .then(data=>{ 
        console.log(data) 
        settask(data) 
      }) 
      .catch(err=>console.log(err))
  }
  useEffect(()=>{
    fetchTask()
  },[])
  return (
    <div className='min-h-screen bg-gray-900 flex items-center justify-center'>
      
      <div className='bg-gray-800 p-6 rounded-xl shadow-lg w-[400px]'>
        
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-xl font-bold text-white'>To Do List</h1>
          <button className='bg-blue-600 px-3 py-1 rounded text-sm hover:bg-blue-700'>
            Export
          </button>
        </div>

        <div className='flex gap-2 mb-4'>
          <input 
            type="text"
            value={val}
            onChange={(e) => setval(e.target.value)}
            placeholder='Enter task...'
            className='flex-1 px-3 py-2 rounded bg-gray-700 text-white outline-none'
          />
          {/* <button 
            onClick={handleChanges}
            className='bg-green-600 px-4 rounded hover:bg-green-700'
          >
            Add
          </button> */}
          <button
          className='bg-green-600 px-4 rounded hover:bg-green-700' 
          onClick={editId ? updateTask : handleChanges}>
            {editId ? "Update" : "Add"}
          </button>
        </div>
        <div className='space-y-2'>
          {
            task.map((t) => (
              <div 
                key={t._id}
                className='flex justify-between items-center bg-gray-700 px-3 py-2 rounded'
              >
                <p>{t.task}</p>
                <div className='flex gap-2'>
                  <button className='text-yellow-400 hover:text-yellow-300'
                     onClick={()=>{
                      setval(t.task)
                      setEditId(t._id)
                     }}
                  >
                     Edit
                  </button>
                  <button 
                    onClick={()=>{taskDelete(t._id)}}
                    className='text-red-400 hover:text-red-300'
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          }
        </div>

      </div>
    </div>
  )
}

export default App