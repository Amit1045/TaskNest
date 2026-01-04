import {  Routes, Route } from 'react-router-dom';
import './App.css'
import Navbar from '../Components/Navbar';
import Dashboard from '../Components/Dashboard';
import ProfilePage from '../Components/ProfilePage';
import CreateNote from '../Components/CreateNote';
import SettingsPage from '../Components/SetttingPage';
import DetailedCard from '../Components/DetailedCard';
import SignupPage from '../Authpages/Signup';
import LoginPage from '../Authpages/Login';
function App() {

  return (
 <div>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Dashboard/>} />
      <Route path='/profile' element={<ProfilePage/>} />
      <Route path='/create_note' element={<CreateNote/>} />
      <Route path='/setting' element={<SettingsPage/>} />
      <Route path='/card' element={<DetailedCard/>} />
      <Route path='/signup' element={<SignupPage/>} />
      <Route path='/login' element={<LoginPage/>} />
    </Routes>
    </div>
  )
}

export default App
