import './VideoFeed.css';

import { useState } from 'react';
import { Parser } from 'pickleparser';


function VideoFeed({Livefeed}){


    // console.log(Livefeed);


    return(
        <>
        
        <div id="imageContainer">  
            
            <img id="imageDisplay" src={Livefeed} alt="Received Image"/>  
        </div>  
        </>

    );
}

export default VideoFeed