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

def on_disconnect():
    print('Disconnected')

def on_response(*args):
    print('Received response: ' + str(args[0]))

    
if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Invalid argument count!")
        print("Execute as python3 script.py [Server Address, Ex: https://localhost:3000]")
        exit(1)


    print("Attempting connection...")
    try:
        sio = SocketIO(sys.argv[1], verify=False, wait_for_connection=False,
                       cert=('client.crt', 'client.key'))
        sio.wait(seconds=1)

        print("Connected")

        sio.on('disconnect', on_disconnect)
        sio.on('response', on_response)

        sio.emit('attend', {'ID': 38904812})
        sio.emit('enroll', {'Name' : "Shirley", 'RIN' : 66420420, 'ID' : 38904812}) 

        sio.disconnect()

    except ConnectionError:
        print('Server unreachable. Retrying shortly')




