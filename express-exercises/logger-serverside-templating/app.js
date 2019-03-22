const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cookieSession = require("cookie-session");
const PORT = 12345;

const indexRouter = require("./routes/index");
const apiRouter = require("./routes/api");


var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(
    cookieSession({
        name: "session",
        secret: "This_Is_Your_Secret_._I_Shouldnt_Be_Visible_To_Others",

        // Cookie Options
        maxAge: 30 * 60 * 1000 // 30 minutes
    })
);

app.use(function (req, res, next) {
    if (req.method === "POST") {
        console.log(req.body.userName);
        if (req.body.userName) {
            req.session.userName = req.body.userName;
            console.log(`->->->-> ${req.method} <-<-<-<-`);
            req.method = "GET";
            console.log(`->->->-> ${req.method} <-<-<-<-`);
        }
    }
    return next();
});

app.use(function (req, res, next) {
    if (!req.session.hasOwnProperty("userName")) {
        req.url = "/login";
    }
    return next();
});


app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);
app.use("/api", apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

app.listen(PORT, () => {
    console.log(`Server started, listening on: ${PORT}`);
});

module.exports = app;
