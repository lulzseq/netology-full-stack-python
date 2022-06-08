from ApiBasic import ApiBasic


class LastFm(ApiBasic):
    def _get_music_data(self) -> dict:
        """
        here we getting music data from LastFM API and return it as a dict
        """
        music_data = {}
        list_artists = self._get_top_artists()['artists']['artist']
        for artist in list_artists:
            music_data[artist['name']] = {}
            list_genres = []
            for tag in self._get_genres_from_artist(artist['name'])['toptags']['tag'][:2]:
                list_genres.append(tag['name'])
                music_data[artist['name']]['genre'] = list_genres
            list_albums = []
            for album in self._get_albums_from_artist(artist['name'])['topalbums']['album'][:3]:
                list_albums.append({album['name']: {'release_year':
                                                        self._get_release_year(artist['name'], album['name'])['album'][
                                                            'wiki']['published'].split(', ')[0][-4:], 'tracks': []}})
            music_data[artist['name']]['albums'] = list_albums
            for idx in range(len(music_data[artist['name']]['albums'][:3])):
                list_tracks = []
                album = [x for x in music_data[artist['name']]['albums'][idx]][0]
                tracks_from_album = self._get_tracks_from_album(artist['name'], album)['album']
                if 'tracks' in tracks_from_album.keys():
                    for track in tracks_from_album['tracks']['track']:
                        music_data[artist['name']]['albums'][idx][
                            [x for x in music_data[artist['name']]['albums'][idx]][0]]['tracks'].append(
                            [track['name'], track['duration']])
                else:
                    del music_data[artist['name']]['albums'][idx]
        return music_data

    def _get_top_artists(self) -> dict:
        params = {'limit': 5}
        return self._send_request('chart.getTopArtists', params=params)

    def _get_genres_from_artist(self, artist: str) -> dict:
        """
        :param artist: name of the artist for getting its genres
        """
        params = {'artist': artist}
        return self._send_request('artist.getTopTags', params=params)

    def _get_albums_from_artist(self, artist: str) -> dict:
        """
        :param artist: name of the artist for getting its albums
        """
        params = {'limit': 5, 'artist': artist}
        return self._send_request('artist.getTopAlbums', params=params)

    def _get_tracks_from_album(self, artist: str, album: str) -> dict:
        """
        :param artist: name of the artist for getting its album
        :param album: name of the album for getting its tracks
        """
        params = {'album': album, 'artist': artist}
        return self._send_request('album.getInfo', params=params)

    def _get_release_year(self, artist: str, album: str) -> dict:
        """
        :param artist: name of the artist for getting its album
        :param album: name of the album for getting its release date
        """
        params = {'album': album, 'artist': artist}
        return self._send_request('album.getInfo', params=params)
