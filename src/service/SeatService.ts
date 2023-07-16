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

    let currentMin: number = 0;
    let result: number[] = [];
    let foundBest: Boolean = false;

    Object.entries(this.availableSeats).every(entry => {
      const [block, seats] = entry;
      console.log("==block");
      console.log(block);
      console.log("==seats");
      console.log(seats);

      if (seats.length >= qty) {
        let counter = 0;

        console.log("==current min");
        console.log(currentMin);
        if (currentMin === 0 || seats.length < currentMin) {
          result = [];
          for (let i = 0; i < seats.length; i++) {
            console.log("===result")
            console.log(result);
            console.log("===qty")
            console.log(qty);
            if (result.length === qty) {
              break;
            }
            result.push(seats[i]);
            counter = counter + 1;
          }

          if (currentMin === 0) {
            currentMin = seats.length;
          } else {
            currentMin = Math.min(currentMin, seats.length);
          }
        }
        console.log("--- result ---");
        console.log(result);
        if (seats.length === result.length) {
          console.log("found bestt");
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

// export default SeatService;
