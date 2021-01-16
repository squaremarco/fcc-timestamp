const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({optionsSuccessStatus: 200}));

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/timestamp/:date?", function (req, res) {
    const { date = Date.now() } = req.params || {};
    const parsedDate = new Date(isNaN(+date) ? date : +date);
    
    if(Number.isNaN((parsedDate.getTime()))) {
      return res.json({
        error: "Invalid Date"
      });
    }

    return res.json({
      unix: parsedDate.getTime(),
      utc: parsedDate.toUTCString()
    });
});

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
