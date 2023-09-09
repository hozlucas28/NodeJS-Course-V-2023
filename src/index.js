import express from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import { createMoviesRouter } from './routes/movies.js'

export const createApp = ({ movieModel }) => {
	const app = express()
	app.disable('x-powered-by')

	// Middlewares
	app.use(express.json())
	app.use(corsMiddleware())

	//Rutas
	app.use('/movies', createMoviesRouter({ movieModel }))

	const port = process.env.PORT ?? 3000

	app.listen(port, () => {
		console.log(`Servidor funcionando en http://localhost:${port}`)
	})
}
