from typing import Union
from ..main import data_for_tables, music_data, connection


def get_list_genres() -> list:
    list_ = []
    for i in music_data.values():
        [list_.append(genre) for genre in i['genre']]
    return list(set(list_))


def get_list_artists() -> list:
    return list(set([artist for artist in music_data.keys()]))


def get_list_albums() -> list:
    list_ = []
    for val in music_data.values():
        for album in val['albums']:
            for name in album:
                list_.append([name, album[name]['release_year']])
    return list_


def get_id_album(album_name: str) -> str:
    """
    :param album_name: name of the album for getting its id in table
    """
    album_data = connection.execute(
        f"""SELECT * FROM albums;
    """).fetchall()
    for album in album_data:
        if album_name == album[1]:
            return album[0]


def get_artist_id_by_name(artist_name: str) -> Union[int, None]:
    """
    :param artist_name: name of the artist for getting its id in table
    """
    con = connection.execute(
        f"""SELECT * FROM artists;
    """).fetchall()

    if artist_name in [el[1] for el in con]:
        return [el[0] for el in con][[el[1] for el in con].index(artist_name)]
    else:
        return 0


def get_genre_id_by_name(genre: str) -> Union[int, None]:
    """
    :param genre: name of the genre for getting its id in table
    """
    con = connection.execute(
        f"""SELECT * FROM genres;
    """).fetchall()

    if genre in [el[1] for el in con]:
        return [el[0] for el in con][[el[1] for el in con].index(genre)]
    else:
        return 0
