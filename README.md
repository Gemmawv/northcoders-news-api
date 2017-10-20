## Northcoders News API
A RESTful API for Northcoders News, a news aggregation site.
This API has been built using Node.js, Express.js, MongoDB and Mongoose.


# Installation

1. Make sure you have node installed.
``` javascript 
node -v
```
This command will tell you the version of node you have, if you have it installed already. If you do not have node installed, follow the installation instructions found here https://nodejs.org/en/download/package-manager/.


2. Make sure you have npm installed
``` javascript 
npm -v
```
This command will tell you the version of npm you have, if you have it installed already. If you do not have npm installed, first make sure you have node installed (as described above), then run
``` javascript 
npm install npm
```

3. Install MongoDB if you do not already have it. 
Installation instructions can be found here: https://docs.mongodb.com/manual/installation/


# Project setup

1. To clone the project and install dependencies, open a terminal and navigate to the folder where you wish to save the project. Run the command:
``` javascript 
git clone https://github.com/Gemmawv/northcoders-news-api
```

2. To install all project dependencies, navigate into the new folder and run:
``` javascript 
npm install
```

3. Open a terminal, navigate to the project folder and run:
``` javascript 
mongod
```

4. Open another terminal, navigate to the project folder and run:
``` javascript 
npm start
```

5. Open another terminal, navigate to the project folder and seed the database with the main seed file by running:
``` javascript 
node seed/seed.js
```

# Running tests
1. Open a terminal and run
``` javascript 
npm test
```
