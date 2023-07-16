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

    const seatService = new SeatService(jsonData);

    let reservation: string[] = seatService.existingReservation(cartId);

    if (reservation.length === 0) {
      reservation = seatService.getBestAvailableSeats(parseInt(qty));
      const updatedSeats = seatService.updateSeatDetails(reservation, cartId);

      fs.writeFileSync(fileName, JSON.stringify(updatedSeats));

    }

    return res.status(200).json({
      data: reservation
    });
  };
}

export default new SeatsController();
