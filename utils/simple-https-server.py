# taken from http://www.piware.de/2011/01/creating-an-https-server-in-python/
# generate server.xml with the following command:
#    openssl req -new -x509 -keyout server.pem -out server.pem -days 365 -nodes
# run as follows:
#    python simple-https-server.py
# then in your browser, visit:
#    https://localhost:4443

import BaseHTTPServer, SimpleHTTPServer
import ssl
import sys, getopt

host = 'localhost'
port = 4443
try:
  opts, args = getopt.getopt(sys.argv[1:],"",["host=", "port="])
except getopt.GetoptError:
  print 'simple-https-server.py --host <host> --port <port>'
  sys.exit(2)
for opt, arg in opts:
  if opt in ("--host"):
     host = arg
  elif opt in ("--port"):
     port = int(arg)
print 'host is ', host
print 'port is ', port

httpd = BaseHTTPServer.HTTPServer((host, port), SimpleHTTPServer.SimpleHTTPRequestHandler)
httpd.socket = ssl.wrap_socket (httpd.socket, certfile='./server.pem', server_side=True)
httpd.serve_forever()
