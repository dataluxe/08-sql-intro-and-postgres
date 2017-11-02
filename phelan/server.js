'use strict';

// DONE: Install and require the NPM Postgres package 'pg' into your server.js, and ensure that it is then listed as a dependency in your package.json

const pg = require('pg');
const fs = require('fs');
const express = require('express');

// REVIEWED: Require in body-parser for post requests in our server. If you want to know more about what this does, read the docs!
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();

// DONE: Complete the connection string (conString) for the URL that will connect to your local Postgres database.

const conString = 'postgres://postgres:qwer@localhost:3000/postgres';


// DONE: Our pg module has a Client constructor that accepts one argument: the conString we just defined.
// This is how it knows the URL and, for Windows and Linux users, our username and password for our database when client.connect() is called below. Thus, we need to pass our conString into our pg.Client() call.

const client = new pg.Client(conString);

// REVIEWED: Use the client object to connect to our DB.
client.connect();


// REVIEWED: Install the middleware plugins so that our app can use the body-parser module.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./public'));


// REVIEWED: Routes for requesting HTML resources
app.get('/new', (request, response) => {
  // COMMENTED: What number(s) of the full-stack-diagram.png image correspond to the following line of code? Which method of article.js is interacting with this particular piece of `server.js`? What part of CRUD is being enacted/managed by this particular piece of code?
  // Data incoming to this route represent a #2-leg 'GET'-type request. The line below respresents a response to the 'GET' request sent on the #5-leg.
  response.sendFile('new.html', {root: './public'});
});


// REVIEWED: Routes for making API calls to use CRUD Operations on our database
app.get('/articles', (request, response) => {
  // COMMENTED: What number(s) of the full-stack-diagram.png image correspond to the following line of code? Which method of article.js is interacting with this particular piece of `server.js`? What part of CRUD is being enacted/managed by this particular piece of code?
  // Client.query sets off a #3 communication - the fact that this query is a SELECT satisfies the SERVER endpoint's purpose as a GET verb.
  // The 'then' promise is the action takesn in response to a #4 communication; which is the action for this server to take once the DATABASE returns informations to this SERVER.
  // That action is a #5 communication, whereupon, in this code, the number of rows returned from the database's query will be sent as an int back to the BROWSER.
  client.query('SELECT * FROM articles')
    .then(function(result) {
      response.send(result.rows);
    })
    .catch(function(err) {
      console.error(err)
    })
});

app.post('/articles', (request, response) => {
  // COMMENTED: What number(s) of the full-stack-diagram.png image correspond to the following line of code? Which method of article.js is interacting with this particular piece of `server.js`? What part of CRUD is being enacted/managed by this particular piece of code?
  // This client.query is a #3-leg 'POST'-type communication, wherein this SERVER sends a request to insert NEW ROWS into the DATABASE....
  //.... whereupon the 'then' promise will send a string "insert complete" back to the BROWSER.
  client.query(
    `INSERT INTO
    articles(title, author, "authorUrl", category, "publishedOn", body)
    VALUES ($1, $2, $3, $4, $5, $6);
    `,
    [
      request.body.title,
      request.body.author,
      request.body.authorUrl,
      request.body.category,
      request.body.publishedOn,
      request.body.body
    ]
  )
    .then(function() {
      response.send('insert complete')
    })
    .catch(function(err) {
      console.error(err);
    });
});

app.put('/articles/:id', (request, response) => {
  // COMMENTED: What number(s) of the full-stack-diagram.png image correspond to the following line of code? Which method of article.js is interacting with this particular piece of `server.js`? What part of CRUD is being enacted/managed by this particular piece of code?
  // This client.query sends a #3-leg PUSH-type request to the DATABASE. Once the DATABASE sends a response along the #4-leg, the 'then' promise below will send a string over the #5-leg back to the BROWSER with the string "update complete".
  client.query(
    `UPDATE articles
    SET
      title=$1, author=$2, "authorUrl"=$3, category=$4, "publishedOn"=$5, body=$6
    WHERE article_id=$7;
    `,
    [
      request.body.title,
      request.body.author,
      request.body.authorUrl,
      request.body.category,
      request.body.publishedOn,
      request.body.body,
      request.params.id
    ]
  )
    .then(() => {
      response.send('update complete')
    })
    .catch(err => {
      console.error(err);
    });
});

app.delete('/articles/:id', (request, response) => {
  // COMMENTED: What number(s) of the full-stack-diagram.png image correspond to the following line of code? Which method of article.js is interacting with this particular piece of `server.js`? What part of CRUD is being enacted/managed by this particular piece of code?
  // This client.query() respresent a #4-leg DELETE-type request from the SERVER to the DATABASE - this time, the request is sent with a parameter at the end, representing the ID of the item (in this case, and 'article') to be deleted.
  // The following 'then' promise merely sends a #5-leg response from the SERVER to the BROWSER with the string 'Delete complete.'
  client.query(
    `DELETE FROM articles WHERE article_id=$1;`,
    [request.params.id]
  )
    .then(() => {
      response.send('Delete complete')
    })
    .catch(err => {
      console.error(err);
    });
});

app.delete('/articles', (request, response) => {
  // COMMENTED: What number(s) of the full-stack-diagram.png image correspond to the following line of code? Which method of article.js is interacting with this particular piece of `server.js`? What part of CRUD is being enacted/managed by this particular piece of code?
  // Again, this client.query() sends a #3-leg DELETE-type request from the SERVER to the DATABASE - however, this time, it does not send and article's id along with that request, because this endpoint is intended to wipe the entire article table in the database.
  // The .then promise after it returns a simple string response 'Delete Complete' along the #5 leg back to the browser.
  client.query(
    'DELETE FROM articles;'
  )
    .then(() => {
      response.send('Delete complete')
    })
    .catch(err => {
      console.error(err);
    });
});

// COMMENTED: What is this function invocation doing?
// loadDB() fires the loadDB function, enumerated below. loadDB() is a function which sends a little select request from this SERVER to the DATABASE, creating the 'articles' table if it does not already exist. Theere is a primise to catch erroes from that request, and a main promise which simply fires the 'LoasArticles' function.
//The loadArticles function sends another query to the Database asking for the count of entries in the article table. IF there are results from that request, indicating that there are entries already in that table, then the function just exits without doing anything. IF there are NOT entries in the Article table, the .this promise code then opens the 'hackerIpsum.JSON' file, and iterates over each line, crafting and sending a SQL INSERT query to the DATABASE, inserting each line from the file (representing an Article) into the table, whereupon each row in the table will also represent and Article.
loadDB();

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});


//////// ** DATABASE LOADER ** ////////
////////////////////////////////////////
function loadArticles() {
  // COMMENT: What number(s) of the full-stack-diagram.png image correspond to the following line of code? Which method of article.js is interacting with this particular piece of `server.js`? What part of CRUD is being enacted/managed by this particular piece of code?
  // This client.query is a #3-leg, GET/READ/SELECT-type request brom the SERVER to the DATABASE.
  client.query('SELECT COUNT(*) FROM articles')
    .then(result => {
    // REVIEWED: result.rows is an array of objects that Postgres returns as a response to a query.
    // If there is nothing on the table, then result.rows[0] will be undefined, which will make count undefined. parseInt(undefined) returns NaN. !NaN evaluates to true.
    // Therefore, if there is nothing on the table, line 158 will evaluate to true and enter into the code block.
      if(!parseInt(result.rows[0].count)) {
        fs.readFile('./public/data/hackerIpsum.json', (err, fd) => {
          JSON.parse(fd.toString()).forEach(ele => {
            client.query(`
              INSERT INTO
              articles(title, author, "authorUrl", category, "publishedOn", body)
              VALUES ($1, $2, $3, $4, $5, $6);
            `,
              [ele.title, ele.author, ele.authorUrl, ele.category, ele.publishedOn, ele.body]
            )
          })
        })
      }
    })
}

function loadDB() {
  // COMMENTED: What number(s) of the full-stack-diagram.png image correspond to the following line of code? Which method of article.js is interacting with this particular piece of `server.js`? What part of CRUD is being enacted/managed by this particular piece of code?
  // This client.query represents a #3-leg POST(CREATE)-type request from this SERVER to the DATABASE.
  // Since this request was from the SERVER itself to the DATABASE (instead of processing and passing thrugh a request from the BROWSER), the .then promise does not send a request as ususally happens in ouu other code blocks - instead, the 'then' fires off 'loadArticles'
  client.query(`
    CREATE TABLE IF NOT EXISTS articles (
      article_id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      author VARCHAR(255) NOT NULL,
      "authorUrl" VARCHAR (255),
      category VARCHAR(20),
      "publishedOn" DATE,
      body TEXT NOT NULL);`
  )
    .then(() => {
      loadArticles();
    })
    .catch(err => {
      console.error(err);
    });
}
