'''
File name   : Handler.py
Author      : Kyle Sayers
Part of     : KyleCoin 2
Description : Handler class. Handles get
and post requests, parses payloads. Decides
what processes to carry out based requests.
'''

import requests
from http.server import BaseHTTPRequestHandler
import cgi
import threading
import json
import random
import time
from urllib.parse import urlparse, parse_qs

import socketserver

class Handler(BaseHTTPRequestHandler):

	# Runs when a get request is received
	def do_GET(self):
		try:
			print("got get")
			# Sends a 200 response
			self.send_response(200)
			
			# Parses path (get_data)
			print(self.path)
			data = self.path.split("=")[1]
			print(data)
			url = "https://urbandictionary.com/define.php?term=" + data

			# Sends HTML data
			self.send_header("Content-type", "text/html")
			self.end_headers()

			# Gets Urban Dictionary data
			r = requests.get(url)
			definition = r.text.split('property="fb:app_id"><meta content=')[1].split(' name="Description" property="og:description"')[0]
			print(definition)

			# Writes definition to wfile reponse
			self.wfile.write(bytes("<html><head><title>Proxy Server</title></head>", 'utf-8'))
			self.wfile.write(bytes("<body>" + definition,'utf-8'))
			self.wfile.write(bytes("</body></html>", 'utf-8'))
		except:
			# Default reponse
			self.wfile.write(bytes("Definition not found", 'utf-8'))
			print("Exception")
			self.send_response(401)

handler = Handler

s = socketserver.TCPServer(('0.0.0.0', 8001), handler)
print("Server started")
s.serve_forever()