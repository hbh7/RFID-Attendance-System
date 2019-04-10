import RPi.GPIO as GPIO
import sys
import socketio
import time
from mfrc522 import SimpleMFRC522

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

# Uses library to write to the RFID tag
def write(text):
    reader = SimpleMFRC522()
    try:
        reader.write(text)
        print("Wrote " + text)
    finally:
        GPIO.cleanup()

if __name__ == "__main__":
    if(len(sys.argv) != 2):
        print("Invalid argument count!")
        print("Execute as python3 script.py [SERVER_IP]")
        exit(1)
    sio = socketio.Client()
    sio.connect(sys.argv[1])
    write_message = input("Enter message to write to the tag: ")
    write(write_message)
    while True:
        id, text = read()
        text = text.strip()
        sio.emit('attend', {'ID': id, 'text': text})
        time.sleep(1)