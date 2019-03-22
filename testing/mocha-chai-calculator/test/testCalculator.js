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

//Start the test by writing "npm test" in the terminal
