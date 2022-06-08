import sqlalchemy
from packages.LastFm import LastFm
from packages.Table import Table
from packages.config import API_KEY

if __name__ == '__main__':
    data_for_tables = {
        'genres': 'name varchar(100)',
        'artists': 'name varchar(100)',
        'albums': 'name varchar(100), release_year integer',
        'tracks': 'name varchar(100), length integer, album_id integer REFERENCES albums(id)',
        'playlists': 'name varchar(100), release_year integer',
        'genreartist': 'genre_id integer REFERENCES genres(id), artist_id integer REFERENCES artists(id)',
        'artistalbum': 'album_id integer REFERENCES albums(id), artist_id integer REFERENCES artists(id)',
        'playlisttrack': 'track_id integer REFERENCES tracks(id), playlist_id integer REFERENCES playlists(id)'
    }

    last_fm = LastFm(API_KEY)
    music_data = last_fm._get_music_data()

    engine = sqlalchemy.create_engine('postgresql://postgres:admin@localhost:5432/music_db')
    connection = engine.connect()

    tables = Table()
    fill_with_data = tables._fill_data()

    '''
    ADD DATA IN TABLES
    '''

    # Количество исполнителей в каждом жанре:
    connection.execute("""
    SELECT g.name, COUNT(ga.artist_id)
    FROM genreartist ga
    JOIN genres g ON g.id = ga.genre_id
    GROUP BY g.name;""").fetchall()


    # Количество треков, вошедших в альбомы 2019-2020 годов:
    connection.execute("""
    SELECT a.release_year, COUNT(*)
    FROM tracks t
    JOIN albums a ON a.id = t.album_id
    WHERE a.release_year IN (2019, 2020)
    GROUP BY a.release_year;""").fetchall()


    # Средняя продолжительность треков по каждому альбому:
    connection.execute("""
    SELECT a.name, ROUND(AVG(length), 2)
    FROM tracks t
    JOIN albums a ON a.id = t.album_id
    GROUP BY a.name;""").fetchall()


    # Все исполнители, которые не выпустили альбомы в 2020 году:
    connection.execute("""
    SELECT DISTINCT name
    FROM artists
    WHERE name NOT IN (
        SELECT DISTINCT ar.name
        FROM artists ar
        JOIN artistalbum aa ON ar.id = aa.artist_id
        JOIN albums al ON al.id = aa.album_id
        WHERE al.release_year = 2020);""").fetchall()


    # Названия сборников, в которых присутствует конкретный исполнитель (выберите сами):
    connection.execute("""
    SELECT DISTINCT p.name
    FROM playlisttrack pt
    LEFT JOIN tracks t ON t.id = pt.track_id
    LEFT JOIN playlists p ON p.id = pt.playlist_id
    LEFT JOIN albums al ON al.id = t.album_id
    LEFT JOIN artistalbum aa ON al.id = aa.album_id
    LEFT JOIN artists ar ON ar.id = aa.artist_id
    WHERE ar.name = 'Kanye West';""").fetchall()


    # Название альбомов, в которых присутствуют исполнители более 1 жанра:
    connection.execute("""
    SELECT al.name, ar.name, COUNT(DISTINCT g.name)
    FROM artists ar
    LEFT JOIN genreartist ga ON ga.artist_id = ar.id
    LEFT JOIN genres g ON g.id = ga.genre_id
    LEFT JOIN artistalbum aa ON ar.id = aa.artist_id
    LEFT JOIN albums al ON aa.album_id = al.id
    GROUP BY ar.name, al.name
    HAVING COUNT(DISTINCT g.name) > 1;""").fetchall()


    # Наименование треков, которые не входят в сборники:
    connection.execute("""
    SELECT t.name
    FROM tracks t
    LEFT JOIN playlisttrack pt ON pt.track_id = t.id
    WHERE pt.playlist_id IS NULL;""").fetchall()


    # Исполнителя(-ей), написавшего самый короткий по продолжительности трек (теоретически таких треков может быть несколько):
    connection.execute("""
    SELECT DISTINCT ar.name
    FROM tracks t
    JOIN albums al ON al.id = t.album_id
    JOIN artistalbum aa ON aa.album_id = al.id
    JOIN artists ar ON ar.id = aa.artist_id
    WHERE t.length = (
        SELECT MIN(length)
        FROM tracks t);""").fetchall()


    # Название альбомов, содержащих наименьшее количество треков:
    connection.execute("""
    SELECT album_name
    FROM (
        SELECT al.name AS album_name, COUNT(t.id) AS count_tracks
        FROM albums al
        JOIN tracks t ON t.album_id = al.id
        GROUP BY al.name) t1
    ORDER BY count_tracks
    LIMIT 1;""").fetchall()
