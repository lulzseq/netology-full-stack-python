documents = [
    {'type': 'passport', 'number': '2207 876234', 'name': 'Василий Гупкин'},
    {'type': 'invoice', 'number': '11-2', 'name': 'Геннадий Покемонов'},
    {'type': 'insurance', 'number': '10006', 'name': 'Аристарх Павлов'}
]

directories = {
    '1': ['2207 876234', '11-2', '5455 028765'],
    '2': ['10006'],
    '3': []
}


def main_func():
    cmd = input('Для просмотра доступных команд наберите HELP.\nВведите команду: ')
    if cmd == 'p':
        return get_name_by_number()
    elif cmd == 's':
        return get_shelf_by_number()
    elif cmd == 'l':
        return get_all_data()
    elif cmd == 'a':
        return add_new_document()
    elif cmd == 'd':
        return delete_by_number()
    elif cmd == 'm':
        return move_doc()
    elif cmd == 'as':
        return add_shelf()
    elif cmd == 'HELP':
        print(help_)
        return main_func()
    elif cmd == 'Q':
        return print()
    else:
        print('Неверная команда. Попробуйте еще раз.\n')
        return main_func()


def input_shelf():
    shelf = input('Введите номер полки: ')
    if shelf in directories.keys():
        return shelf
    else:
        print('Такой полки не существует. Укажите верную полку.')
        return input_shelf()


def input_number():
    number = input('Введите номер документа: ')
    if number in [id for s in directories.items() for id in s[1]]:
        return number
    else:
        print('Такого документа не существует. Попробуйте еще раз.\n')
        return input_number()


def get_name_by_number():
    cmd = input_number()
    name = [k for k in documents if any(cmd in value for value in k.items())][0]['name']
    print(f'Документ {cmd} принадлежит пользователю: {name}\n')
    return main_func()


def get_shelf_by_number():
    cmd = input_number()
    shelf = [key for key, val in directories.items() if any(cmd in v for v in val)][0]
    print(f'Документ {cmd} лежит на {shelf} полке.\n')
    return main_func()


def get_all_data():
    try:
        for i in eval(input('Введите имя списка: ')):
            val = [j for j in i.values()][0] + ' "' + [j for j in i.values()][1] + '" "' + [j for j in i.values()][
                2] + '"'
            print(val)
        print()
        return main_func()
    except:
        print('Список не найден. Попробуйте еще раз.\n')
        return get_all_data()


def add_new_document():
    number = input('Введите номер документа: ')
    type_ = input('Введите тип документа: ')
    name = input('Введите имя владельца: ')
    shelf = input_shelf()

    documents.append({'type': type_, 'number': 'number', 'name': name})

    directories[shelf] = number

    print(
        f'В каталог добавлен документ с типом {type_}, номером {number} и владельцем {name}. Документ помещен на {shelf} полку.\n')
    return main_func()


def delete_by_number():
    cmd = input_number()

    for key, val in directories.items():
        if cmd in val:
            directories[key].remove(cmd)

    for i in documents:
        if cmd in i.values():
            documents.remove(i)

    print(f'Документ под номером {cmd} удален.\n')
    return main_func()


def move_doc():
    cmd = input_number()
    shelf = input_shelf()
    for key, val in directories.items():
        if cmd in directories[shelf]:
            print('Данный документ уже на этой полке.\n')
            return main_func()
        elif cmd in val:
            directories[key].remove(cmd)
    directories[shelf].append(cmd)
    print(f'Документ {cmd} перемещен на {shelf} полку.\n')
    return main_func()


def add_shelf():
    shelf = input('Введите номер новой полки: ')
    if shelf in directories.keys():
        print('Такая полка уже существует. Попробуйте еще раз.')
        return add_shelf()
    else:
        directories[shelf] = []
        print(f'Создана полка с номером {shelf}.\n')
        return main_func()


help_ = '''
  'p'     : поиск имени владельца по номеру документа,
  's'     : поиск полки по номеру документа,
  'l'     : вывод на экран содержимого списка документов,
  'a'     : создание нового документа,
  'd'     : удаление списка документов по номеру,
  'm'     : перенос документа в другую папку,
  'as'    : добавление новой полки,
  'HELP'  : вывод доступных команд,
  'Q'     : завершение работы
  '''

if __name__ == '__main__':
    main_func()