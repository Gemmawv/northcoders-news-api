## Northcoders News API
A RESTful API for Northcoders News, a news aggregation site.
This API has been built using Node.js, Express.js, MongoDB and Mongoose.

You can view the API endpoints (listed below) here: https://nameless-sands-36123.herokuapp.com. For example, https://nameless-sands-36123.herokuapp.com/api/articles will return all of the articles.
Alternatively, you can run this project locally by following the installation and setup instructions below.

This repo contains all of the back-end code for this project. The code for the front-end can be viewed here: https://github.com/Gemmawv/northcoders-news


# Installation

1. Make sure you have node installed.
``` javascript 
node -v
```
This command will tell you the version of node you have, if you have it installed already. If you do not have node installed, follow the installation instructions found here: https://nodejs.org/en/download/package-manager/.


2. Make sure you have npm installed
``` javascript 
npm -v
```
This command will tell you the version of npm you have, if you have it installed already. If you do not have npm installed, first make sure you have node installed (as described above), then run:
``` javascript 
npm install npm
```

3. Install MongoDB if you do not already have it. 
Installation instructions can be found here: https://docs.mongodb.com/manual/installation/


# Project setup

1. To clone the project and install dependencies, open a terminal and navigate to the folder where you wish to save the project. Run the following command:
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
npm run dev
```

5. Open another terminal, navigate to the project folder and seed the database with the main seed file by running:
``` javascript 
npm run seed:dev
```


# API endpoints
Once you have installed and set up the project, you may view the API endpoints in your browser on http://localhost:4000. For example, http://localhost:4000/api/articles will return all of the articles. Below is a list of all available endpoints.

| Route |   |
| ------|---|
| `GET /api/topics` | Get all the topics |
| `GET /api/topics/:topic_id/articles` | Return all the articles for a certain topic |
| `GET /api/articles` | Returns all the articles |
| `GET /api/articles/:article_id` | Returns a specific article |
| `GET /api/articles/:article_id/comments` | Get all the comments for a individual article |
| `POST /api/articles/:article_id/comments` | Add a new comment to an article. This route requires a JSON body with a comment key and value pair e.g: {"comment": "This is my new comment"} |
| `PUT /api/articles/:article_id` | Increment or Decrement the votes of an article by one. This route requires a vote query of 'up' or 'down' e.g: /api/articles/:article_id?vote=up |
| `PUT /api/comments/:comment_id` | Increment or Decrement the votes of a comment by one. This route requires a vote query of 'up' or 'down' e.g: /api/comments/:comment_id?vote=down |
| `DELETE /api/comments/:comment_id` | Deletes a comment |
| `GET /api/users/:username` | Returns a JSON object with the profile data for the specified user. |


# Running tests
1. To run tests, open a terminal, navigate to the project folder and run:
``` javascript 
npm test
```
