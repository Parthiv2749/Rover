
import socket, cv2, pickle
import cv2
import json

server_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
server_ip = '192.168.85.54' # server IP
print('Server IP:',server_ip)
port = 9999

socket_address = (server_ip,port)
server_socket.settimeout(0.02)

def start_video_stream():

	
	camera = True
	if camera == True:
		vid = cv2.VideoCapture(0)
	
	else:
		vid = cv2.VideoCapture('videos/boat.mp4')
  

	print('CLIENT {} CONNECTED!'.format(server_ip))
	buffer =None
	newLat = 23.1287
	newLon = 72.5454

	while True:
	
		
		if (vid.isOpened()):
    
				img,frame = vid.read()
				# frame = cv2.flip(frame, 0)
				# cv2.imshow('my pic', frame)
				ret, buffer = cv2.imencode(".jpg", frame, [int(cv2.IMWRITE_JPEG_QUALITY),30])
				# print(buffer)
		
  		
		dictToJson = {
					"LiveCam"	: buffer,
					"Tem"	  	: "0.0",
					"AngX"	  	: 90,
					"AngY"	  	: 150,
					"AngN"		: 15,
					"Acc"	  	: "0.0",
					"Lat"		: newLat,
					"Lon"		: newLon}
		

		a = pickle.dumps(dictToJson)
				# print(a)
		server_socket.sendto(a, socket_address)
			    
		try:
			data, addr = server_socket.recvfrom(10000)
			print(data)
		except socket.timeout:
					""
      
		if cv2.waitKey(10) == 13: 
			server_socket.close()
			break
		

while True:
	start_video_stream()


