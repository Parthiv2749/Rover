import asyncio  
import cv2  
import websockets  
import numpy as np  
import socket
import pickle
import json
# from texttable import Texttable
import base64

host_ip = "192.168.248.54"
port  = 9999
client_socket = socket.socket(socket.AF_INET,socket.SOCK_DGRAM)
client_socket.bind((host_ip, port))
async def camera_stream(websocket, path):  
    

        while True:  
            frame, addr = client_socket.recvfrom(100000000) 
            # print(frame)
            # frame = packet[0]
            # print(frame)
            data = pickle.loads(frame)
            #print(data)
            # print(data["LiveCam"].shape)
            # x = data["LiveCam"].tobytes()
            try:
             data["LiveCam"] = base64.b64encode(data["LiveCam"].tobytes()).decode('utf-8')
            except AttributeError:
                ""
            # print(end='\n\n')# image = data["LiveCam"]
            
            # table = Texttable()
            # table.add_rows([["Acceleration(X)", "Acceleration(Y)", "Incline(X)", "Incline(Y)", "Temperature", "Humidity" , "Gas"],
            #                 [data["Gyro"][0][0], data["Gyro"][0][1], data["Gyro"][1][0], data["Gyro"][1][1], data["Gyro"][2], data["hum"], "No Harmfull Gass"]])
            # print(table.draw())
            
            # buffer = cv2.imencode('.jpg', frame)[1]
            # print(pickle.loads(frame)["fra"])
            
            # x= json.dumps(pickle.loads(frame))
            await websocket.send(json.dumps(data))
            try:
                toSend = await asyncio.wait_for(websocket.recv(), timeout=0.02)
                print(toSend.encode())
                client_socket.sendto(toSend.encode(), addr)
            except asyncio.TimeoutError:
                ""
            await asyncio.sleep(0.05)  

  
start_server = websockets.serve(camera_stream, "192.168.248.54", 10050)  
# print(await start_server.recv());  
asyncio.get_event_loop().run_until_complete(start_server)  
asyncio.get_event_loop().run_forever()