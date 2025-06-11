import fs from 'fs'
import path from 'path'

export default defineEventHandler((event) => {
	const division = event.context.params?.division

  const dir = path.resolve(`../localDatas/${division}`)
  const files = fs.readdirSync(dir)
  const data = files.map(file => {
    console.log('file:', file)
    const content = fs.readFileSync(path.join(dir, file), 'utf-8')
    return JSON.parse(content)
  })
  return data
})