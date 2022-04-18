CREATE TABLE genre (
	id serial PRIMARY KEY,
	genre varchar(40) NOT NULL
);

CREATE TABLE artist (
	id serial PRIMARY KEY,
	name varchar(40) NOT NULL,
	release_year integer NOT NULL
);

CREATE TABLE IF NOT EXISTS genreartist (
	id serial PRIMARY KEY,
	genre_id integer NOT NULL REFERENCES genre(id),
	artist_id integer NOT NULL REFERENCES artist(id)
);

CREATE TABLE album (
	id serial PRIMARY KEY,
	name varchar(40) NOT NULL,
	release_year integer NOT NULL
);

CREATE TABLE IF NOT EXISTS artistalbum (
	id serial PRIMARY KEY,
	album_id integer NOT NULL REFERENCES album(id), 
	artist_id integer NOT NULL REFERENCES artist(id)
);

CREATE TABLE track (
	id serial PRIMARY KEY,
	name varchar(40) NOT NULL, 
	lenght integer NOT NULL,
	album integer REFERENCES album(id)
);

CREATE TABLE playlist (
	id serial PRIMARY KEY,
	name varchar(40) NOT NULL,
	release_year integer NOT NULL
);

CREATE TABLE IF NOT EXISTS playlisttrack (
	id serial PRIMARY KEY,
	track_id integer NOT NULL REFERENCES track(id),
	playlist_id integer NOT NULL REFERENCES playlist(id)
);