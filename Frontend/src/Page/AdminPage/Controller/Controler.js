import React, { useState, useEffect } from "react";
// import L from "leaflet";
import { GoogleMap, Marker, useLoadScript, Polyline, DirectionsRenderer} from '@react-google-maps/api';
import './Controller.css';
import markerIcon from "../../../resource/images/carTop.png"
function Controller({socket}) {
    // Rover state management
    const [speed, setSpeed] = useState(50);
    const [feed, setFeed] = useState('#');
    const [coor, setCoor] = useState({lat:null, lon: null});
    const [angle, setAngle] = useState(0);
    const [map, setMap] = useState();
    let newDirection = {};
    // const [direction, setDirection] = useState("Stopped");
    // const [battery, setBattery] = useState(85);
    const [markers, setMarkers] = useState([]);
    const [distance, setDistance] = useState(0);
    const [directionsResponse, setDirectionsResponse] = useState(null);
    // const [setCustLat, getCustLat] = useState("");
    // const [setCustLan, getCustLan] = useState("");
    // Speed slider change handler
    // useEffect(() => {
    //         // setHeading(degree);
    //         // console.log(degree);
    //     }, [lat, lon]);
    // const markerIcon1 = "https://maps.google.com/mapfiles/kml/shapes/arrow.png"; 
    const customSVGIcon = {
        path: "M0,-48 L12,-24 L0,-32 L-12,-24 Z", // Example path
        fillColor: "red",
        fillOpacity: 1,
        scale: 1,
        strokeColor: "black",
        strokeWeight: 1,
        rotation: angle,
    };

    socket.onmessage = function(event) {
        const obj = JSON.parse(event.data);  
        // console.log(atob(obj.LiveCam));
        // console.log({lat:obj.Lat, lng:obj.Lon})
        markers[0] = {lat:obj.Lat, lng:obj.Lon};
        setCoor({lat:obj.Lat, lng:obj.Lon});
        setAngle(obj.AngN);
        // setLat(obj.Lat);
        // setLon(obj.Lon);
        const byteArray = new Uint8Array([...atob(obj.LiveCam)].map(char => char.charCodeAt(0)));
        // const utf8String = new TextDecoder('utf-8').decode(byteArray);
        // const imgBlob = new Blob([event.data], { type: 'image/jpeg' });  
        // console.log(imgBlob);lng:
        const imgBlob = new Blob([byteArray]);
        setFeed(URL.createObjectURL(imgBlob));

        // console.log(angle);
        // setFeed()
        // const buffer = Buffer.from(event.data.buffer); 
        // const parser = new Parser();
        // console.log(byteArray);    
    };

    const handleSpeedChange = (event) => {
        setSpeed(event.target.value);
    };

    const onMapClick = (e) => {
  
        setMarkers((current) => [
          ...current,
          {
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
          }
        ]);
        
        // if (markers.length > 0){
        //  setDistance( haversine_distance(markers[markers.length-1], markers[markers.length]));
        // }
      };
    
      const center = {
        lat: 23.1287,
        lng: 72.5454,
    };

    function haversine_distance(mk1, mk2) {
        var R = 3958.8; // Radius of the Earth in miles
        var rlat1 = mk1.lat * (Math.PI/180); // Convert degrees to radians
        var rlat2 = mk2.lat * (Math.PI/180); // Convert degrees to radians
        var difflat = rlat2-rlat1; // Radian difference (latitudes)
        var difflon = (mk2.lng-mk1.lng) * (Math.PI/180); // Radian difference (longitudes)
    
        var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
        return d*1609.34;
    } 

    const {isLoaded, loadError} = useLoadScript({
          googleMapsApiKey: "AIzaSyAb10_yd_dXc7hcMWSTEFXvohFNM9qvT-M" 
        });


    // Directional button click handler
    const handleDirectionChange = (newDirection) => {
        // setDirection(newDirection);
        console.log("");
    };
    
    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
      mapRef.current = map;
    //   setMap(map);
    }, []);

    // function reSetCenter(){
    //     map.setCenter(coor);
    // }

    function getDistance(){

        console.log(markers.length);
        if (markers.length > 1){
         setDistance( distance + haversine_distance(markers[markers.length-2], markers[markers.length-1]));
         console.log(markers);   
         //  newDirection["next"] = [markers[1].lat,markers[1].lng];
        //  socket.send(JSON.stringify(newDirection));
        }

      }
    // handeleClick = () => {
    //     // setMarkers[0] = { getCustLat, getCustLan};
    //     // setMarkers[0] = { document.getElementById("Lat").value, document.getElementById("Lng")}
    // }

    function runRover(){
        if (markers.length > 1){
            newDirection["next"] = [markers[1].lat,markers[1].lng];
            newDirection["direction"] = "8";
            newDirection["control"] = "A";
            socket.send(JSON.stringify(newDirection));
        }
        // newDirection["direction"] = "8";
        // // console.log(newDirection.direction);
        // socket.send(JSON.stringify(newDirection))
    }  
    function manualRun(){
        socket.send("M");
    }
    // const handleInputChange = (event) => {
    //     event.target.id
    //     setCustLan(event.target.value);
    //   };
    // Key control handler
    useEffect(() => {
        const handleKeyPress = (event) => {

            let Direction = null;
            
            switch (event.key.toLowerCase()) {
                // case "arrowup":
                case "8":
                    Direction = "8";
                    // console.log("8");
                    break;
                // case "arrowdown":
                case "2":
                    Direction = "2";
                    break;
                // case "arrowleft":
                case "5":
                    Direction = "5";
                    break;
                case "6":
                    Direction = "6";
                    break;
                // case "arrowright":
                case "4":
                    Direction = "4";
                    break;
                case "9":
                    Direction = "9";
                    break;
                case "7":
                        Direction = "7";
                        break;
                case " ":
                    Direction = "5";
                    break;

                default:
                    return;
            }
            // setDirection(newDirection);
            newDirection["next"] = null;
            newDirection["direction"] = Direction;
            console.log(newDirection.direction);
            socket.send(JSON.stringify(newDirection));
        };

        window.addEventListener("keydown", handleKeyPress);
        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, []);
    if(loadError) return "Error";
    if (!isLoaded) return "Maps";    
    return (
        <div className="App">
            {/* <header className="navbar">
                <h1>Rover Controller</h1>
                <button className="emergency-stop" onClick={handleEmergencyStop}>Emergency Stop</button>
            </header> */}

            <div className="mainContainer">
                <div className="control-panel">
                    <h2>Control Panel</h2>
                    <div className="direction-buttons">
                        {/* <button className="control-btn" onClick={() => handleDirectionChange("Move Forward")}>↑</button> */}
                        <div className="middle-row">
                            <button className="control-btn" onClick={() => handleDirectionChange("Forward Left")}>&#8598;</button>
                            <button className="control-btn" onClick={() => handleDirectionChange("Move Forward")}>↑</button>
                            <button className="control-btn" onClick={() => handleDirectionChange("Forward Right")}>&#8599;</button>
                        </div>
                        <div className="middle-row">
                            <button className="control-btn" onClick={() => handleDirectionChange("Turn Left")}>←</button>
                            <button className="control-btn" onClick={() => handleDirectionChange("Stop")}>Stop</button>
                            <button className="control-btn" onClick={() => handleDirectionChange("Turn Right")}>→</button>
                        </div>
                        <div className="middle-row">
                            <button className="control-btn" onClick={() => handleDirectionChange("Turn Left")}>&#8601;</button>
                            <button className="control-btn" onClick={() => handleDirectionChange("Move Forward")}>↓</button>
                            <button className="control-btn" onClick={() => handleDirectionChange("Turn Right")}>&#8600;</button>
                        </div>
                        {/* <button className="control-btn" onClick={() => handleDirectionChange("Move Backward")}>↓</button> */}
                    </div>

                    <div className="speed-control">
                        {/* <label htmlFor="speed">Speed: <span id="speed-display">{speed}</span></label>
                        <input
                            type="range"
                            id="speed"
                            min="0"
                            max="100"
                            value={speed}
                            onChange={handleSpeedChange}
                        /> */}
                        <button>Manual</button>
                    </div>
                </div>
                
                {/* 
                <div className="telemetry-dashboard">
                    <h2>Telemetry</h2>
                    <p>Speed: <span id="speed-telemetry">{speed}</span></p>
                    <p>Direction: <span id="direction">{direction}</span></p>
                    <p>Battery: <span id="battery">{battery}%</span></p>
                </div> */}

                <div className="video-feed">
                    <div className="map-container">
                    <h2>Video Feed</h2>
                        
                        <img src={feed}></img>
                    </div>
                </div>

                <div className="video-feed">
                    
                    <div className="map-container">
                        <h2>Rover Location</h2>
                        <GoogleMap
                        mapContainerStyle={{
                                height: "65vh",
                            }}
                            zoom={22}
                            center={coor}
                            onLoad={onMapLoad}
                            onClick={onMapClick}
                        
                        >

                        <Polyline
                            path={markers.map((location) => ({
                                lat: location.lat,
                                lng: location.lng,
                            }))}
                        />  

                            {markers.map((marker) => (
                                <Marker 
                                position={{ 
                                    lat: marker.lat,
                                    lng: marker.lng 
                                }} 
                                onLoad={getDistance}
                                />

                            ))}

                            {directionsResponse && (
                            <DirectionsRenderer directions={directionsResponse} />
                            )}

                            <Marker
                                  position={coor}
                                  draggable={true}
                                  icon={customSVGIcon}
                                //   position_changed={reSetCenter} 
                                //   onLoad={reSetCenter}
                            />
                        </GoogleMap>
                        
                        <div className="MapDiv">
                            <button onClick={runRover}>Run Rover</button>
                            {/* <input placeholder="Lat" id="setLat" type="text" ></input>
                            <input placeholder="lng" id="setLng" text="text" ></input>
                            <button onClick={addMarker}>Set Pointer</button> */}
                        </div>
  
                    </div>
                </div>
            </div>

            {/* 
            <footer>
                <p>&copy; 2025 Rover Corporation</p>
            </footer> */}
        </div>
    );
}

export default Controller;
