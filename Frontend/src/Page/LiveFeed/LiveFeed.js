import './LiveFeed.css';
import Video from './Video/VideoFeed';

import { useState } from 'react';

import Gyroscope  from './Gyroscope/Gyrosope';
import Compass from './Compass/compass';


function LiveFeed({socket}){
    const [feed, setFeed] = useState('#');
    const [GyroX, setGyroX] = useState(0);
    const [GyroY, setGyroY] = useState(0);
    const [angle, setAngle] = useState(0);
    socket.onmessage = function(event) {
        const obj = JSON.parse(event.data);  
        // console.log(atob(obj.LiveCam));
        const byteArray = new Uint8Array([...atob(obj.LiveCam)].map(char => char.charCodeAt(0)));
        // const utf8String = new TextDecoder('utf-8').decode(byteArray);
        // const imgBlob = new Blob([event.data], { type: 'image/jpeg' });  
        // console.log(imgBlob);
        const imgBlob = new Blob([byteArray]);
        setFeed(URL.createObjectURL(imgBlob));
        setGyroX(obj.AngX);
        setGyroY(obj.AngY);
        setAngle(obj.AngN);
        // console.log(angle);
        // setFeed()
        // const buffer = Buffer.from(event.data.buffer); 
        // const parser = new Parser();
        // console.log(byteArray);    
    };

    return(
    <div className="Sensor">

        <div className="cardHolder">
            
            
            {/* <div className="Gyro card">
                <Gyroscope x={GyroX} y={GyroY}/>
            </div>
            <div className="Compus card">
                <Compass degree={angle}/>
            </div>
             */}
            {/* <div class="OBJDetection card">
                <embed src="./Gyroscope/Gyroscope.html" type="">
            </div>  */}

            <div className="Live card">
                <Video Livefeed={feed}/>
            </div>
        
        </div>
    </div>
    );
}

export default LiveFeed;