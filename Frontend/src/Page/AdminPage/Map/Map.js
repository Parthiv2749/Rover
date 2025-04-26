
import { GoogleMap, Marker, useLoadScript, Polyline, DirectionsRenderer} from '@react-google-maps/api';
import React from 'react';
import { useState } from 'react';
import "./Map.css"
import { Button } from 'react-bootstrap';


const center = {
    lat: 23.1287,
    lng: 72.5454,
};


function currentPosition(socket){
  
}


function MyMapComponent() {
  const [markers, setMarkers] = useState([]);
  const [distance, setDistance] = useState(0);
  const [directionsResponse, setDirectionsResponse] = useState(null);


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
  
  function getDistance(){

    // console.log(markers.length);
    if (markers.length > 1){
     setDistance( distance + haversine_distance(markers[markers.length-2], markers[markers.length-1]));
    }    
  }

  function haversine_distance(mk1, mk2) {
    var R = 3958.8; // Radius of the Earth in miles
    var rlat1 = mk1.lat * (Math.PI/180); // Convert degrees to radians
    var rlat2 = mk2.lat * (Math.PI/180); // Convert degrees to radians
    var difflat = rlat2-rlat1; // Radian difference (latitudes)
    var difflon = (mk2.lng-mk1.lng) * (Math.PI/180); // Radian difference (longitudes)

    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
    return d*1609.34;
  } 

  async function calculateRoute() {
    if (markers.length < 1) {
      return;
    }
    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: markers[0],
      destination: markers[markers.length-1],
      travelMode: window.google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
  }

  const {isLoaded, loadError} = useLoadScript({
      googleMapsApiKey: "AIzaSyAb10_yd_dXc7hcMWSTEFXvohFNM9qvT-M" 
  });

    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
      mapRef.current = map;
    }, []);

    if(loadError) return "Error";
    if (!isLoaded) return "Maps";
    
    return (
      <div className='MapView'>
        <GoogleMap
          mapContainerStyle={{
            height: "65vh",
          }}
          zoom={18}
          center={center}
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

        </GoogleMap>
        <div className='RoverFea'>
          <button className='Run_Rover_Btn'>
            Run Rover
          </button>
          <label>
            Distance:<span className='Diastance' id="totDist">{distance}</span>
          </label>
          <button className='Run_Rover_Btn' onClick={calculateRoute}>
            Get Route
          </button>
        </div>
      </div>
    );

}



export default MyMapComponent;