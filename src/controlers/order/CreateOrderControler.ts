import { Request, Response } from "express";
import { CreateOrderService } from "../../services/oder/CreateOrderService";

class CreateOrderControler {
  async handle(req: Request, res: Response) {
    // Informando a mesa ( table) & e o nome do cliente ( nome )
    const { table, name } = req.body;

    const createOrderService = new CreateOrderService();

    const order = await createOrderService.execute({
        table,
        name
    })

    return res.json(order)
  }
}
export { CreateOrderControler };
