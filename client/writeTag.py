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
    write_message = input("Enter message to write to the tag: ")
    write(write_message)
    id, text = read()
    print("ID:", id, "Text:", text)
    if write_message == text:
        print("Success!")
    else:
        print("Failed!")
