import requests

from config import TOKEN


def _get_superheroes_intelligence(list_):
    superheroes_intelligence_dict = {}
    for name in list_:
        res = requests.get(url='https://superheroapi.com/api/' + TOKEN + '/search/' + name, timeout=5)
        intelligence = res.json()['results'][0]['powerstats']['intelligence']
        superheroes_intelligence_dict[name] = intelligence
        sorted__dict_by_intelligence = {key: val for key, val in
                                        sorted(superheroes_intelligence_dict.items(),
                                               key=lambda item: item[1])}
    return sorted__dict_by_intelligence


if __name__ == '__main__':
    print(f"The smartest superhero is "
          f"{next(iter(_get_superheroes_intelligence(['Captain America', 'Thanos', 'Hulk'])))}")
