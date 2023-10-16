import { useState , useCallback, useEffect, useRef} from 'react'

import './App.css'

function App() {
  const [length, seLength] = useState(8);
  const [numberAllowed , setNumberAllowed] = useState(false);
  const [charAllowed , setCharAllowed] = useState(false);
  const [Password , setPassword] = useState("")
  //useRef hook
  const passwordRef = useRef(null)
  const passwordGenrator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghigklmnopqrstuvwxyz"
    if(numberAllowed){
      str += "0123456789"
    }
    if(charAllowed){
      str += "!@#$%^&*?"
    }
    for (let i= 1; i< length; i++) {
      let char = Math.floor(Math.random()*str.length +1)
      pass += str.charAt(char)

    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() =>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(Password)
    
  },[Password])

  useEffect(()=>{
    passwordGenrator()
    
  },[length,numberAllowed,charAllowed, passwordGenrator])

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
      <h1 className='text-white text-center my-3'>Password genrator</h1>
     <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      <input type="text"
      value={Password}
      placeholder='password'
      className='outline-none w-full py-1 px-3'
      ref={passwordRef}
      readOnly />
      <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyPasswordToClipboard}>Copy</button>
       
     </div> 
     <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input type="range"
        min={6}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e)=>{seLength(e.target.value)}} />
        <label >length: {length}</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input type="checkbox"
        defaultChecked = {numberAllowed}
        id='numberInput'
        onChange={()=>{setNumberAllowed((prev)=> !prev);
        }} />
        <label htmlFor="numberInput">Numbers</label>

      </div>
      <div className='flex items-center gap-x-1'>
        <input type="checkbox"
        defaultChecked = {charAllowed}
        id='charInput'
        onChange={()=>{setCharAllowed((prev)=> !prev);
        }} />
        <label htmlFor="charInput">Characters</label>

      </div>

      </div>
    </div>
    </>
  )
}

export default App
