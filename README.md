# Emotion Detection Project
_This is an adpatation from this repo: https://github.com/dhruvpandey662/Emotion-detection_<br>
_Original video: https://www.youtube.com/watch?v=G1Uhs6NVi-M&ab_channel=edureka%21_

This project aims to look at users facial expression to detect emotions. The model is trained on a large classified image dataset with different expressions. With the trained model, the openCV code would run and overlay the predictions on the screen.

## Models:
sigmoid4.h5: activation function => sigmoid, epoch => 30, steps =>60
softplus1.h5: activation function => softplus, epoch => 30, steps =>30

## To run
1. Clone, extract and note down the directory the file it is in
2. go to terminal and `cd` to the directory of the project
3. run `pip install -r requirements.txt` or `py -m pip install -r requirements.txt`
4. run `py video.py`


