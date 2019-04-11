# Period 2 Exams questions


Note: This description is too big for a single exam-question. It will be divided up into separate questions for the exam
## Node.js, Express + JavaScript Backend Testing

### Why would you consider a Scripting Language as JavaScript as your Backend Platform?

Acording to StackOverflow's [Most Popular Technologies](https://insights.stackoverflow.com/survey/2018#technology-programming-scripting-and-markup-languages), for the sixth year in a row, JavaScript is the most commonly used programming language and Node.js continues to be the most commonly used techonolgy in the "Frameworks, Libraries, and Tools" category.

The reason Node.js is one of the most commonly used frameworks is due to it's growing community and the fact that its package manager "npm", is now the largest software registry on the web.
![](https://i.imgur.com/xrNlRWA.png)

Developing with a scripting language like JavaScript is fairly simple and easy to understand, it is less cluttered and resource intensive.
Javascript is also currently the only scripting language that can run natively in your internet browser, which makes me believe it is the only good language for front-end development.

The major advantage with node.js as the backend is that javascript doesn't block input and output communication with the frontend, which means javascript can run in the background at the same time as the user is using the frontend, and it can read input and outputs simultaneously.
Another benefit to using javascript as the backend is single-threaded event loops, that is responsible for abstracting input and output from external requests. Speaking plainly, this means that Node initiates the event loop at the start, processes the input, and begins the order of operations.

### Explain Pros & Cons in using Node.js + Express to implement your Backend compared to a strategy using, for example, Java/JAX-RS/Tomcat
#### pros
1. Node.js can run right out of the box, without the use of a cms like tomcat
2. Node.js works well with other javascript based servers like mongoDB (NoSQL)
3. Speed and performance, node.js is just faster, period.

#### cons
1. Due to its asynchronous nature, Node.js relies heavily on callbacks, the functions that run after each task in the queue is finished. Keeping a number of queued tasks in the background, each with its callback can end in a callback hell, which is when people try to write JavaScript in a way where execution happens visually from top to bottom.
2. Many libraries and dependencies aren't necessarily future-proof so means they may become outdated in the future.

### Node.js uses a Single Threaded Non-blocking strategy to handle asynchronous task. Explain strategies to implement a Node.js based server architecture that still could take advantage of a multi-core Server.
We use event loops to synchronize functions (async), which allows functions to 'wait' for others functions to finish before they're called. This prevents blocking the main thread so they program won't stop running.

##### Solution 1:
API’s solves the problem, for example: Node can install a fetch module that makes fetching an async operation. File readings etc. are all built into node.

##### Solution 2:
Since the release of Node.js v10.5.0 there’s a new worker_threads (clusters) module available, which we can use to make multiple threads run at the same time at different cores.



### Explain briefly how to deploy a Node/Express application including how to solve the following deployment problems: Ensure that you Node-process restarts after a (potential) exception that closed the application Ensure that you Node-process restarts after a server (Ubuntu) restart Ensure that you can take advantage of a multi-core system Ensure that you can run “many” node-applications on a single droplet on the same port (80)
There are two solutions to make sure out Node-process restarts after a potential exception/crash.
The first one is to use a Process Manager. A Process Manager manages the 'starting' of our application, which means we no longer have to start the application manually. We can configure the Process Manager to automatically restart the application if a crash occurs.

Here is a list of popular Process Managers for Express 
1. Forever: A simple command-line interface tool to ensure that a script runs continuously (forever). Forever’s simple interface makes it ideal for running smaller deployments of Node.js apps and scripts.
2. PM2: A production process manager for Node.js applications that has a built-in load balancer. PM2 enables you to keep applications alive forever, reloads them without downtime, helps you to manage application logging, monitoring, and clustering.
3. StrongLoop Process Manager (Strong-PM): A production process manager for Node.js applications with built-in load balancing, monitoring, and multi-host deployment. Includes a CLI to build, package, and deploy Node.js applications to a local or remote system.

The second solution is to use Nodemon is a utility that monitor for changes in our source, which means it can be used to restart our application or server if it crashes.

To take advantage of a multi-core system, we can use API's, Node.js' worker_threads (clusters) or event-loops as i explained above.
To ensure that we can run "many" node-applications on a single droplet at the same port, we can use NGINX as a proxy or use some sort of load-balancer.

### Explain the difference between “Debug outputs” and application logging. What’s wrong with console.log(..) statements in our backend-code.
Acording to [HackerNoon](https://hackernoon.com/please-stop-using-console-log-its-broken-b5d7d396cf15) one of the major problems with using `console.log` givesa way too much information, which can be used to hack our system. `console.log` is also 'blocking call' which means it can impact the performance of our application by 'blocking' our other processes for a short period of time when it's called.
`console.log` can not be "disabled" which makes it very difficult to remove or disabled from the code, if not done right after debugging with it... 

The `Debug Package` for node.js allows us to debug our code, print specific debug messages and it can also easily be `DISABLED`.
Here is an example of how we can Debug in Express:
```Javascript
var a = require('debug')('a');
var b = require('debug')('b');
 
function work() {
  a('doing lots of uninteresting work');
  setTimeout(work, Math.random() * 1000);
}
 
work();
 
function workb() {
  b('doing some work');
  setTimeout(workb, Math.random() * 2000);
}
 
workb();
```
[source](https://www.npmjs.com/package/debug)

The debug's can easily be enabled or disabled by changing the `DEBUG` enviorement variable.
* if `DEBUG=*`, all our debug statements will be printed in the console.
* if `DEBUG=a`, only the `a` variable will be printed.
* if `DEBUG=*, -a`, all our debug statements will be printed, except for `a` variable.
* if `DEBUG=a,b`, is used to define multiple debugs, in this example, both the `a` variable and the `b` variable will be printed.

We can also specify what debug we want to run based on the debug's name (regex syntax):
```Javascript
var a = require('debug')('name:a');
var b = require('debug')('name:b');
```
* if `DEBUG=name:a`, the `a` variable will be debugged.
* if `DEBUG=name:a, name:b`, both the `a` variable and the `b` variable will be debugged.
* if `DEBUG=name:*` all debug statements with `name` in it will be debugged.


### Explain, using relevant examples, concepts related to testing a REST-API using Node/JavaScript + relevant packages
We can test our REST endpoints with [mocca](https://www.npmjs.com/package/mocca) and [chai](https://www.npmjs.com/package/chai).
We use `mocca` to run our tests and `chai` to make our tests more readable
Here is an example where I've used `mocca` and `chai` to test my 
```Javascript
const expect = require("chai").expect;
const calculate = require("../calculator");
const fetch = require("node-fetch");
const PORT = 7890;
const URL = `http://localhost:${PORT}/api/calc/`;
let server;

describe("->-> TESTING CALCULATOR API <-<-", function() {
  //Testing the calculate.add (+) function
  it("-> 5 + 5 should be equal to 10 <-", function() {
    const result = calculate.add(5, 5);
    expect(result).to.be.equal(10);
  });

  //Testing the calculate.subtract (-) function
  it("-> 10 - 5 should equal to 5 <-", function() {
    const result = calculate.subtract(10, 5);
    expect(result).to.be.equal(5);
  });

  //Testing the calculate.multiply (*) function
  it("-> 4 * 20 should be equal to 80 <-", function() {
    const result = calculate.muliply(4, 20);
    expect(result).to.be.equal(80);
  });
  //Testing the calculate.subtract (÷) function
  it("-> 16 / 2 should be equal to 8 <-", function() {
    const result = calculate.divide(16, 2);
    expect(result).to.be.equal(8);
  });

  //Testing the calculate.subtract (÷) function where we divide by zero
  it("-> 100 / 0 should throw an error: 'Error! Cannot divide by zero' <-", function() {
    expect(() => calculate.divide(100, 0)).to.throw(
      "Error! Cannot divide by zero"
    );
  });
});

describe("\n->-> Testing the calculator API <-<-", function() {
  before(function(done) {
    calculate.calculatorServer(PORT, function(theServer) {
      server = theServer;
      done();
    });
  });
  it("-> 5 + 5 should be equal to 10 <-", async function() {
    const result = await fetch(URL + "5/add/5").then(res => res.text());
    expect(result).to.be.equal("10");
  });
  after(function() {
    server.close();
  });
});
```

### Explain, using relevant examples, the Express concept; middleware.
Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.
Middleware functions can perform the following tasks:

* Execute any code.
* Make changes to the request and the response objects.
* End the request-response cycle.
* Call the next middleware function in the stack.


I have used middleware functions in my 
```Javascript
//Function 1
app.use("/api/calculator/:n1/:operation/:n2", function(req, res, next) {
	var calculatorRequest = {
		operation: req.params.operation,
		n1: Number(req.params.n1),
		n2: Number(req.params.n2)
	};
	req.body = calculatorRequest;

	next();
});

//Function 2
app.get("/api/calculator/*", function(req, res) {
	let body = req.body;
	body["result"] = eval(`${body["n1"]}${body["operation"]}${body["n2"]}`);
	res.send(JSON.stringify(body));
});


//Function 3
app.get("/*", function(req, res) {
	const rh = req.headers;
	var headerText = "<h1>API Calculator</h1>";
	var paragraphText = "<span><h3>How to use the api: <code>http://localhost:3000/api/calculator/2/*/2</code></span></h3><br/>";
	res.send(
		headerText.toLocaleString() +
		paragraphText.toLocaleString() +
		JSON.stringify(rh)
	);

});
```
The above example shows 3 different middleware functions.
`Function 3` shows a middleware function mounted on the `/*` path, it prints out some simple information on the page. The function is executed for any type of HTTP request on the `/*` path.   

`Function 2` shows a middleware function mounted on the `/api/calculator/*` path.
It take the information from `Function 2`, calculates the result by using `eval`, and then turns it into a JSON object which is then displayed on the side. Example, if `Function 1` returns a `operation: +´, n1: 2, n3: 5` response, `Function 2` will calculate the response and return `7` as the result.
The function is executed for any type of HTTP request on the `/api/calculator/*` path.   

`Functiion 1` shows a middleware function mounted on the `/api/calculator/:n1/:operation/:n2`, where it take parameters from the PATH and wrap them in  a request.   

### Demonstrate a simple Server Side Rendering example using a technology of your own choice (pug, EJS, ..).
I have used server side rendering in my `Jokes` exercise with EJS: [Express_Exercise_Logger_&_Serverside_Templating](https://github.com/Srax/FullStackJavascript-Flow2-Handin/tree/master/Express%20Exercises/Express_Exercise_Logger_%26_Serverside_Templating).
You login with a username, and can then request a random joke, get a list of all jokes and add a joke to the collection.


### Explain, using relevant examples, your strategy for implementing a REST-API with Node/Express and show how you can "test" all the four CRUD operations programmatically using, for example, the Request package.
This [example from Vegibit](https://vegibit.com/mongoose-crud-tutorial/) explains how implement CRUD in our Node/Express project.   
I have tested CRUD operations in my https://github.com/Zenzus/fullStack2HandInd/tree/master/MiniProject2_0/test


### Explain, using relevant examples, about testing JavaScript code, relevant packages (Mocha etc.) and how to test asynchronous code.
I have tested asynchronous code in my week 2 mocca and chai exercise: https://github.com/Zenzus/fullStack2HandInd/tree/master/testing_mocha_chai
and in my MiniProjectP1: https://github.com/Zenzus/fullStack2HandInd/tree/master/MiniProject2_0 

### Explain, using relevant examples, different ways to mock out databases, HTTP-request etc.
We can make HTTP-request using the [nock](https://www.npmjs.com/package/nock) package.
Here is an example, using nock to request data from wikipedia [(source)](http://www.rkeagle.com/public/blog.php?category=JavaScript&tag=NODE.JS&page=9):
```Javascript
var expect = require("chai").expect;
var tools = require("../lib/tools");
var nock = require("nock");
describe("Tools", function() {
   describe("printName()", function() {
      it("should print the last name first", function() {
         var results = tools.printName({ first: "Alex", last: "Banks"});
         expect(results).to.equal("Banks, Alex");
      });
   });
   describe("loadWiki()", function() {
      before(function() {
         nock("https://en.wikipedia.org")
             .get("/wiki/Abraham_Lincoln")
             .reply(200, "Mock Abraham Lincoln Page");
      });

      it("Load Abraham Lincoln's wikipedia page", function(done) {
         tools.loadWiki({ first: "Abraham", last: "Lincoln"}, function(html) {
            expect(html).to.equal("Mock Abraham Lincoln Page");
            done();
         });

      });

   });

});
```
### Explain, preferably using an example, how you have deployed your node/Express applications, and which of the Express Production best practices you have followed.
I have not yet to deploy my node/express applications anywhere, but here is a list of good practices when doing so:
* [NodeJS Best Practices](https://www.codementor.io/mattgoldspink/nodejs-best-practices-du1086jja)
* [Performance](https://expressjs.com/en/advanced/best-practice-performance.html)
* [Deployment](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/deployment)
* [Security](https://expressjs.com/en/advanced/best-practice-performance.html)
* [Production](https://medium.freecodecamp.org/how-to-write-a-production-ready-node-and-express-app-f214f0b17d8c)

## NoSQL, MongoDB and Mongoose
### Explain, generally, what is meant by a NoSQL database.
Since we use mongoDB, I decided to include their expert explanation of what NoSQL is:
>NoSQL encompasses a wide variety of different database technologies that were developed in response to the demands presented in building modern applications:   
>* Developers are working with applications that create massive volumes of new, rapidly changing data types — structured, semi-structured, unstructured and polymorphic data.   
>* Long gone is the twelve-to-eighteen month waterfall development cycle. Now small teams work in agile sprints, iterating quickly and pushing code every week or two, some even multiple times every day.
>* Applications that once served a finite audience are now delivered as services that must be always-on, accessible from many different devices and scaled globally to millions of users.   
>* Organizations are now turning to scale-out architectures using open source software, commodity servers and cloud computing instead of large monolithic servers and storage infrastructure.   
Relational databases were not designed to cope with the scale and agility challenges that face modern applications, nor were they built to take advantage of the commodity storage and processing power available today. [(source)](https://www.mongodb.com/nosql-explained)   

### Explain Pros & Cons in using a NoSQL database like MongoDB as your data store, compared to a traditional Relational SQL Database like MySQL.
#### Pros to MongoDB (NoSQL)
1. MongoDB is schemale-less model which makes it very flexible, which means the database can very easily be expanded later in production with very little difficulty. In this current world where outward scalability is replacing upwards scalability, NoSQL models are the better way to go.

2. We can use Mongoose's built-in vailcation to validate our schemas. This allows us save time by not having to write our own validation code, by simply including `required: true`, `unique: true`, etc... to our schema definitions. Here's an example where I've used Mongoose validation to make sure certain information IS required to create a user:
```Javascript
var UserSchema = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    firstName: String,
    lastName: String,
    email: {type: String, unique: true, required: true},
    created: {type: Date, default: Date.now(), required: true},
    lastUpdated: Date,
    job: [JobSchema]
});
```
3. Mongoose provides optional pre and post save operations for data models. This makes it easy to define hooks and custom functionality on successful reads/writes etc. You can also define custom methods that act on a particular instance (or document). While you can achieve similar functionality with the native MongoDB driver, Mongoose makes it easier to define and organize such methods within your schema definition. [(source)](https://www.stackchief.com/blog/Top%204%20Reasons%20to%20Use%20Mongoose%20with%20MongoDB)

4. Mongoose makes returning updated documents or query results easier. A prime example can be found with update queries. While the native driver returns an object with a success flag and the number of documents modified, Mongoose returns the updated object itself so you can easily work with the results. [(source)](https://www.stackchief.com/blog/Top%204%20Reasons%20to%20Use%20Mongoose%20with%20MongoDB)

5. The best rational models need the service of an expert to design, install and maintain. However, NoSQL models need much less expert management as it already has auto repair and data distribution capabilities, fewer administration and turning requirements as well as simplified data designs. [(source)](https://greengarageblog.org/7-pros-and-cons-of-nosql)

6. Given the fact that transaction rates are rising due to recognition, huge volumes of data need to be stored. While rational models have grown to meet this need it is illogical to use such models to store such large volumes of data. However these volumes can easily be handled by NoSQL models. [(source)](https://greengarageblog.org/7-pros-and-cons-of-nosql)

7. Rational models require expensive proprietary servers and storage systems whereas NoSQL models are easy and cheap to install. This means that more data can be processed and stored at a very minimal cost. [(source)](https://greengarageblog.org/7-pros-and-cons-of-nosql)

There are of course many more pros to using MongoDB (NoSQL) but these are some of the ones i found most important.

#### Cons to MongoDB (NoSQL)
There are a few reasons why you should not use MongoDB.
1. You can not 'join' data with NoSQL.
2. MongoDB is a memory hog... you need a lot of memory to run larger MongoDB databases.
3. You need to handle the transaction yourself since there is no 'default' transaction method as we see in other database models.
4. NoSQL generally consume higer amounts of data due to the de-normalization on the database.
5. Some operations can unfortunately result in a full database lock (example. write operations) leading to concurrency issues.

The above aside, ther are also some business related disadvantages, which [Crystal Ayres](https://greengarageblog.org/7-pros-and-cons-of-nosql) explained in her article on NoSQL:   
>  Not Mature - Rational models have been around for some time now compared to NoSQL models and as a result they have grown to be more functional and stable systems over the years.   
> Less Support- Every business should be reassured that in case a key function in their database system fails, they will have unlimited competent support any time. All rational model vendors have gone the extra mile to provide this assurance and made it sure that their support is available 24 hours which is not a step yet guaranteed by NoSQL vendors.   
> Business Analytics And Intelligence - NoSQL models were created because of the modern-day web 2.0 web applications in mind. And because of this, most NoSQL features are focused to meeting these demands ignoring the demands of apps made without these characteristics hence end up offering fewer analytic features for normal web apps.   
>Any businesses looking to implement NoSQL model needs to do it with caution, remembering the above mentioned pros and cons they posse in contrast to their rational opposites.

### Explain reasons to add a layer like Mongoose, on top on of a schema-less database like MongoDB
As i explained earlier, Mongoose is good when we want to query against a MongoDB database.

### Explain about indexes in MongoDB, how to create them, and demonstrate how you have used them.
This topic will be introduced in period-3.
### Explain, using your own code examples, how you have used some of MongoDB's "special" indexes like TTL and 2dsphere
This topic will be introduced in period-3.

Demonstrate, using a REST-API you have designed, how to perform all CRUD operations on a MongoDB
