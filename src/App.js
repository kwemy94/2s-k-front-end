import './App.css';
import { BrowserRouter as Router, Navigate } from 'react-router-dom'
import AppRouter from './components/router/AppRouter';

function App() {

  
  return (
    <div className="App">
      
      <Router>
        <AppRouter />
      </Router>
    </div>
  );
}

export default App;
