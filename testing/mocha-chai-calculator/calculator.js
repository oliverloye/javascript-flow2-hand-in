const express = require("express");
const http = require("http");


//Basic calculator functions: plus, minus, multiply and divide
function add(n1, n2) {return n1 + n2;}
function subtract(n1, n2) {return n1 - n2;}
function muliply(n1, n2) {return n1 * n2;}
function divide(n1, n2) {
	if (n2 == 0) {
		throw new Error("Error! Cannot divide by zero");
	}
	return n1 / n2;
}

//REST Calculation server for the API
function calculatorServer(port, isStartedCb) {
	const app = express();
	app.get("/api/calc/:n1/add/:n2", (req, res) => {
		n1 = Number(req.params.n1);
		n2 = Number(req.params.n2);
		res.send(add(n1, n2).toString());
	});
	let server = http.createServer(app);
	setTimeout(() => {
		server.listen(port, () => {
			isStartedCb(server);
		});
	}, 1500);
}

module.exports = {
	add,
	subtract,
	muliply,
	divide,
	calculatorServer
};

//Start the test by writing "npm test" in the terminal