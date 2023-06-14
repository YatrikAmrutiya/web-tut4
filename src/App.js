import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import UsersList from './pages/UsersList';
import UserDetails from './pages/UserDetails';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/users" element={<UsersList />} /> 
          <Route path="/profile/:_id" element={<UserDetails />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
