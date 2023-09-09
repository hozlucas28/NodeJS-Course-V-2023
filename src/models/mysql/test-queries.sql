DROP DATABASE IF EXISTS movies_db;

CREATE DATABASE movies_db;

USE movies_db;

CREATE TABLE
	movie (
		id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN (UUID ())),
		title VARCHAR(255) NOT NULL,
		YEAR INT NOT NULL,
		director VARCHAR(255) NOT NULL,
		duration INT NOT NULL,
		poster TEXT,
		rate DECIMAL(2, 1) UNSIGNED NOT NULL
	);

CREATE TABLE
	genre (
		id INT AUTO_INCREMENT PRIMARY KEY,
		name VARCHAR(255) NOT NULL UNIQUE
	);

CREATE TABLE
	movie_genres (
		movie_id BINARY(16) REFERENCES movies (id),
		genre_id INT REFERENCES genres (id),
		PRIMARY KEY (movie_id, genre_id)
	);

INSERT INTO
	genre (name)
VALUES
	('Drama'),
	('Action'),
	('Crime'),
	('Adventure'),
	('Sci-Fi'),
	('Romance');

INSERT INTO
	movie (id, title, YEAR, director, duration, poster, rate)
VALUES
	(
		UUID_TO_BIN (UUID ()),
		"Inception",
		2010,
		"Christopher Nolan",
		180,
		"",
		8.8
	),
	(
		UUID_TO_BIN (UUID ()),
		"The Shawshank Redemption",
		1994,
		"Frank Darabont",
		142,
		"",
		9.2
	),
	(
		UUID_TO_BIN (UUID ()),
		"The Dark Knight",
		1994,
		"Christopher Nolan",
		152,
		"",
		9.0
	);

INSERT INTO
	movie_genres (movie_id, genre_id)
VALUES
	(
		(
			SELECT
				id
			FROM
				movie
			WHERE
				title = 'Inception'
		),
		(
			SELECT
				id
			FROM
				genre
			WHERE
				name = 'Sci-Fi'
		)
	),
	(
		(
			SELECT
				id
			FROM
				movie
			WHERE
				title = 'Inception'
		),
		(
			SELECT
				id
			FROM
				genre
			WHERE
				name = 'Action'
		)
	),
	(
		(
			SELECT
				id
			FROM
				movie
			WHERE
				title = 'The Shawshank Redemption'
		),
		(
			SELECT
				id
			FROM
				genre
			WHERE
				name = 'Drama'
		)
	),
	(
		(
			SELECT
				id
			FROM
				movie
			WHERE
				title = 'The Dark Knight'
		),
		(
			SELECT
				id
			FROM
				genre
			WHERE
				name = 'Action'
		)
	);

SELECT
	*
FROM
	movie;
