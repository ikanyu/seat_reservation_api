
#  seat_reservation_api

##  Intro

This repository consists of 1 API endpoint which returns best available seats
1. When the requested seat quantity is found, updated the data with cardId and change the status of the tickets to reserved

## Background
The data of this API endpoint reads from a file which is available in `/data/seats.json`. `seats-sample.json` also exists in the same folder as it is used to revert back `seats.json` with contents in `seats-sample.json` after running the test.

## Requirements
Return the best seat if there's a better seat options available

1st Requirement
```
1st row 5 seats
2nd row 2 seats

=> return 2nd row with 2 seats
```

2nd Requirement
```
Request with same cartId

=> return the previously reserved seats of the cartId
```


##  Setup

You can install the required dependencies by running the follow command

```
npm install

```

To start the server, run

```
npm run serve
```

To run the test cases, spin up the server and run the test cases.

```
npm run serve
npm test
```



##  API Endpoint

```http
GET /seats/${cartId}/qty/${qty}
```


|Status| Parameter | Response Body Example |
|--|--|--|
| 200 | cartId: card ID of the user <br/> qty: amount of seats requested by user|<code>{"data": ["seat-S0-B-2", "seat-S0-B-3"]}</code> |

