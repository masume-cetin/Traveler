import logo from './logo.svg';
import './App.css';
import sketch from './sketch';
import { ReactP5Wrapper } from 'react-p5-wrapper';
import Header from './Components/Header';
import Location from './Components/Location';
import Profile from './Components/Profile';
import Login from './Components/Login/Login.js';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import ProfileFeed from './Components/Profile/ProfileFeed.jsx';
import Register from './Components/Register';
import Feed from './Components/MainFeedPage/Feed'
import { RouterRounded } from '@material-ui/icons';

function App() {


  return (
    <Router>
      <div className="App">
    <Header/>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/Register" element={<Register/>}/>
    <Route path="/Profile" element={<ProfileFeed/>}/>
    <Route path="/location" element={<Location/>}></Route>
    <Route path="/MainFeedPage" element={<Feed/>}></Route>
    </Routes>
    </div>
      </Router>
      //<header className="App-header">
      //<ReactP5Wrapper sketch={sketch}/>
      //</header>
  );
}

export default App;
