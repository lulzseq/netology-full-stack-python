import requests
from config import YANDEX_TOKEN
from pprint import pprint


def api_yandex(method, folder_name=''):
    headers = {'Authorization': 'OAuth' + ' ' + YANDEX_TOKEN,
               'Content-Type': 'application/json'}
    params = {'path': f'disk:/{folder_name}'}
    url = 'https://cloud-api.yandex.net:443/v1/disk/resources'
    result = requests.request(method=method, url=url, headers=headers, params=params)
    return result


def create_folder(folder_name):
    result = api_yandex('put', folder_name)
    return result.status_code


def get_all_folders():
    result = api_yandex('get').json()
    return [folder['name'] for folder in result['_embedded']['items']]


if __name__ == '__main__':
    new_folder_name = input('Введите имя новой папки: ')
    create_new_folder = create_folder(new_folder_name)
    folder_list = get_all_folders()

    print(f'Список всех папок: {folder_list}')

    if new_folder_name in folder_list and create_new_folder == 201:
        print(f'Новая папка с именем "{new_folder_name}" успешно создана.')
    else:
        print(create_new_folder)
