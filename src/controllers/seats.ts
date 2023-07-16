import * as fs from 'fs';
import * as path from 'path';
import SeatService from "../service/SeatService";

import { Request, Response, NextFunction } from 'express';

class SeatsController {
  reserve = (req: Request, res: Response, next: NextFunction) => {
    const fileName: string = path.join(__dirname, "../data/seats.json");
    const fileContent = fs.readFileSync(fileName, 'utf-8');
    const jsonData = JSON.parse(fileContent);

    const { cartId, qty } = req.params;

    // console.log(fileContent);
    const ticketService = new SeatService(jsonData);
    const convertedSeats = ticketService.getBestAvailableTicket(parseInt(qty));

    return res.status(200).json({
      data: convertedSeats
    })
  };
}

export default new SeatsController();
