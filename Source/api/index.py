#!C:\Program Files (x86)\Microsoft Visual Studio\Shared\Python36_64\python.exe

import os
import sys
import json
import cgi, cgitb 
import urllib.parse as urlp

import importlib

# enable debugging
cgitb.enable()

lookup = {
    "weather":"controllers.weather",
}

def execute_function(url):
    o = urlp.urlparse(url)
    path = o.path
    qs = o.query
    params = urlp.parse_qs(qs)

    path_array = path.split("/")

    try: 
        modulepath = lookup[path_array[1]]

        module = importlib.import_module(modulepath) 

        func_name = path_array[2]
      
        response = getattr(module, func_name)(params)
        
        return response
        

    except Exception as ex:
        #404 handling
        return ex

url = os.environ["REQUEST_URI"] 
user_agent = os.environ["HTTP_USER_AGENT"]
ip = os.environ["REMOTE_ADDR"]

print("Content-Type: application/json\n")

print(execute_function(url))
