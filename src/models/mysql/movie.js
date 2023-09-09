import mysql from 'mysql2/promise.js'

const config = {
	host: 'localhost',
	user: 'root',
	password: '289137tx',
	database: 'movies_db',
	port: 3306,
}

const connection = await mysql.createConnection(config)

export class MovieModel {
	static async getAll({ genre }) {
		if (genre) return []

		const [movies] = await connection.query(
			'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie;'
		)

		return movies
	}

	static async getById({ id }) {
		const [movies] = await connection.query(
			'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie WHERE id = UUID_TO_BIN(?);',
			[id]
		)

		return movies[0]
	}

	static async create({ input }) {
		const { director, duration, poster, rate, title, year } = input

		const [uuidResult] = await connection.query('SELECT UUID() uuid;')
		const [{ uuid }] = uuidResult

		try {
			await connection.query(
				'INSERT INTO movie (id, title, year, director, duration, poster, rate) VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?);',
				[uuid, title, year, director, duration, poster, rate]
			)
		} catch (e) {
			throw new Error(`Error on create movie: ${e}`)
		}

		const [movies] = await connection.query(
			'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie WHERE id = UUID_TO_BIN(?);',
			[uuid]
		)

		return movies[0]
	}

	static async update({ id, input }) {
		try {
			await connection.query(
				`UPDATE movie SET title = ?, year = ?, director = ?, duration = ?, poster = ?, rate = ? WHERE id = UUID_TO_BIN(?);`,
				[input.title, input.year, input.director, input.duration, input.poster, input.rate, id]
			)
		} catch (e) {
			throw new Error(`Error on update movie: ${e}`)
		}

		const [movies] = await connection.query(
			'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie WHERE id = UUID_TO_BIN(?);',
			[id]
		)

		return movies[0]
	}

	static async delete({ id }) {
		try {
			await connection.query('DELETE FROM movie WHERE id = UUID_TO_BIN(?);', [id])
		} catch (e) {
			throw new Error(`Error on delete movie: ${e}`)
		}

		const [movies] = await connection.query(
			'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie WHERE id = UUID_TO_BIN(?);',
			[id]
		)

		return movies[0]
	}
}
