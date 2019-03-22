const express = require("express");
let app = express();
const PORT = 3000;

//Add your code here
app.use("/api/calculator/:n1/:operation/:n2", function(req, res, next) {
	var calculatorRequest = {
		operation: req.params.operation,
		n1: Number(req.params.n1),
		n2: Number(req.params.n2)
	};
	req.body = calculatorRequest;

	next();
});

app.get("/api/calculator/*", function(req, res) {
	let body = req.body;
	body["result"] = eval(`${body["n1"]}${body["operation"]}${body["n2"]}`);
	res.send(JSON.stringify(body));
});

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

app.listen(PORT, () => {
	console.log(`Server started, listening on: ${PORT}`);
});


//How to run: "npm run dev" or "node app.js".
//How to use, example: http://localhost:3000/api/calculator/2/*/2