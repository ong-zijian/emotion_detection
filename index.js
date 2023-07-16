window.addEventListener('DOMContentLoaded', function () {
    var videoElement = document.getElementById('videoElement');
    var canvasElement = document.getElementById('canvasElement');
    var context = canvasElement.getContext('2d');
    // Ensure that the canvas context is available before proceeding
    if (context) {
        // Function to draw the video frames on the canvas
        function drawFrame() {
            // Draw the video frame on the canvas
            context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
            // Call the Flask service route to process the frame
            fetch('http://localhost:5000/video_feed') // Replace with the correct Flask service URL
                .then(function (response) { return response.blob(); })
                .then(function (blob) {
                // Convert the blob response to an image element
                var imgElement = document.createElement('img');
                imgElement.src = URL.createObjectURL(blob);
                // Display the processed image on the webpage
                document.body.appendChild(imgElement);
            });
            // Repeat the process for the next frame
            requestAnimationFrame(drawFrame);
        }
        // Start video stream and initialize the canvas size
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
            videoElement.srcObject = stream;
            videoElement.play();
            canvasElement.width = videoElement.videoWidth;
            canvasElement.height = videoElement.videoHeight;
            drawFrame();
        })
            .catch(function (error) { return console.error(error); });
    }
    else {
        console.error('Unable to obtain 2D rendering context for the canvas element.');
    }
});
