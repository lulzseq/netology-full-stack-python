import requests


class ApiBasic:
    def __init__(self):
        self.host = 'https://habr.com/ru/all/'
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) \
            Chrome/39.0.2171.95 Safari/537.36'
        }

    def _send_request(self, url):
        response = requests.get(url, headers=self.headers)
        return response
