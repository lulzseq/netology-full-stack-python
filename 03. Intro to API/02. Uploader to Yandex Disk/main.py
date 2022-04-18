import requests

from config import TOKEN


class YaUploader:
    def __init__(self, token: str):
        self.token = token

    def _get_upload_url(self, file_path: str):
        headers = {'Authorization': 'OAuth' + ' ' + self.token}
        params = {'path': file_path, 'overwrite': True}
        url = 'https://cloud-api.yandex.net:443' + '/v1/disk/resources/upload'
        upload_link = requests.get(url=url, headers=headers, params=params)
        return upload_link

    def _upload_file_to_disk(self, path_to_file):
        href = self._get_upload_url(path_to_file).json()['href']
        res = requests.put(url=href)
        if res.status_code == 201:
            return 'File was created'
        else:
            return res.content


if __name__ == '__main__':
    path_to_file = 'test.txt'
    uploader = YaUploader(TOKEN)
    result = uploader._upload_file_to_disk(path_to_file)
    print(result)
