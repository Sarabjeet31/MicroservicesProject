import axios from 'axios'
import Signin from './components/Signin';
import Signup from './components/Signup';
import Candidates from './components/Candidates';
import Homepage from './components/Homepage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedLogged from './components/ProtectedLogged';

function App() {
  // axios.defaults.url="http://localhost:3000";
  axios.defaults.withCredentials = true;
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/candidates' element={<ProtectedLogged Component={Candidates}/>} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
