import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Navbar from '../Components/Navbar';
import Dashboard from '../Components/Dashboard';
import ProfilePage from '../Components/ProfilePage';
import CreateNote from '../Components/CreateNote';
import SettingsPage from '../Components/SetttingPage';

function App() {

  return (
 <div>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Dashboard/>} />
      <Route path='/profile' element={<ProfilePage/>} />
      <Route path='/create_note' element={<CreateNote/>} />
      <Route path='/setting' element={<SettingsPage/>} />
    </Routes>
    </div>
  )
}

export default App
