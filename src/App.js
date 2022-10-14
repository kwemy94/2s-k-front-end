import './App.css';
import { BrowserRouter as Router, Navigate } from 'react-router-dom'
import AppRouter from './router/AppRouter';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  
  return (
    <div className="App">
      
      <Router>
        <ToastContainer/>
        <AppRouter />
      </Router>
    </div>
  );
}

export default App;
