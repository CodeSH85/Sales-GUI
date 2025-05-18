import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  try {
    // const division = event.context.params?.division;
    const division = getRouterParam(event, 'division');
    
    const body = await readBody(event)
    const id = `${division}-${Date.now().toString(36)}`
  
    console.log(id, body)
    const dirPath = path.resolve(`data/${division}`);
    await fs.promises.mkdir(dirPath, { recursive: true });
  
    const filePath = path.join(dirPath, `${id}.json`);
    await fs.promises.writeFile(filePath, JSON.stringify({ ...body, id }, null, 2), 'utf-8')

    // // const filePath = path.resolve(`data/${division}/${id}.json`)
    // // fs.writeFileSync(filePath, JSON.stringify({ ...body, id }, null, 2), 'utf-8')
    return { success: true, id }
  } catch (e) {
    console.error('Error in create event:', e);
  }

})