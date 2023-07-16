import { group } from 'console';
import { filter, groupBy, keyBy } from 'lodash';

interface Seat {
    code: string,  // seat-S0-A-8  seat-Section-Row-SeatNo
    block: number,
    seq: number,
    status: 1 | 2 | 3   // 1 available, 2 sold, 3 reserved
    cartId?: string
}

interface AvailableSeat {
  [block: number]: string[]
}

class SeatService {
  seats: Seat[];
  availableSeats!: AvailableSeat;

  constructor(seats: Seat[]) {
    this.seats = seats;
  }

  filterBlockByAvailable() {
    const filtered = this.seats.filter(seat => seat.status === 1);

    var obj:any = {};

    for (let index in filtered) {
      let key: number = filtered[index].block;

      if (key in obj) {
        obj[key.toString()].push(filtered[index].code);
      } else {
        obj[key] = [filtered[index].code];
      }
    }
    return obj;
  }

  getBestAvailableSeats(qty: number) {
    this.availableSeats = this.filterBlockByAvailable();

    let currentMin: number = 0;
    let result: string[] = [];
    let foundBest: Boolean = false;

    Object.entries(this.availableSeats).forEach(entry => {
      const [block, seats] = entry;

      if (seats.length >= qty) {
        if (currentMin === 0 || seats.length < currentMin) {
          result = [];
          for (let i = 0; i < qty; i++) {
            result.push(seats[i]);
          }

          if (currentMin === 0) {
            currentMin = seats.length;
          } else {
            currentMin = Math.min(currentMin, seats.length);
          }
        }

        if (seats.length === result.length) {
          foundBest = true;
          return true
        }
      } else {
        return false
      }

    })
    return result;
  }

  updateSeatDetails(seats: string[], cartId: string) {
    const seatsCopy: Seat[] = this.seats;

    for (const seat of seatsCopy) {
      if (seats.includes(seat.code)) {
        seat.status = 3;
        seat.cartId = cartId;
      }
    }

    return seatsCopy;
  }

  existingReservation(cartId: string) {
    let result: string[] = [];

    for (const seat of this.seats) {
      if ('cartId' in seat && seat.cartId === cartId) {
        result.push(seat.code);
      }
    }

    return result;
  }
}

export {
  Seat,
  SeatService
}
