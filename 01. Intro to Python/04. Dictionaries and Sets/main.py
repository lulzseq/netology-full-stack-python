# Задание 1

geo_logs = [
    {'visit1': ['Москва', 'Россия']},
    {'visit2': ['Дели', 'Индия']},
    {'visit3': ['Владимир', 'Россия']},
    {'visit4': ['Лиссабон', 'Португалия']},
    {'visit5': ['Париж', 'Франция']},
    {'visit6': ['Лиссабон', 'Португалия']},
    {'visit7': ['Тула', 'Россия']},
    {'visit8': ['Тула', 'Россия']},
    {'visit9': ['Курск', 'Россия']},
    {'visit10': ['Архангельск', 'Россия']}
]

idx_list = []

for idx in range(len(geo_logs)):
  if 'Россия' in list(geo_logs[idx].values())[0]:
    idx_list.append(idx)

print(list(map(geo_logs.__getitem__, idx_list)))
print()


# Задание 2

ids = {'user1': [213, 213, 213, 15, 213],
       'user2': [54, 54, 119, 119, 119],
       'user3': [213, 98, 98, 35]}

print(set([unique_geo_id for value in ids.values() for unique_geo_id in value]))
print()


# Задание 3

queries = [
    'смотреть сериалы онлайн',
    'новости спорта',
    'афиша кино',
    'сериалы этим летом',
    'курс по питону',
    'сериалы про спорт',
    'запрос из четырех слов'
    ]

length_list = [len(i.split()) for i in queries]

for i in set(length_list):
  print(f'Поисковой запрос из {i} слов встречается в {length_list.count(i) / len(length_list):.2%} случаев.', end=' ')
print()
print()


# Задание 4

stats = {'facebook': 55, 'yandex': 120, 'vk': 115, 'google': 99, 'email': 42, 'ok': 98}

print(max(stats, key=stats.get))
print()


# Задание 5

list_ = ['first', 'second', '2018-01-01', 'yandex', 'cpc', 100]
dict_ = {list_[-2]: list_[-1]}
k = 0

while k != len(list_)-2:
  newdict = {list_[-3-k]: dict_}
  dict_ = newdict
  k += 1

print(dict_)