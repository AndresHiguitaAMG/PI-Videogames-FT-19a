import './App.css';
import {
  BrowserRouter as Router,
  // Switch,
  Route,
} from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage'
import Home from './components/Home/Home';


function App() {
  return (
    <Router>
      <div className="App">
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/home" component={Home} />
      </div>
    </Router>
  );
}

export default App;
