
app = require("./")

app.listen(app.port, function() {
  return console.log("Listening on " + app.port + "\nPress CTRL-C to stop server.");
});