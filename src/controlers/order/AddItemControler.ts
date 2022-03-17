import {Request, Response} from 'express'

import {AddItemListService} from '../../services/oder/AddItemService'

class AddItemControler{
    async handle(req: Request, res: Response){
        const {order_id, product_id, amount} = req.body;

        const addItemListService = new AddItemListService()

        const order = await addItemListService.execute({
            order_id,
            product_id,
            amount
        })
        return res.json(order)

    }
}
export {AddItemControler}
