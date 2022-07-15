const Express = require("express");
const app = Express();

app.use("/selects", require("./selects"));
app.use("/students", require("./students"));
app.use("/personal_info", require("./personal_info"));
app.use("/proporties", require("./proporties"));
app.use("/descriptions", require("./descriptions"));
app.use("/locality", require("./locality"));

module.exports = app;