import logo from './logo.svg';
import './App.css';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Navbar from "./components/navbar/Navbar";
import AddHouse from "./components/house/AddHouse";
import Home from "./components/home/Home";
import MyRealEstates from './components/house/MyRealEstates';
import NewHouseNotification from './components/house/NewHouseNotifications';
function App() {
  return (
  <BrowserRouter>
    <Navbar/>
      <div>
        <Routes>
      
        <Route path="/" element={<Home/>} />
        <Route path="/addhouse" element={<AddHouse/>} />
        <Route path="/myrealestates" element={<MyRealEstates/>} />
        <Route path="/success" element={<NewHouseNotification/>} />

      </Routes>
      </div>
    </BrowserRouter>
);
}


export default App;
