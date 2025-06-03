import fs from 'fs'
import path from 'path'

export default defineEventHandler((event) => {
	// console.log('get event:', event.context.params)
	const id = event.context.params?.id;
	if (!id) return
	const where = id.split('-')[0];

	const file = path.resolve(`data/${where}/${id}.json`)
	try {
		const json = fs.readFileSync(file, 'utf-8')
		console.log(json)
		return JSON.parse(json)
	} catch (e) {
		console.error(e)
		throw createError({ statusCode: 404, message: `找不到 ${id}` })
	}
})