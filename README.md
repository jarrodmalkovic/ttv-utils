[![Netlify Status](https://api.netlify.com/api/v1/badges/538e1071-834d-4a60-824a-d3a717cd5a0f/deploy-status)](https://app.netlify.com/sites/eager-ride-1bfc9d/deploys)

# TTVUtils

A web app providing chat utilties for twitch.tv

## Table of contents

- [Run Locally](#run-locally)
- [Technologies](#technologies)
- [License](#license)

## Run Locally

### Clone

- Clone this repo to your local machine using `https://github.com/jarrodmalkovic/ttv-utils.git`

### Install dependencies

- Install server dependencies

```bash
npm install
```

- Install client dependencies

```bash
cd client
npm install
```

### Setting up Proccess Environment Variables

- Make a new file with the name .env in the root folder. It should contain values for these 2 variables: `PORT`,`MONGO_URI`.

### Run both Express & React from root

```bash
npm run dev
```

## Technologies

Project is created with:

- Node.js, MongoDB, React, Redux, Material-UI

## License

This project is licensed under the MIT License
