import requests
import json
from tqdm import tqdm
from config import *


class ApiBasic:
    def _send_request(self, http_method, host, method, params=None, headers=None, json=None, response_type=None):
        response = requests.request(http_method, f'{host}/{method}', params=params, headers=headers, json=json)

        if response.status_code >= 400 and response.status_code != 409:
            raise HttpException(response.status_code, response.text)
        if response_type == 'json':
            response = response.json()

        return response


class VkClient(ApiBasic):
    def __init__(self, VK_TOKEN):
        self.vk_token = VK_TOKEN
        self.vk_host = 'https://api.vk.com/method'
        self.params = {
            'access_token': self.vk_token,
            'extended': '1',
            'v': '5.131'
        }

    def _download_photos(self, album_id):
        list_album_ids = []
        list_album_ids.append(album_id)
        list_album_ids += self._get_albums(album_id)
        return self._download_from_albums(list_album_ids)

    def _download_from_albums(self, list_album_ids):
        photos_list = []
        method = 'photos.get'

        for album_id in list_album_ids:
            method_params = {
                'album_id': album_id
            }

            res = self._send_request('GET', self.vk_host, method, params={**self.params, **method_params})

            if 'error' not in res.json().keys():
                photos_list += res.json()['response']['items']

        return self._getting_photo_for_download(photos_list)

    def _get_albums(self, album_id):
        method = 'photos.getAlbums'
        res = self._send_request('GET', self.vk_host, method, params=self.params)

        list_ = []
        yes_list = ['да', 'д', 'дда', 'ок', 'lf', 'даа', ' y', 'yes', 'llf', 'lff']
        system_albums = ['profile', 'wall', 'saved']
        system_albums.remove(album_id)

        for i in system_albums:
            if i == 'profile' and input(
                    'Скачать фото профиля?\nЕсли хотите их скачать, введите "да" и нажмите Enter. Если нет, просто нажмите Enter.') in yes_list:
                list_.append('profile')
            if i == 'wall' and input(
                    'Скачать фото со стены?\nЕсли хотите их скачать, введите "да" и нажмите Enter. Если нет, просто нажмите Enter.') in yes_list:
                list_.append('wall')
            if i == 'saved' and input(
                    'Скачать сохраненные фото?\nЕсли хотите их скачать, введите "да" и нажмите Enter. Если нет, просто нажмите Enter.') in yes_list:
                list_.append('saved')

        if 'error' not in res.json().keys():
            count_albums = res.json()['response']['count']
            print(f'Найдено еще {count_albums} доступных для скачивания альбома.')
            user_input = input('Если хотите их скачать, введите "да" и нажмите Enter. Если нет, просто нажмите Enter.')

            if user_input.lower() in yes_list:
                list_ += [(album['id']) for album in res.json()['response']['items'] if album['size'] != 0]

        return list_

    def _getting_photo_for_download(self, photos_list):
        list_for_json = []
        list_for_upload = []
        sort_rule_by_sizes = ['w', 'z', 'y', 'x', 'r', 'q', 'p', 'm', 's', 'o']

        for photo in photos_list:
            file_name = str(photo['likes']['count']) + '.jpg'
            size = sorted(photo['sizes'], key=lambda pair: sort_rule_by_sizes.index(pair['type']))[0]['type']
            photo_url = sorted(photo['sizes'], key=lambda pair: sort_rule_by_sizes.index(pair['type']))[0]['url']

            list_for_json.append({'filename': file_name, 'size': size})
            list_for_upload.append([photo_url, file_name])

        self._save_data_to_json(list_for_json)
        return list_for_upload

    def _save_data_to_json(self, list_):
        for i in tqdm(range(1), desc='Saving data to json-file'):
            with open('result.json', 'w') as file:
                file.write(str(json.dumps(list_, indent=4)))
        return


class YandexUploader(ApiBasic):
    def __init__(self, yandex_token):
        self.yandex_token = YANDEX_TOKEN
        self.yandex_host = 'https://cloud-api.yandex.net'
        self.yandex_headers = {'Authorization': 'OAuth' + ' ' + self.yandex_token}

    def _upload_photos_vk_to_yadisk(self, album_id='profile', folder_name='NEW_FOLDER'):
        downloader = VkClient(VK_TOKEN)
        photos_list = downloader._download_photos(album_id)

        self._create_folder(folder_name)

        for photo in tqdm(photos_list, desc='Uploading files on Yandex Disk'):
            self._upload_file_by_url(photo[0], photo[1], folder_name)

        return 'Done!'

    def _create_folder(self, folder_name):
        for i in tqdm(range(1), desc=f'Creating a new folder with name "{folder_name}" on Yandex Disk'):
            method = 'v1/disk/resources'
            params = {'path': '/' + folder_name}
            res = self._send_request('PUT', self.yandex_host, method, params=params, headers=self.yandex_headers)
        return folder_name

    def _upload_file_by_url(self, photo_url, file_name, folder_name):
        method = 'v1/disk/resources/upload'
        params = {'path': folder_name + '/' + file_name, 'url': photo_url}
        res = self._send_request('POST', self.yandex_host, method, params=params, headers=self.yandex_headers)
        if res.status_code != 202:
            print(f'File {file_name} not uploaded.')
        return


class HttpException(Exception):
    def __init__(self, status, message=''):
        self.status = status
        self.message = message

    def __str__(self):
        return f'http error: {self.status}\n{self.message}'


if __name__ == '__main__':
    uploader_to_yandex = YandexUploader(YANDEX_TOKEN)
    upload_to_yandex = uploader_to_yandex._upload_photos_vk_to_yadisk('profile', 'a-new')
