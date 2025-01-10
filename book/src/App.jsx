import { useState, useEffect,} from 'react'
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"; 
import RegisterPanel from './Login-Register/RegisterPanel'
import LoginPanel from './Login-Register/LoginPanel';
import Refresh from './Data/Refresh';
import Content from './Content/Content';
import AddBook from './Data/AddBook';
import SingleProduct from './Content/SingleProduct';
import Rented from './Content/Rented';
import NavBar from './Content/NavBar';
import EditBook from './Data/EditBook';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("AccessToken");
  const refreshToken = localStorage.getItem("RefreshToken");

  useEffect(() => {
    if (!accessToken || !refreshToken) {
      navigate('/Login');
    }
  }, [accessToken, refreshToken, navigate]);

  if (!accessToken || !refreshToken) {
    return null;
  }

  return (
    <>
      <Refresh />
      {children}
    </>
  );
}

function App() {
  const [user, setUser] = useState("");
  const [books, setBooks] = useState([])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterPanel/>} />

        <Route 
          path="/Login" 
          element={<LoginPanel/>} 
        />

        <Route 
          path="/Content" 
          element={
            <ProtectedRoute>
              <NavBar/>
              <Content user={user} books={books} setBooks={setBooks} />
            </ProtectedRoute>
          } 
        />
        
        <Route
          path='/AddBook'
          element={
            <ProtectedRoute>
              <AddBook/>
            </ProtectedRoute>
          }
        />

        <Route
          path='/SingleProduct/:id'
          element={
            <ProtectedRoute>
              <NavBar/>
              <SingleProduct/>y
            </ProtectedRoute>
          }
        />

<Route
          path='/Rented'
          element={
            <ProtectedRoute>
              <NavBar/>
              <Rented/>
            </ProtectedRoute>
          }
        />

<Route
          path='/EditBook/:id'
          element={
            <ProtectedRoute>
              <NavBar/>
              <EditBook/>
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  )
}

export default App