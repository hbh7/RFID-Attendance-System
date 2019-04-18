import RPi.GPIO as GPIO
import sys
import time
import random
from mfrc522 import SimpleMFRC522
from socketIO_client_nexus import SocketIO
from socketIO_client_nexus.exceptions import ConnectionError
import urllib3
urllib3.disable_warnings()
import ssl
ssl.match_hostname = lambda cert, hostname: True

# Array of IDs to transmit
queue = []

# Uses library to read from the RFID tag
def read():
    reader = SimpleMFRC522()
    try:
        id, text = reader.read()
        print(id)
        return id
    finally:
        GPIO.cleanup()

def on_disconnect():
    print('Disconnected')

def on_response(*args):
    print('Received response: ' + str(args[0]) + ", removing...")
    print("Old Queue: " + str(queue))
    queue.remove(args[0])
    print("New Queue: " + str(queue))

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Invalid argument count!")
        print("Execute as python3 script.py [Server Address, Ex: https://localhost:3000]")
        exit(1)

    #idCount = 0 # For development use

    while True:

        print("")

        # Read from scanner
        id = read() # Comment out for development use

        # For development use
        #if idCount < 3:
        #    id = random.randint(10000, 99999)
        #else:
        #    id = ""

        #if idCount > 10:
        #    exit()
        #time.sleep(1)

        #idCount = idCount + 1 # For development use

        # If we got an ID, add it to the queue to transmit if its not already there
        if id != "":
            print("Got ID: " + str(id))
            if id not in queue:
                queue.append(id)
            time.sleep(1)

        print("Queue: " + str(queue))

        # If there's something to transmit, make a connection and sent it out
        if(len(queue) > 0):

            # Attempt to connect, transmit all in queue if success
            print("Attempting connection...")
            try:
                sio = SocketIO(sys.argv[1], verify=False, wait_for_connection=False,
                               cert=('client.crt', 'client.key'))
                sio.wait(seconds=1)

                print("Connected")

                sio.on('disconnect', on_disconnect)
                sio.on('response', on_response)

                queue2 = queue[:] # Copy the list to resolve a bug in how the for loop works

                for id in queue2:
                    print("Transmitting " + str(id))
                    sio.emit('attend', {'ID': id})
                    sio.wait(seconds=1)

                sio.disconnect()

            except ConnectionError:
                print('Server unreachable. Retrying shortly')


