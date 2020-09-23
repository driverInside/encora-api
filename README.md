
<!-- TABLE OF CONTENTS -->
## Table of Contents

* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
  * [Routes](#routes)

<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This project requires Node 10.16.3 version or later

### Installation

Clone this repo

```sh
git clone git@github.com:driverInside/encora-api.git
```

Install dependencies

```sh
yarn install
```

or

```sh
npm i
```

<!-- USAGE EXAMPLES -->
## Usage

In order to get any data from request the API, you must run the following script:

```sh
npx babel-node lib/import.js
```
or 

```sh
npm run import-db
```

Run the app:

```sh
yarn dev
```

Or

```sh
npm run dev
```

### Routes

GET all the Quotes
---

On a terminal run:

```sh
curl http://localhost:3000/quotes
```

GET a random quote
---

On a terminal run:

```sh
curl http://localhost:3000/quotes/random
```


GET a specific quote
---

On a terminal run:

```sh
curl http://localhost:3000/quotes/5f6aa4ce65adba74f9123b0e
```

Create a quote
---

On a terminal run:

```sh
curl http://localhost:3000/quotes \
     --header "Content-Type: application/json" \
     --data '{"quote": {"quote": "This is a sample quote", "author": "John Doe"}}' \ --request POST
```


