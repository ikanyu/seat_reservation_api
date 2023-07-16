
#  seat_reservation_api

##  Intro

This repository consists of 1 API endpoint which returns best available seats
1. When the requested seat quantity is found, updated the data with cardId and change the status of the tickets to reserved

## Requirements
Return the best seat if there's a better seat options available

```
1st row 5 seats
2nd row 2 seats

=> return 2nd row with 2 seats
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

To run the test cases, run

```

npm test

```



##  API Endpoint

```http

GET /seats/${cartId}/qty/${qty}

```


|Status| Parameter | Response Body Example |
|--|--|--|
| 200 | cartId: card ID of the user <br/> qty: amount of seats requested by user|<code>{"data": ["seat-S0-B-2", "seat-S0-B-3"]}</code> |

