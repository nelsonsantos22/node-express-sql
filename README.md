# node-sql-server
https://blog.logrocket.com/node-js-express-js-mysql-rest-api-example/
https://docs.google.com/document/d/1JsIYtt42tlMgGyANTT5cN1uaMA7VxI2M5I0t4yHm3nU/edit#heading=h.pmz01xhrnq88

Node.js, Express.js, and MySQL: A step-by-step REST API example
February 23, 2021  11 min read 

Node.js, Express.js, and MySQL: A Step-by-step REST API Example
Node.js is generally coupled with MongoDB and other NoSQL databases, but it performs well with relational databases like MySQL, too. In case you want to write a new microservice with Node.js for an existing database, it’s highly likely that the existing database will be the world’s most popular open-source database, MySQL.

In this tutorial, we will see how we can build a REST API with MySQL as the database and Node.js as our language. To make our task easier, we will use the Express.js framework. Let’s get cracking!

Prerequisites
Below are some assumptions we are making before we get into the code:

You have a good understanding of how MySQL and relational databases work in general.
You have basic knowledge of Node.js and some understanding of the Express.js framework.
You are aware of what REST (representational state transfer) APIs are and how they generally function.
You know what CRUD (create, read, update, delete) is and how it relates to the HTTP methods GET, POST, PUT, and DELETE.
All the code will be done on a Mac with Node 14 LTS installed. If you want, you can try to use Node.js and Docker and docker-compose for a better developer experience.

MySQL quick intro and setup
MySQL is one of the most popular databases in the world, if not the single most popular. Per the 2020 Stack Overflow survey, it was the best-loved database, with more than 55 percent of respondents using it. The community edition is available freely, and it is supported by a large and active community, too.

MySQL is a feature-packed relational database first released in 1995. It runs on all major operating systems like Linux, Windows, and macOS. Because of its features and its cost-effectiveness, it is used by big enterprises and new startups alike.

For our example programming languages REST API, rather than setting up a local MySQL server, we will use a free MySQL service. We will be using db4free.net to host our testing MySQL database.

Register on FreeDb.tech
You can register on Freedb.tech to get your free MySQL 8.0 database up and running by doing the following steps.

First, go to the Freedb signup page, fill in the details like below, and click Sign Up:

Freedb.tech signup page display
You will get an email to verify your email address. After you click that link, you can create a database as follows:

Create Database Visual Freed.b
After you click Create Database, provided the DB name is unique, it will be created. You can try using your name to keep it unique. If all goes well, you will see something like below, with all the credentials to connect to your newly created database:

Create Database Output Credentials
Copy the username, password, and database name — we will use them in the next step. Then, click on the Visit phpMyAdmin button.

Subsequently, in the phpMyAdmin login, use the username and password from the previous screen and click Go, like below.:

Visit-phpMyAdmin-login-screen
Create the programming languages table
Great, your empty database has been created. Now let’s add the programming_languages table. To do that, click on the database name on the left; for me, it was freedbtech_language. Then click SQL on the top menu (second link after Structure) and put the following CREATE TABLE SQL in the text area:

`CREATE TABLE `programming_languages`
(
  `id`            INT(11) NOT NULL auto_increment ,
  `name`          VARCHAR(255) NOT NULL ,
  `released_year` INT NOT NULL ,
  `githut_rank`   INT NULL ,
  `pypl_rank`     INT NULL ,
  `tiobe_rank`    INT NULL ,
  `created_at`    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  `updated_at`    DATETIME on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
  PRIMARY KEY (`id`),
  UNIQUE `idx_name_unique` (`name`(255))
)
engine = innodb charset=utf8mb4 COLLATE utf8mb4_general_ci;`

After that, click the Go button, as below:

PhpMyAdmin Go Button Output Freedbtech Language
It will come back with a green check box and a message like MySQL returned an empty result set (i.e. zero rows).

Hurray! We have created a table called programming_languages with eight columns. It has a primary key called id, which is an internet and auto-increment. The name column is unique.

We also added the released_year for the programming language. We have three columns to input the rank of the programming language from:

GitHut – GitHub language stats for Q4 2020
PYPL – The PopularitY of Programming Language Index
TIOBE index
The created_at and updated_at columns are dates to keep a track of when the rows were created and updated. Mainly, we want to create an API of the most popular programming languages as posted in the above three sources.

Add 16 demo rows
Next, we will insert 16 of the popular programming languages in our programming_languages table. Click the same SQL link on the top, and copy/paste the SQL below:

`INSERT INTO programming_languages(id,name,released_year,githut_rank,pypl_rank,tiobe_rank) 
VALUES 
(1,'JavaScript',1995,1,3,7),
(2,'Python',1991,2,1,3),
(3,'Java',1995,3,2,2),
(4,'TypeScript',2012,7,10,42),
(5,'C#',2000,9,4,5),
(6,'PHP',1995,8,6,8),
(7,'C++',1985,5,5,4),
(8,'C',1972,10,5,1),
(9,'Ruby',1995,6,15,15),
(10,'R',1993,33,7,9),
(11,'Objective-C',1984,18,8,18),
(12,'Swift',2015,16,9,13),
(13,'Kotlin',2011,15,12,40),
(14,'Go',2009,4,13,14),
(15,'Rust',2010,14,16,26),
(16,'Scala',2004,11,17,34);`
It should say something like 16 rows inserted.

I collected the programming languages’ rank from all the three above sources: GitHut, PYPL, and the TIOBE Index. The data collected is tabled in the above bulk insert statement. This creates 16 rows for the above 16 programming languages in the table that we just created. We will use this in later steps when we fetch data for the GET API endpoint.

If we click on the programming_languages table visible on the left, we will see the rows that we just added as follows:

Programming Languages Table New Rows Visual
In the next step, we will set up Express.js for our most popular programming languages REST API with Node.js and MySQL.

Set up Express.js for REST API
To set up a Node.js app with an Express.js server, we’ll create a directory for our project to reside in:

mkdir programming-languages-api && cd programming-languages-api
Then we can do a npm init -y to create a package.json file like below:

`{
  "name": "programming-langugages-api",
  "version": "1.0.0",
  "description": "A demo REST API with Node.js Express.js and MySQL for most popular programming languages",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/geshan/programming-langugages-api.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/geshan/programming-langugages-api/issues"
  },
  "homepage": "https://github.com/geshan/programming-langugages-api#readme"
}`


For our ease, all the step-by-step code will be as a sequence of pull requests. Consequently, we will install Express.js by running npm i --save express. This adds Express as a dependency in the package.json file.

Next, we will create a slim server in the index.js file. It will print an ok message on the main path /, like below:

`const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  res.json({'message': 'ok'});
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});`


We need to take note of some things at this juncture:

We are using the built-in body-parser middleware to parse JSON we will be using in the next steps.
We are also utilizing the bodyParser.urlencoded function to parse the URL encoded body.
The app will run on port 3000 if the PORT is not provided as an environment variable.
We can run the server with node index.js and hit http://localhost:3000 to see {message: "ok"} as output.

Project structure
We will structure our project in the following manner, so that the files are laid out logically in folders:

Node.js App Project Structure Folder Layout
Let’s have a quick look at the structure of the popular programming languages API we are going to build:

config.js will have configurations like the database credentials and rows per page we want to show when we paginate results.
helper.js is the home for any helper functions like calculating offset for pagination.
The routes/programmingLanguages.js file will act as the glue between the URI and the corresponding function in the services/programmingLanguages.js service.
The services folder will house all our services. One of them is db.js, used to talk with the MySQL database.
Another service is programmingLanguages.js, which will have methods like getMultiple, create, etc. to get and create the programming language resource. Basic mapping of the URI and the related service function will look like below:


GET /programming-languages → getMultiple()
POST /programming-languages → create()
PUT /programming-languages/:id → update()
DELETE /programming-languages/:id → remove()

Now let’s code our GET programming languages API with pagination.

GET popular programming languages
To create our GET programming languages API, we will need to link up our Node.js server with MySQL. To do this, we will use the mysql2 npm package. We can install the mysql2 package with npm i --save mysql2 command on the project root.

Next, we will create the config file on the root of the project with the following contents:

`const env = process.env;

const config = {
  db: { /* don't expose password or any sensitive info, done only for demo */
    host: env.DB_HOST || 'freedb.tech',
    user: env.DB_USER || 'freedbtech_geshan-lr',
    password: env.DB_PASSWORD || 'G2VjjQ5d47zyjqX',
    database: env.DB_NAME || 'freedbtech_language',
  },
  listPerPage: env.LIST_PER_PAGE || 10,
};


module.exports = config;`

Consequently, we will create the helper.js with the code as below:

`function getOffset(currentPage = 1, listPerPage) {
  return (currentPage - 1) * [listPerPage];
}

function emptyOrRows(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}

module.exports = {
  getOffset,
  emptyOrRows
}
Next, we do the fun part of adding the route and linking it up with the services. First, we will connect to the database and enable running queries on the database in the services/db.js:

const mysql = require('mysql2/promise');
const config = require('../config');

async function query(sql, params) {
  const connection = await mysql.createConnection(config.db);
  const [results, ] = await connection.execute(sql, params);

  return results;
}

module.exports = {
  query
}`


Consequently, we will write up the services/programmingLanguage.js file that acts as the bridge between the route and the database as follows:

`const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, name, released_year, githut_rank, pypl_rank, tiobe_rank 
    FROM programming_languages LIMIT ?,?`, 
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

module.exports = {
  getMultiple
}`


After that, we create the routes file in routes/programmingLanguages.js, which looks like this:

const express = require('express');
const router = express.Router();
const programmingLanguages = require('../services/programmingLanguages');

`/* GET programming languages. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await programmingLanguages.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});

module.exports = router;`


The final piece to get our GET programming languages endpoint to come alive is to wire up the route in the index.js file as follows:

`const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const programmingLanguagesRouter = require('./routes/programmingLanguages');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  res.json({'message': 'ok'});
})

app.use('/programming-languages', programmingLanguagesRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});


  return;
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});`


The two main changes in our entrypoint index.js file are:

`const programmingLanguagesRouter = require('./routes/programmingLanguages');`

And linking up the route /programming-languages to the router we just created as follows:

`app.use('/programming-languages', programmingLanguagesRouter);`

We have also added an error handler middleware to handle any errors and provide a proper status code and message in case of an error.

After adding the GET endpoint, when we run our app again with node index.js and hit the browser with http://localhost:3000/programming-languages, we will see an output like this:

Get Endpoint with Node Index.js Output
Depending on the extensions you have installed on your browser, you might see the output a bit differently.

Another good thing is pagination for this GET API has already been implemented — try http://localhost:3000/programming-languages?page=2 to see languages 11–16.

This pagination is possible because of the getOffset function in helper.js and the way we run the SELECT query in services/programmingLanguage.js. I will leave you with some time to scrutinize the above code to get a better understanding of how it is pieced together.

In the next step, we will code up the create programming-language POST API.

POST a new programming language
To create a POST programming language API in the /programming-languages endpoint we will add code to the service and the routes file. This POST API will enable creating a new popular programming language. In the service method, we will get the name, the released year, and other ranks from the request body and insert them into the programming_languages table.

Below is the code for the services/programmingLanguages.js file:

`async function create(programmingLanguage){
  const result = await db.query(
    `INSERT INTO programming_languages 
    (name, released_year, githut_rank, pypl_rank, tiobe_rank) 
    VALUES 
    (?, ?, ?, ?, ?)`, 
    [
      programmingLanguage.name, programmingLanguage.released_year,
      programmingLanguage.githut_rank, programmingLanguage.pypl_rank,
      programmingLanguage.tiobe_rank
    ]
  );

  let message = 'Error in creating programming language';

  if (result.affectedRows) {
    message = 'Programming language created successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create
}`


For the above function to be accessible, we need to add a route to link it up in the routes/prgrammingLanguages.js file, as follows:

`/* POST programming language */
router.post('/', async function(req, res, next) {
  try {
    res.json(await programmingLanguages.create(req.body));
  } catch (err) {
    console.error(`Error while creating programming language`, err.message);
    next(err);
  }
});

module.exports = router;`


Now we have devised a way to add new popular programming languages, too. Next up, we will add a path to update any existing programming language.

PUT to update an existing programming language
To update an existing programming language, we will use the /programming-languages/:id endpoint, where we will get the data to update the language. To update a programming language, we will run the UPDATE query based on the data we got in the request.

It is beneficial to understand that PUT is an idempotent action, which means if the same call is made over and over again, it will produce the exact same results. To enable updating existing records, we will add the following code to the programming language service:

`async function update(id, programmingLanguage){
  const result = await db.query(
    `UPDATE programming_languages 
    SET name=?, released_year=?, githut_rank=?, 
    pypl_rank=?, tiobe_rank=? 
    WHERE id=?`, 
    [
      programmingLanguage.name, programmingLanguage.released_year,
      programmingLanguage.githut_rank, programmingLanguage.pypl_rank,
      programmingLanguage.tiobe_rank, id
    ]
  );

  let message = 'Error in updating programming language';

  if (result.affectedRows) {
    message = 'Programming language updated successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create,
  update
}`


Again, to wire up the code with the PUT endpoint, we will add the code as below to the programming languages route file just above module.exports = router;:

`/* PUT programming language */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await programmingLanguages.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating programming language`, err.message);
    next(err);
  }
});`


Now we have the ability to update any existing programming language — for instance, we can update a language’s name if we see a typo. Next, we will add the functionality to delete an existing programming language.

DELETE a programming language
At this juncture, we are able to create a new programming language and update one, too. Next, we will add some code to be able to delete an existing programming language. We will use the /programming-languages/:id path with the HTTP DELETE method.

Below is the code we’ll add to enable the delete functionality:

`async function remove(id){
  const result = await db.query(
    `DELETE FROM programming_languages WHERE id=?`, 
    [id]
  );

  let message = 'Error in deleting programming language';

  if (result.affectedRows) {
    message = 'Programming language deleted successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create,
  update,
  remove
}`


Once again, to link up the service with the route, we will add the following code to the routes/programmingLanguages.js file:

`/* DELETE programming language */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await programmingLanguages.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting programming language`, err.message);
    next(err);
  }
});`


As you have now built a great demo API, you might want to host it in one of the free Node.js hosting services.

Testing the APIs
After you have the Node.js Express server running with node index.js, you can test all the above API endpoints. To create a new programming language — let’s go with Dart — run the following curl command:

`curl -i -X POST -H 'Accept: application/json' \
    -H 'Content-type: application/json' http://localhost:3000/programming-languages \
    --data '{"name":"dart", "released_year": 2011, "githut_rank": 13, "pypl_rank": 20, "tiobe_rank": 25}'`

This will result in the following output:

`HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 55
ETag: W/"37-3mETlnRrtfrms6wlAjdgAXKq9GE"
Date: Mon, 01 Feb 2021 11:20:07 GMT
Connection: keep-alive

{"message":"Programming language created successfully"}`

You can remove the X-Powered-By header and add other security response headers by using Express.js Helmet. It will be a great addition to improve the API’s security.

For now, let’s look at the cURL to update the GitHut rank of Dart from 13 to 12:

`curl -i -X PUT -H 'Accept: application/json' \
    -H 'Content-type: application/json' http://localhost:3000/programming-languages/17 \
    --data '{"name":"dart", "released_year": 2011, "githut_rank": 12, "pypl_rank": 20, "tiobe_rank": 25}'`

It will give an output like below:

`HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 55
ETag: W/"37-0QPAQsRHsm23S9CNV3rPa+AFuXo"
Date: Mon, 01 Feb 2021 11:40:03 GMT
Connection: keep-alive

{"message":"Programming language updated successfully"}`


To test out the DELETE API, you can use the following cURL to delete Dart with ID 17:

`curl -i -X DELETE -H 'Accept: application/json' \
    -H 'Content-type: application/json' http://localhost:3000/programming-languages/17`

It will result in the following output:

`HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 55
ETag: W/"37-aMzd+8NpWQ09igvHbNLorsXxGFo"
Date: Mon, 01 Feb 2021 11:50:17 GMT
Connection: keep-alive

{"message":"Programming language deleted successfully"}`


If you are more used to a visual interface to do the testing for instance Postman you can import the cURL commands into Postman. Personally, I think cURL is used universally compared to Postman or any other GUI tool.

Further considerations
If this was a real-life API (not a demo one), I would strongly consider the following:

Use a robust validation library like Joi to validate the input precisely, e.g., the name of the programming language is required and it doesn’t already exist in the database, etc.
Add Helmet.js with Express.js to bump up the security depending on whether this is a public-facing or an internal API.
It would be great to use a Node.js logging library like Winston to streamline the logs in a more manageable way.
Following the Express.js production best practices will also be very beneficial.
Last but not least, using Docker for the Node.js application would also be highly advisable.
Just a reminder that all the code is available as an open-source GitHub repository for your reference.

Conclusion
The above example REST API for popular programming languages serves as a good starting point. We now have a functioning API server with Node.js and MySQL. In this tutorial, we learned how to set up MySQL on a free service, and how to create an Express.js server that can handle various HTTP methods in connection to how it translates to SQL queries.

This should be a good foundation for you to build a real-world, production-ready REST API wherein you can practice the further considerations listed above. I hope you go on and build amazing REST APIs in the future.

200’s only  Monitor failed and slow network requests in production
Deploying a Node-based web app or website is the easy part. Making sure your Node instance continues to serve resources to your app is where things get tougher. If you’re interested in ensuring requests to the backend or third party services are successful, try LogRocket. LogRocket Network Request Monitoringhttps://logrocket.com/signup/
LogRocket is like a DVR for web and mobile apps, recording literally everything that happens while a user interacts with your app. Instead of guessing why problems happen, you can aggregate and report on problematic network requests to quickly understand the root cause.

LogRocket instruments your app to record baseline performance timings such as page load time, time to first byte, slow network requests, and also logs Redux, NgRx, and Vuex actions/state. Start monitoring for free.
