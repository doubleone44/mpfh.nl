import os 
import json
import urllib.request as http
import urllib.parse

key = "8f4c4ea7864e00a14e3726343881727b/"
baseurl = "https://api.darksky.net/forecast/"

def get(params):
    _lat = params["latitude"][0]
    _long = params["longitude"][0]

    url = baseurl + key + _lat + "," + _long + "?units=si"

    with http.urlopen(url) as response:
        html = response.read()
        js = json.loads(html)

        return_json = json.dumps(js)

    #some processing here

    return return_json
