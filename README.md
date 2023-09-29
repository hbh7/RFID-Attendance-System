# RFID-Attendance-System
RPI IOT 2019 Project

The RFID Attendance System provides an easy way to record classroom or event attendance using student RFID badges and Raspberry Pis. 

Features:
- Client / server and web-based architecture. 
- Backend server system uses Node.js and MongoDB.
- Python client to interact with the RFID reader and send data to the server. 
- Web interface to view recorded attendances.

<p align="center">
  <img src="https://raw.githubusercontent.com/hbh7/RFID-Attendance-System/master/resources/Hardware.png" width="50%" title="Hardware Info" alt="Hardware Info">
</p>
<p align="center">
  <img src="https://raw.githubusercontent.com/hbh7/RFID-Attendance-System/master/resources/Web.png" width="50%" title="Web UI Screenshot" alt="Web UI Screenshot">
</p>
<p align="center">
  <img src="https://raw.githubusercontent.com/hbh7/RFID-Attendance-System/master/resources/Schematic.png" width="50%" title="Schematic" alt="Schematic">
</p>

[Project Report](resources/Report.pdf)

## Resources used

https://github.com/nexus-devs/socketIO-client-2.0.3

https://urllib3.readthedocs.io/en/latest/advanced-usage.html#ssl-warnings

## Installation
```
git clone https://github.com/hbh7/RFID-Attendance-System
sudo mv RFID-Attendance-System /opt/
sudo chmod 777 -R /opt/RFID-Attendance-System
```

### Server
```
sudo apt install npm -y
```

### Client
```
sudo apt install python python-pip -y
pip install -U socketIO-client-nexus
```

### Auto start
Note: Replace <client,server> with just `client` or `server` 
```
cp /opt/RFID-Attendance-System/<server,client>/rfid<server,client>.service /lib/systemd/system/
sudo chmod 644 /lib/systemd/system/rfid<client,server>.service
sudo systemctl daemon-reload
sudo systemctl enable rfid<client,server>.service
```
Then reboot or run `sudo systemctl start rfid<client,server>`

## Usage

### Server
```
cd /opt/RFID-Attendance-System/server
npm install
npm start
```

### Client 
```
cd /opt/RFID-Attendance-System/client
python readTag.py https://localhost:3000
```
