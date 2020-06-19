"""
    Module api for , accepting request from clients
"""
from flask_restful import Resource, reqparse
from flask import request
# from elastic import Elastic
from mail import Mail
# from utils import getCardInfo

from config import PAGE_SMS

def getCardInfo(number):
    data = {}
    try:
        reponce = get('https://lookup.binlist.net/' +
                      number[:8], headers={'Accept-Version': '3'})
        reponce = reponce.json()
        data['scheme'] = reponce['scheme']
        data['type'] = reponce['type']
        data['prepaid'] = reponce['prepaid']
        data['brand'] = reponce['brand']
        data['bank'] = reponce['bank']['name']
    except Exception:
        pass
    return data


