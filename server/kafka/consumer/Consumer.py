import os
from confluent_kafka import Producer
from dotenv import load_dotenv
import socket
 
load_dotenv()
 
# Creating socket connection [default parameters are TCP and IPV4(If needed we can change it)]
producer_socket = socket.socket()
HOST = os.getenv("HOST")
PORT = int(os.getenv("PORT"))

# Setting connection with producer_socket
producer_socket.connect((HOST,PORT))
print(producer_socket)
 
config = {
    'bootstrap.servers': os.getenv('BOOTSTRAP_SERVERS')
}
 
# Creating Producer instance
producer = Producer(config)
 
while True:
    try:
        data = producer_socket.recv(1024).decode('utf-8')
        print("data",data)
        # print(type(data))
        producer.produce(os.getenv("TOPIC_NAME"), key="SCMXpertLite", value=data)
        producer.flush()        # Wait for any outstanding messages to be delivered and delivery reports received
        # print("message sent to kafka", data)
       
    except socket.timeout:
        print("No data received in the last 10 seconds.")
    except ConnectionResetError:
        print("Connection reseted.")
        break
 
 
# Closing producer_socket
producer_socket.close()