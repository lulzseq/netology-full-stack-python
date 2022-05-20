import pytest
from main import *

fixtures = {
    'check_document_existance': [('10006', True), ('11-2', True)],
    'get_doc_owner_name': [('10006', 'Аристарх Павлов'), ('11-2', 'Геннадий Покемонов')],
    'get_all_doc_owners_names': [({'Геннадий Покемонов', 'Аристарх Павлов', 'Василий Гупкин'})],
    'remove_doc_from_shelf': [('2', None), ('1', None)],
    'add_new_shelf': [('2', ('2', False)), ('1', ('1', False))],
    'append_doc_to_shelf': [('123', '3', None), ('111', '2', None)],
    'delete_doc': [('11-2', ('11-2', True)), ('10006', ('10006', True))],
    'get_doc_shelf': [('11-2', '1'), ('10006', '2')],
    'move_doc_to_shelf': [('11-2', '3', None), ('10006', '1', None)],
    'show_document_info': [(documents[0], None), (documents[-1], None)],
    'add_new_doc': [('001', 'passport', 'Vladimir', '3', '3'), ('002', 'insurance', 'Ivan', '2', '2')]
}


@pytest.mark.parametrize('user_doc_number, doc_founded', fixtures['check_document_existance'])
def test_check_document_existance(user_doc_number, doc_founded):
    assert check_document_existance(user_doc_number) == doc_founded


@pytest.mark.parametrize('user_doc_number, name', fixtures['get_doc_owner_name'])
def test_get_doc_owner_name(user_doc_number, name):
    assert get_doc_owner_name(user_doc_number) == name


@pytest.mark.parametrize('set_users_list', fixtures['get_all_doc_owners_names'])
def test_get_all_doc_owners_names(set_users_list):
    assert get_all_doc_owners_names() == set_users_list


@pytest.mark.parametrize('doc_number, result', fixtures['remove_doc_from_shelf'])
def test_remove_doc_from_shelf(doc_number, result):
    assert remove_doc_from_shelf(doc_number) == result


@pytest.mark.parametrize('shelf_number, result', fixtures['add_new_shelf'])
def test_add_new_shelf(shelf_number, result):
    assert add_new_shelf(shelf_number) == result


@pytest.mark.parametrize('doc_number, shelf_number, result', fixtures['append_doc_to_shelf'])
def test_append_doc_to_shelf(doc_number, shelf_number, result):
    assert append_doc_to_shelf(doc_number, shelf_number) == result


@pytest.mark.parametrize('user_doc_number, result', fixtures['delete_doc'])
def test_delete_doc(user_doc_number, result):
    assert delete_doc(user_doc_number) == result


@pytest.mark.parametrize('user_doc_number, result', fixtures['get_doc_shelf'])
def test_get_doc_shelf(user_doc_number, result):
    assert get_doc_shelf(user_doc_number) == result


@pytest.mark.parametrize('user_doc_number, user_shelf_number, result', fixtures['move_doc_to_shelf'])
def test_move_doc_to_shelf(user_doc_number, user_shelf_number, result):
    assert move_doc_to_shelf(user_doc_number, user_shelf_number) == result


@pytest.mark.parametrize('doc_number, result', fixtures['show_document_info'])
def test_show_document_info(doc_number, result):
    assert show_document_info(doc_number) == result


@pytest.mark.parametrize('new_doc_number, new_doc_type, new_doc_owner_name, new_doc_shelf_number, result',
                         fixtures['add_new_doc'])
def test_add_new_doc(new_doc_number, new_doc_type, new_doc_owner_name, new_doc_shelf_number, result):
    assert add_new_doc(new_doc_number, new_doc_type, new_doc_owner_name, new_doc_shelf_number) == result
