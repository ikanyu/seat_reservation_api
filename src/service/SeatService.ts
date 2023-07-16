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

export default class SeatService {
  seats: Seat[];
  // convertedSeats: ConvertedSeat;
  convertedSeats: any;
  availableSeats!: AvailableSeat;

  constructor(seats: Seat[]) {
    this.seats = seats;
    // this.availableSeats = this.filterBlockByAvailable();
    // this.convertedSeats = this.convertToBlock();
  }

  convertToBlock() {
    const converted = groupBy(this.seats, seat => seat.block);

    return converted;
  }

  filterBlockByAvailable() {
    const filtered = this.seats.filter(seat => seat.status === 1);
    // const converted = groupBy(filtered, seat => seat.block);

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

  getBestAvailableTicket(qty: number) {
    this.availableSeats = this.filterBlockByAvailable();
    console.log("available seats");
    console.log(this.availableSeats);

    let currentMin: number = 0;
    let result: number[] = [];
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
}
