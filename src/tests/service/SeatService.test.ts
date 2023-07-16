// import SeatService from "../../service/SeatService";
import { Seat, SeatService } from "../../service/SeatService";

describe("SeatService", () => {
  let service: SeatService;
  let jsonData: Seat[];

  beforeEach(() => {
    jsonData = [
      { block: 1, code: 'seat-S0-A-1', seq: 1, status: 2 },
      { block: 1, code: 'seat-S0-A-2', seq: 2, status: 1 },
      { block: 1, code: 'seat-S0-A-3', seq: 3, status: 1 }, // available
      { block: 1, code: 'seat-S0-A-4', seq: 4, status: 1 }, // available
      { block: 2, code: 'seat-S0-B-1', seq: 1, status: 1 }, // available
      { block: 2, code: 'seat-S0-B-2', seq: 2, status: 1 }, // available
    ];
    service = new SeatService(JSON.parse(JSON.stringify(jsonData)));
  })

   describe("filterBlockByAvailable", () => {
     test('returns the available seats in a specific block', () => {
       expect(service.filterBlockByAvailable()).toEqual(
         {
           1: ["seat-S0-A-2", "seat-S0-A-3", "seat-S0-A-4"],
           2: ["seat-S0-B-1", "seat-S0-B-2"]
         }
       );
     })
   })

  describe("bestAvailableSeats", () => {
    test('returns the block with least empty seats', () => {
      expect(service.getBestAvailableSeats(2)).toEqual(["seat-S0-B-1", "seat-S0-B-2"]);
    })

    test('returns the block with exact seats requested, requested: 3, empty seat of that row: 3', () => {
      expect(service.getBestAvailableSeats(3)).toEqual(
        ["seat-S0-A-2", "seat-S0-A-3", "seat-S0-A-4"]
      );
    })

    test("returns empty array if requested seat qty is more than qty", () => {
      expect(service.getBestAvailableSeats(5)).toEqual([]);
    })
  });

  describe("updateSeatDetails", () => {
    test("returns the updated data with the cartId and status to reserved", () => {
      const seatToUpdate: string[] = ["seat-S0-B-1"];
      const cartId: string = "abc123";

      expect(service.updateSeatDetails(seatToUpdate, cartId)).toEqual([
        { block: 1, code: 'seat-S0-A-1', seq: 1, status: 2 },
        { block: 1, code: 'seat-S0-A-2', seq: 2, status: 1 },
        { block: 1, code: 'seat-S0-A-3', seq: 3, status: 1 },
        { block: 1, code: 'seat-S0-A-4', seq: 4, status: 1 },
        { block: 2, code: 'seat-S0-B-1', seq: 1, status: 3, cartId: cartId },
        { block: 2, code: 'seat-S0-B-2', seq: 2, status: 1 }
      ]);
    });

    test("returns the same data if passed seat code is not available in the data", () => {
      const seatToUpdate: string[] = ["seat-S123123"];
      const cartId: string = "cde123";

      expect(service.updateSeatDetails(seatToUpdate, cartId)).toEqual(jsonData);
    })
  });

  describe("existingReservation", () => {
    test("returns the existing information of a cartId if previously seat was reserved", () => {
      const seatToUpdate: string[] = ["seat-S0-B-1"];
      const cartId: string = "abc123";

      service.updateSeatDetails(seatToUpdate, cartId);

      expect(service.existingReservation(cartId)).toEqual(["seat-S0-B-1"]);
    });

    test("returns the empty array if cartId given is not found in data", () => {
      const cartId: string = "abc123";

      expect(service.existingReservation(cartId)).toEqual([]);
    });
  })
})
