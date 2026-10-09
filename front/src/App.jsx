import './App.css'
import Create  from './task/create'
import Index from './task'
import { Route, Routes } from 'react-router-dom'
import { Link } from 'react-router-dom'


function App() {

  return (
    <>
    <nav className='flex justify-center gap-2'>
      <Link to={"/"}>Home</Link> 
      <Link to={"/createTask"}>createTask</Link>
    </nav>
    
    <Routes>
      <Route path='/' element={<Index/>}/>
      <Route path='/createTask' element={<Create/>}/>
    </Routes>
    </>
  )
}

export default App
