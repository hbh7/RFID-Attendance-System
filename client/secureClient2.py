from socketIO_client_nexus import SocketIO

import urllib3
urllib3.disable_warnings()

def on_test_response(*args):
    print('on_test_response', args)

socketIO = SocketIO('https://localhost', 3000,
                    verify='server.crt',
                    cert=('client.crt', 'client.key')
                    )
	
	
socketIO.emit('attend', {'ID': '12345'})
	
#socketIO.on('on_test', on_test_response)
socketIO.wait(seconds=1)
