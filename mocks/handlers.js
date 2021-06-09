import { rest } from 'msw'

export const handlers = [
// rest.get('/api/account', (req, res, ctx) =>{
// 	console.log('test');
// 	const user = {
// 		customerId: 'id',
// 		firstName: 'firstName',
// 		lastName: 'lastName',
// 	};

  // 	return res(ctx.json(user));
  // }),
  rest.post('/api/donate', (req, res, ctx) => {
    return res(ctx.json({ success: true }))
  })
]
