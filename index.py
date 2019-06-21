#!C:\Program Files (x86)\Microsoft Visual Studio\Shared\Python36_64\python.exe

print("Content-Type: text/html\n")

import os
import cgi, cgitb 
import urllib.parse as urlp

import importlib

# enable debugging
cgitb.enable()

lookup = {
    "/":"home" ,
      "/page0/":"pages.page0",
      "/page1/":"pages.page1"
}

def getContent(path):
    try:
        contentpath = lookup[path]
    except:
        contentpath = "404"

    try:
        contentmodule = importlib.import_module(contentpath)
    except:
        return "module not found"

    try: 
        content = contentmodule.content()
    except Exception as exception:
        return exception
    return content

import macros.head
import macros.header
import macros.footer

url = os.environ["REQUEST_URI"] 
parsed = urlp.urlparse(url) 
path = parsed.path

user_agent = os.environ["HTTP_USER_AGENT"]
ip = os.environ["REMOTE_ADDR"]

print("<!DOCTYPE HTML><html lang=en><head>")

print(macros.head.content())

print("</head><body><div class='wrapper'>")

print(macros.header.content(path))

print(getContent(path))

print(macros.footer.content())
#print(path)
#print(user_agent)
#print(ip)

print("</div></body>")









