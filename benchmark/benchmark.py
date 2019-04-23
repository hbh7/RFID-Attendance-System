import sys
import time
import random
from socketIO_client_nexus import SocketIO
from socketIO_client_nexus.exceptions import ConnectionError
import urllib3
urllib3.disable_warnings()
import ssl
ssl.match_hostname = lambda cert, hostname: True
import threading

# Array of IDs to transmit
queue = []

def on_disconnect():
    print('Disconnected')

def on_response(*args):
    print('Received response: ' + str(args[0]) + ", removing...")
    print("Old Queue: " + str(queue))
    queue.remove(args[0])
    print("New Queue: " + str(queue))

def transmit():
    while True: 
        time.sleep(1)
        # If there's something to transmit, make a connection and sent it out
        if(len(queue) > 0):

            # Attempt to connect, transmit all in queue if success
            print("Attempting connection...")
            try:
                sio = SocketIO(sys.argv[1], verify=False, wait_for_connection=False,
                               cert=('client.crt', 'client.key'))
                sio.wait(seconds=1)

                print("Connected")

                #sio.on('disconnect', on_disconnect)
                sio.on('response', on_response)

                queue2 = queue[:] # Copy the list to resolve a bug in how the for loop works

                for id in queue2:
                    print("Transmitting " + str(id))
                    sio.emit('attend', {'ID': id})
                    sio.wait(seconds=1)

                #sio.disconnect()

            except ConnectionError:
                print('Server unreachable. Retrying shortly')
    

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Invalid argument count!")
        print("Execute as python3 script.py [Server Address, Ex: https://localhost:3000]")
        exit(1)


    threading.Thread(target=transmit).start()

    while True:
    
       
        # Generate x number of IDs
        for x in range(1,10):
            queue.append(random.randint(100000000,999999999))

        print("Queue: " + str(queue))


        time.sleep(1)
