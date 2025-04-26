import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import Nav from './Components/Navbar/Nav';
import Homepage from './Page/Home/Homepage';
import Login from './Page/Login/Login';
import LiveFeed from './Page/LiveFeed/LiveFeed';
import MyMapComponent from './Page/AdminPage/Map/Map';
import Controller from './Page/AdminPage/Controller/Controler';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));

const socket = new WebSocket('ws://192.168.248.54:10050');  
var LiveVideo;

socket.onopen = function(event) {  
    console.log('Connected to the WebSocket server.');  
}; 

socket.onerror = function(error) {  
    console.error('WebSocket Error:', error);  
};  

socket.onclose = function(event) {  
    console.log('Disconnected from the WebSocket server.');  
};  
// socket.onmessage = function(event) {
//   const obj = JSON.parse(event.data);  

//   const byteArray = new Uint8Array([...atob(obj.LiveCam)].map(char => char.charCodeAt(0)));
//   const imgBlob = new Blob([byteArray]);
//   LiveVideo = URL.createObjectURL(imgBlob);

// };
root.render(
  <React.StrictMode>
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Nav/>}>
          <Route index element={<Homepage/>}></Route>
          <Route path='Login' element={<Login/>}></Route>
          <Route path='LiveFeed' element={<LiveFeed socket={socket}/>}></Route>
          <Route path='GPS_Rover' element={<Controller socket={socket}/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
    {/* <Nav/>
    <Homepage/> */}
  </React.StrictMode>
);

reportWebVitals();
