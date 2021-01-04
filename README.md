# Documentation

Web application that allows a user to choose their car from a directory of registered cars.


## Scripts

To start the local dev server:

```bash
npm start
```

To run the api server

```bash
node apiserver/server.js
```

## Main problems the code solution is trying to solve:

- Manage different scenarios for the app's behavior
- Not able to fetch data from API endpoint as its call fails with faulty response from the server
- Reduced availability of vehicles and cars results of each make/ model in cars directory
- Catching errors and delivering correct to each of such cases corresponding UI
- Improve and add performance optimisation to prevent unnecessary Re-rendering of Child Components
