window.addEventListener('DOMContentLoaded', () => {
    const videoElement: HTMLVideoElement = document.getElementById('videoElement') as HTMLVideoElement;
    const canvasElement: HTMLCanvasElement = document.getElementById('canvasElement') as HTMLCanvasElement;
    const context: CanvasRenderingContext2D | null = canvasElement.getContext('2d');
  
    // Ensure that the canvas context is available before proceeding
    if (context) {
      // Function to draw the video frames on the canvas
      function drawFrame() {
        // Draw the video frame on the canvas
        context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
        // Call the Flask service route to process the frame
        fetch('http://localhost:5000/video_feed')  // Replace with the correct Flask service URL
          .then(response => response.blob())
          .then(blob => {
            // Convert the blob response to an image element
            const imgElement = document.createElement('img');
            imgElement.src = URL.createObjectURL(blob);
            // Display the processed image on the webpage
            document.body.appendChild(imgElement);
          });
        // Repeat the process for the next frame
        requestAnimationFrame(drawFrame);
      }
  
      // Start video stream and initialize the canvas size
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          videoElement.srcObject = stream;
          videoElement.play();
          canvasElement.width = videoElement.videoWidth;
          canvasElement.height = videoElement.videoHeight;
          drawFrame();
        })
        .catch(error => console.error(error));
    } else {
      console.error('Unable to obtain 2D rendering context for the canvas element.');
    }
  });
  