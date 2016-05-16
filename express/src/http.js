var express = require("express"),
	exphbs = require("express-handlebars"),
	compression = require("compression"),
	session = require("express-session"),
	fs = require("fs"),
	utils = require("./utils");

var app = express();

app.engine("handlebars", exphbs({
	defaultLayout: "main",
	helpers: {}
}));
app.set("view engine", "handlebars");

app.use(compression());
app.use(express.static("static"));

app.use(session({
	secret: utils.randomString(40),
	resave: false,
	saveUninitialized: true
}));

app.get("/", (req, res) => {
	res.render("home");
});

var ip = global.user_config.get("web_server.ip"),
	port = global.user_config.get("web_server.port");

app.listen(port, ip, () => {
	console.log("Web server listening on " + ip + ":" + port);
});