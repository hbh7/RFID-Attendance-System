from socketIO_client_nexus import SocketIO

import urllib3
import readTag
urllib3.disable_warnings()

socketIO = SocketIO('https://localhost', 3000, verify='server.crt', cert=('client.crt', 'client.key'))
while (True):
    # Ask for information
    name = input("Enter Attendee's Name or Enter EXIT to Quit: ").strip()
    rin = input("Enter RIN: ").strip()
    print("Please Scan Card.")
    # Read card
    id = readTag.read()
    try:
        rin = int(rin)
    except:
        print("Please enter a RIN that consists of only numbers. Try again.")
        continue
    if not name.isalpha() or len(name) == 0:
        print("Please enter a valid name. Try again.")
        continue
    if len(rin) != 9:
        print("Please enter a RIN of 9 digits. Try again.")
        continue
    if name.lower() == "exit":
        return
    # transmit the data
    socketIO.emit('enroll', {'Name' : name, 'RIN' : rin, 'ID' : id}) 