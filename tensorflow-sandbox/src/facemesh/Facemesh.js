
import React, {useRef} from 'react';
import * as tf from '@tensorflow/tfjs';
import * as facemesh from '@tensorflow-models/facemesh';
import Webcam from 'react-webcam';
import { drawMesh } from './utils';

function Facemesh() {
  //setup references
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  //load facemesh
  const runFacemesh = async() => {

    //load neural network from tfjs
    const net = await facemesh.load({
      inputResolution: {width: 640, height: 480},
      scale: 0.8
    });

    //running detect fn every 100 ms
    setInterval(() => {
      detect(net)
    }, 100)
  };

  //detect function
  const detect = async(net) => {
    if(typeof webcamRef.current !== 'undefined' &&
    webcamRef.current !== null &&
    webcamRef.current.video.readyState === 4) {

      //get video properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      //set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      //set canvas width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      //make detections
      const face = await net.estimateFaces(video);

      //log detections
      console.log(face);

      //get canvas context for drawing
      const ctx = canvasRef.current.getContext('2d');
      drawMesh(face, ctx)
    }
  }

  runFacemesh()

  return (
    <div className="Facemesh">
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
  );
}

export default Facemesh;
