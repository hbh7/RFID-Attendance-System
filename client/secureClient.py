import socketio

import datetime

sio = socketio.Client()

sio.connect("https://localhost:3000")

# I guess this first bit is a keyword that maps to a "sio.on" on the server,
# then the second bit is a dictionary that it sends, or i think just any data really
# furter testing required

sio.emit('my message', {'foo': 'bar'})

sio.emit('attend', {'ID': '01189998819991197253', 'datetime': date.datetime})
