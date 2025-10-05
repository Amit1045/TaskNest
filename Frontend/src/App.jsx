import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Navbar from '../Components/Navbar';
import Dashboard from '../Components/Dashboard';

function App() {

  return (
 <div>
    <Navbar/>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Dashboard/>} />
    </Routes>
   </BrowserRouter>
    </div>
  )
}

export default App
