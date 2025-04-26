# YOLOv8 Real-time Object Detection with Webcam Feed
import cv2
from ultralytics import YOLO

# Load the YOLOv8 model (adjust the path if you're using a custom model)
# model = YOLO(r"D:\Collage\Projects\Robofest4.0\ModelTest\runs\detect\train4\weights\best.pt")  # You can replace 'yolov8n.pt' with 'yolov8s.pt', 'yolov8m.pt', etc.
model = YOLO("best.pt")  # You can replace 'yolov8n.pt' with 'yolov8s.pt', 'yolov8m.pt', etc.

# Open the webcam
cap = cv2.VideoCapture(0)  # Use 0 for default webcam, or specify another index for external cameras

if not cap.isOpened():
    print("Error: Could not open webcam.")
    exit()

while True:
    ret, frame = cap.read()
    if not ret:
        print("Error: Failed to capture frame.")
        break

    # Run YOLOv8 inference on the frame
    results = model(frame)

    # Annotate the frame with bounding boxes and labels
    # print(results)
    annotated_frame = results[0].plot()

    # Display the annotated frame
    cv2.imshow('YOLOv8 Live Feed', annotated_frame)

    # Exit on pressing 'q'
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the webcam and close all OpenCV windows
cap.release()
cv2.destroyAllWindows()
