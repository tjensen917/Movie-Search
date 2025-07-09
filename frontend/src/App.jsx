import './css/App.css';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import {Routes, Route} from "react-router-dom"
import NavBar from './components/NavBar';
import { MovieProvider } from './context/MovieContext';

function App() {
  // can only return one parent if you want multiple, use fragment <> </>
  return (
    <MovieProvider>
      <NavBar />
      <main className='main-content'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />        
        </Routes>
      </main>
    </MovieProvider>
    
  );
}


export default App
