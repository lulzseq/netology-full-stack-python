CREATE TABLE genre (
	id serial PRIMARY KEY,
	genre varchar(40) NOT NULL
);


CREATE TABLE artist (
	id serial PRIMARY KEY,
	name varchar(40) NOT NULL,
	release_year integer NOT NULL,
	genre integer REFERENCES genre(id)
);


CREATE TABLE album (
	id serial PRIMARY KEY,
	name varchar(40) NOT NULL,
	release_year integer NOT NULL,
	artist integer REFERENCES artist(id)
);

CREATE TABLE track (id serial PRIMARY KEY,
	name varchar(40) NOT NULL,
	lenght integer NOT NULL,
	album integer REFERENCES album(id)
);