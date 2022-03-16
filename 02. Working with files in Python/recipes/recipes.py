from pprint import pprint


def get_shop_list_by_dishes(dishes, person_count):
    dict_ = {}
    for dish in dishes:
        for ingredients in cook_book.get(dish):
            if ingredients['ingridient_name'] not in dict_.keys():
                dict_[ingredients['ingridient_name']] = {'measure': ingredients['measure'],
                                                         'quantity': ingredients['quantity'] * person_count}
            else:
                dict_[ingredients['ingridient_name']]['quantity'] += ingredients['quantity']
    return dict_


cook_book = {}

with open('recipes/recipe.txt', encoding='utf-8') as f:
    for line in f:
        key = line.strip()
        list_ = []
        for i in range(int(f.readline().strip())):
            val = f.readline().strip().split(' | ')
            list_.append({'ingridient_name': val[0], 'quantity': int(val[1]), 'measure': val[2]})
        f.readline()
        cook_book[key] = list_

pprint(get_shop_list_by_dishes(['Запеченный картофель', 'Омлет'], 2))
