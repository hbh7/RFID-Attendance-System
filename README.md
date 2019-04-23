# RFID-Attendance-System
RPI IOT 2019 Project

[Project Proposal](https://docs.google.com/document/d/1QlV8jkIaQD0IFdyguDEGK3X-7NJBnk0Imp9yfcRr-jM)

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
(are other libraries needed?)

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
