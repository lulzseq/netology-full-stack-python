from django.shortcuts import render
from django.http import HttpResponse

DATA = {
    'omlet': {
        'яйца, шт': 2,
        'молоко, л': 0.1,
        'соль, ч.л.': 0.5,
    },
    'pasta': {
        'макароны, г': 0.3,
        'сыр, г': 0.05,
    },
    'buter': {
        'хлеб, ломтик': 1,
        'колбаса, ломтик': 1,
        'сыр, ломтик': 1,
        'помидор, ломтик': 1,
    },
    # можете добавить свои рецепты ;)
}


# Напишите ваш обработчик. Используйте DATA как источник данных
# Результат - render(request, 'calculator/index.html', context)
# В качестве контекста должен быть передан словарь с рецептом:
# context = {
#   'recipe': {
#     'ингредиент1': количество1,
#     'ингредиент2': количество2,
#   }
# }
def recipe(request, meal):
    servings = int(request.GET.get('servings', 1))

    hashtable = dict()
    for key, val in DATA[meal].items():
        hashtable[key] = round(val*servings, 2)

    context = {
        'recipe': hashtable,
        'dish_name': str(meal)
    }

    return render(request, 'calculator/index.html', context)

def index(request):
    context = {
        'keys': DATA.keys()
    }
    return render(request, 'calculator/main.html', context)