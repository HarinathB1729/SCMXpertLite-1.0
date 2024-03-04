import socket
import os
import json
import time
import random
from dotenv import load_dotenv
from datetime import date

load_dotenv()

PORT = int(os.getenv('PORT'))
# print(PORT)
SERVER = socket.gethostbyname(socket.gethostname())
print(SERVER)


server = socket.socket()
print("socket created")
server.bind(("", PORT))
# server.bind((SERVER, PORT))
# bind this socket to the address we configured earlier
server.listen(2)
print(f"[LISTENING] Server is listening on {SERVER}")

# ACCEPTING CLIENT CONNECTION
client_conn, client_addr = server.accept()
print(f'CONNECTION FROM {client_addr} HAS BEEN ESTABLISHED')


connected = True
while connected:
    try:
        for i in range(0, 5):
            route = ['Newyork,USA', 'Dubai, UAE',
                     'Tirupati, India', 'London,UK']
            routefrom = random.choice(route)
            routeto = random.choice(route)
            if (routefrom != routeto):
                # CREATING DUMMY DATA
                data = {
                    "batterylevel": round(random.uniform(2.00, 5.00), 2),
                    "deviceid": random.choice([987654321, 123456789, 567891234]),
                    "firstsensortemp": round(random.uniform(10, 40.0), 1),
                    "routefrom": routefrom,
                    "routeto": routeto,
                    "timestamp": str(date.today())
                }

                userdata = (json.dumps(data, default='str',
                            indent=1)).encode('utf-8')
                print(userdata)
                client_conn.send(userdata)
                time.sleep(10)
            else:
                continue

        # clientdata = client_conn.recv(1024).decode('utf-8')
        # print("ACKNOWLEDGEMENT RECEIVED FROM CLIENT : " +clientdata)

    except IOError as e:
        print(e)
        continue

client_conn.close()  # close the connection
