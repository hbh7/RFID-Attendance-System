from socketIO_client_nexus import SocketIO
import sys

import urllib3
import readTag
urllib3.disable_warnings()
if len(sys.argv) != 2:
    print("Invalid argument count!")
    print("Execute as python3 script.py [Server Address, Ex: https://localhost:3000]")
    exit(1)

try:
    socketIO = SocketIO(sys.argv[1], verify='server.crt', cert=('client.crt', 'client.key'))
except ConnectionError:
    print("Invalid Server address unable to connect to server!")
    exit(1)

while (True):
    # Ask for information
    name = input("Enter Attendee's Name or Enter EXIT to Quit: ").strip()
    if len(name) == 0:
        print("Please enter a valid name. Try again.")
        continue
    if name.lower() == "exit":
        exit()
    rin = input("Enter RIN: ").strip()
    if len(rin) != 9:
        print("Please enter a RIN of 9 digits. Try again.")
        continue
    try:
        rin = int(rin)
    except:
        print("Please enter a RIN that consists of only numbers. Try again.")
        continue
    print("Please Scan Card.")
    # Read card
    id = readTag.read()
    # id = int(input("Enter ID: "))
    # transmit the data
    socketIO.emit('enroll', {'Name' : name, 'RIN' : rin, 'ID' : id}) 