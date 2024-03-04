from dotenv import load_dotenv
import socket 
from confluent_kafka import Consumer, KafkaError
from pymongo import MongoClient
import json
import os

load_dotenv()
 
# Creating socket connection [default parameters are TCP and IPV4(If needed we can change it)]
producer_socket = socket.socket()
HOST = os.getenv("HOST")


#DATABASE CONNECTIVITY
db_connection = MongoClient(os.getenv("MONGO_URL"))
db = db_connection[os.getenv("DATABASE")]
db_col = db[os.getenv("COLLECTION")]


#CREATING CONSUMER 
# group.id is some groupid
# bootstrap.servers is kafka server
# auto.offset.reset: latest will fetch latest data

config = { 'group.id': 'group_id', 'bootstrap.servers' : os.getenv("BOOTSTRAP_SERVERS"), 'auto.offset.reset': 'latest' }
consumer = Consumer(config)

#SUBSCRIBING TO THE TOPIC
TOPIC = os.getenv("TOPIC_NAME")
consumer.subscribe([TOPIC])

try:
    while True:
        msg = consumer.poll(1.0)

        if msg is None:
            continue
        if msg.error():
            if msg.error().code() == KafkaError._PARTITION_EOF:
                continue
            else:
                print(f'Error while consuming: {msg.error()}')
        
        data = msg.value().decode('utf-8')
        # print("data",data)

        try:
            #CONVERTING JSON STRING TO THE DICTIONARY
            col_doc = json.loads(data)        
            print("data",col_doc)
            # db_col.insert_one(col_doc)
         
            #INSERTING DATA ONLY IF IT IS DICTIONARY
            if isinstance(col_doc,dict):
                db_col.insert_one(col_doc)
            else:
                continue

        except Exception as e:
            # print("json decode error ",e)
            continue


    
except KeyboardInterrupt:
    pass
finally:
    # Close the consumer gracefully
    consumer.close()