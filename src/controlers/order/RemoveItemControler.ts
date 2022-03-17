import { Request, Response } from "express";
import { RemoveItemService } from "../../services/oder/RemoItemService";

class RemoveItemControler {
  async handle(req: Request, res: Response) {
    const item_id = req.query.item_id as string;

    const removeItem = new RemoveItemService();

    const order = await removeItem.execute({
      item_id,
    });

    return res.json(order);
  }
}
export { RemoveItemControler };
