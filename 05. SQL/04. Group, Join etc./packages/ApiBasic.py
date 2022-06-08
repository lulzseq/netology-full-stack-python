import requests


class ApiBasic:
    def __init__(self, API_KEY: str) -> None:
        """
        :param API_KEY: api key from LastFM API
        """
        self.host = 'http://ws.audioscrobbler.com/2.0'
        self.api_key = API_KEY

    def _send_request(self, method: str, params=None, headers=None, json=None, response_type=None) -> dict:
        """
        :param method: method API request
        :param params: dict with custom params of the called function
        :param headers: dict with custom headers of the called function
        """
        response = requests.request('GET', f'{self.host}/?method={method}&api_key={self.api_key}&format=json',
                                    params=params, headers=headers, json=json)
        return response.json()
