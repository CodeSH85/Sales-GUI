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

// export default defineEventHandler((event) => {
// 	const id = event.context.params?.id

// 	const mockPO = {
// 		id,
// 		vendorId: 'V001',
// 		vendorName: '百利貿易有限公司',
// 		orderDate: '2025-05-01',
// 		status: 'confirmed',
// 		totalAmount: 3150,
// 		createdBy: 'user001',
// 		items: [
// 			{
// 				itemId: 'ITEM-001',
// 				name: '紙箱',
// 				quantity: 100,
// 				unitPrice: 25.5,
// 				taxRate: 0.05
// 			}
// 		]
// 	}

// 	return mockPO
// })
  