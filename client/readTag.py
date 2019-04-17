import RPi.GPIO as GPIO
import sys
import time
from mfrc522 import SimpleMFRC522
from socketIO_client_nexus import SocketIO
import urllib3
urllib3.disable_warnings()

# Uses library to read from the RFID tag
def read():
    reader = SimpleMFRC522()
    try:
        id, text = reader.read()
        print(id)
        print(text)
        return (id,text)
    finally:
        GPIO.cleanup()

if __name__ == "__main__":
    if(len(sys.argv) != 2):
        print("Invalid argument count!")
        print("Execute as python3 script.py [Server Address, Ex: https://localhost:3000]")
        exit(1)
    
    sio = SocketIO(sys.argv[1], verify='server.crt', cert=('client.crt', 'client.key'))
    
    while True:
        id, text = read()
        text = text.strip()
        sio.emit('attend', {'ID': id, 'text': text})
        time.sleep(1)
