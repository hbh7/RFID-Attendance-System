# RFID-Attendance-System
RPI IOT 2019 Project

[Project Proposal](https://docs.google.com/document/d/1QlV8jkIaQD0IFdyguDEGK3X-7NJBnk0Imp9yfcRr-jM)

## Resources used

https://github.com/nexus-devs/socketIO-client-2.0.3

https://urllib3.readthedocs.io/en/latest/advanced-usage.html#ssl-warnings

## Instructions

Server:

```bash
sudo apt install npm -y
npm start
```

Client: 

```bash
sudo apt install python2 python2-pip -y
pip install -U socketIO-client-nexus
python2 readTag.py https://localhost:3000
```

### Todo
* Create an enrollment program to allow linking of Card ID’s to user data
* Caching if server cannot be reached
* Support switching which class the controller is recording for
* Auto starting of program services
* Connect the enrollment program to an attendance program
* Run a Node.JS server and MongoDB on the server Pi to allow the owner to view the attendance data
* Design the interface for these programs
* ~~Research and implement more secure data transfer methods from the client to server~~
