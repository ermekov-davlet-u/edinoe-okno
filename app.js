var express = require("express");
var path = require("path");
var logger = require("morgan");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var handlebars = require('express-handlebars');
const cors = require("cors")


const translator = require("./services/i18n");
const helpers = require('./services/helpers')

const CONFIG = require(path.join(__dirname, "config.js"));
var indexRouter = require("./routes/index");
var authRouter = require("./routes/auth");
const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
var app = express();
app.use(cors(corsOptions));
// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "hbs");

// // view engine setup
var hbs = handlebars.create({
  extname: '.hbs',
  defaultLayout: 'layout',
  layoutsDir: './views',
  partialsDir: './views/partials',
  helpers: helpers()
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine);

app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json()); // for parsing application/json
app.use(cookieParser())
app.use(translator);
app.use(logger("dev"));

const log1 = async (req, res, next) => {
  next()
}

app.use("/api/okno",log1, authRouter);
app.get("/bypass-sheet",(req, res) => {
  console.log(req.url);
  const data = {
    id: 45,
    name: "AVN"
  }

  res.render("demandMill", {name: "Давлет", age: 22, hobby: "Изучать javascript", url: "http://localhost:3009/bypass-sheet?id_group=10236&id_protocols=505720&id_student=135075"});
});
app.use("/", indexRouter);
app.use(express.static(path.join(__dirname, "public")));


// error handler
app.use(function (err, req, res, next) {  
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", { layout: false });
});

module.exports = app;
