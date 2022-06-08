from functions import *
from ..main import data_for_tables, connection, music_data


class Table():
    def _fill_data(self) -> None:
        for table_name, query_data in data_for_tables.items():
            self._create_table(table_name, query_data)
        self._insert_genre_data()
        self._insert_artist_data()
        self._insert_album_data()
        self._insert_track_data()
        self._insert_genreartist_data()
        self._insert_artistalbum_data()
        self._insert_playlist_data()
        self._insert_playlisttrack_data()

    def _create_table(self, table_name: str, query_data: str) -> None:
        """
        :param table_name: name of the table from the database
        :param query_data: values from the database
        """
        connection.execute(
            f"""
        CREATE TABLE IF NOT EXISTS {table_name} (
            id serial PRIMARY KEY,
            {query_data});
        """)

    def _fill_table(self, table_name: str, column: str, values_data: str) -> None:
        """
        :param table_name: name of the table from the database
        :param column: name of the column from the database
        :param values_data: values from the database
        """
        connection.execute(
            f"""INSERT INTO {table_name}({column})
        VALUES ('{values_data}');
        """)

    def _update_table(self, table_name: str, updating_column: str, values_data: str, filtering_column: str,
                      filtering_data: str) -> None:
        """
        :param table_name: name of the required table
        :param updating_column: required column
        :param values_data: new data
        :param filtering_column: filtering data
        :param filtering_data: filtering data
        :return:
        """
        connection.execute(
            f"""UPDATE {table_name}
            SET {updating_column} = {values_data}
            WHERE {filtering_column} = '{filtering_data}';
        """)

    def _insert_genre_data(self) -> None:
        for genre in get_list_genres():
            self._fill_table('genres', 'name', f'{genre}')

    def _insert_artist_data(self) -> None:
        for artist_name in get_list_artists():
            self._fill_table('artists', 'name', f'{artist_name}')

    def _insert_album_data(self) -> None:
        for album in get_list_albums():
            self._fill_table('albums', 'name', f'{album[0]}')
            self._update_table('albums', 'release_year', f'{album[1]}', 'name', f'{album[0]}')

    def _insert_track_data(self) -> None:
        for val in music_data.values():
            for album_data in val['albums']:
                for name, data in album_data.items():
                    album_id = get_id_album(name)
                    for al in data['tracks']:
                        self._fill_table('tracks', 'name', f"""{al[0].replace("'", "")}""")
                        if al[1] is not None:
                            self._update_table('tracks', 'length', f'{al[1]}', 'name', f"""{al[0].replace("'", "")}""")
                        else:
                            self._update_table('tracks', 'length', 0, 'name', f"""{al[0].replace("'", "")}""")
                        self._update_table('tracks', 'album_id', f'{album_id}', 'name', f"""{al[0].replace("'", "")}""")

    def _insert_genreartist_data(self) -> None:
        for artist_name, artist_data in music_data.items():
            for data, _ in artist_data.items():
                for genre in artist_data[data]:
                    self._fill_table('genreartist', 'artist_id', f'{get_artist_id_by_name(artist_name)}')
                    self._update_table('genreartist', 'genre_id', f'{get_genre_id_by_name(genre)}', 'artist_id',
                                       f'{get_artist_id_by_name(artist_name)}')
                break

    def _insert_artistalbum_data(self) -> None:
        for artist_name, artist_data in music_data.items():
            for album in artist_data['albums']:
                self._fill_table('artistalbum', 'artist_id', f'{get_artist_id_by_name(artist_name)}')
                self._update_table('artistalbum', 'album_id',
                                   f'{[get_id_album(album_name) for album_name in album.keys()][0]}', 'artist_id',
                                   f'{get_artist_id_by_name(artist_name)}')

    def _insert_playlist_data(self) -> None:
        names = ['Playlist1', 'Playlist2', 'Playlist3', 'Playlist4', 'Playlist5', 'Playlist6', 'Playlist7', 'Playlist8']
        years = [2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015]
        for name, year in zip(names, years):
            self._fill_table('playlists', 'name', f'{name}')
            self._update_table('playlists', 'release_year', f'{year}', 'name', f'{name}')

    def _insert_playlisttrack_data(self) -> None:
        list_track_ids = []
        i = 1
        while i < 80:
            j = i + 10
            con1 = connection.execute(
                f"""SELECT * FROM tracks WHERE id BETWEEN {i} AND {j};
            """).fetchall()
            list_track_ids.append(con1)
            i += 10
        con2 = connection.execute(
            f"""SELECT * FROM playlists;
        """).fetchall()
        for m, j in zip(list_track_ids, con2):
            for n in m:
                self._fill_table('playlisttrack', 'playlist_id', f'{j[0]}')
                self._update_table('playlisttrack', 'track_id', f'{n[0]}', 'playlist_id', f'{j[0]}')
