import pytest
from main import *

fixtures = {
    'create_folder': [('0001', 201), ('test', 201), ('$%^&', 201), ('312423', 201)]
}


@pytest.mark.parametrize('folder_name, result', fixtures['create_folder'])
def test_create_folder(folder_name, result):
    get_status_code = create_folder(folder_name)
    if get_status_code == 409:
        print(f'Папка с именем "{folder_name}" уже существует.')
    assert get_status_code == result


def test_get_all_folders():
    assert type(get_all_folders()) == list
