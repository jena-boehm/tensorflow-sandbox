import React, {useRef} from 'react'
import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';
import Webcam from 'react-webcam';
import { drawHand } from './utils';

export default function Handpose() {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);

    //load handpose model
    const runHandpose = async() => {
        const net = await handpose.load()
        console.log('Handpose loaded');

        //loop and detect hands
        setInterval(() => {
            detect(net)
          }, 100)
        
    }

    //detect function
    const detect = async(net) => {
        //check data is available
        if(typeof webcamRef.current !== 'undefined' &&
        webcamRef.current !== null &&
        webcamRef.current.video.readyState === 4) {
        
        //get video properties
        const video = webcamRef.current.video;
        const videoWidth = webcamRef.current.video.videoWidth;
        const videoHeight = webcamRef.current.video.videoHeight;

        //set video height and width
        webcamRef.current.video.width = videoWidth;
        webcamRef.current.video.height = videoHeight;

        //set canvas height and width
        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;

        //make detections
        const hand = await net.estimateHands(video); 
        console.log(hand);  

        //draw mesh
        const ctx = canvasRef.current.getContext('2d');
        drawHand(hand, ctx)
    }
}

    runHandpose();

    return (
        <div>
        <Webcam
            ref={webcamRef}
            style={{
            //should be refactored into css file
            position: 'absolute',
            marginLeft:'auto',
            marginRight: 'auto',
            left: 0,
            right: 0,
            textAlign: 'center',
            zIndex: 9,
            width: 640,
            height: 480
            }}
        />
        <canvas
            ref={canvasRef}
            style={{
            //same, refactor into css file
            position: 'absolute',
            marginLeft: 'auto',
            marginRight: 'auto',
            left: 0,
            right: 0,
            textAlign: 'center',
            zIndex: 9,
            width: 640,
            height: 480
            }}
        />
        </div>
    )
}
