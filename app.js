const path = require('path');
const express = require('express');
const AppError = require('./utils/appError');
const viewRouter = require('./routes/viewRouter');
const adminRouter = require('./routes/adminRouter');
const cookies = require('cookie-parser');
const cors = require('cors');

const app = express();
// app.engine('pug', require('pug').__express);
//serving static files like images n shit
app.use(express.static('images'));
app.use(express.static('images/activities'));
app.use(express.static('images/activities/images'));
app.use(express.static('images/awards'));
app.use(express.static('images/awards/images'));
app.use(express.static('images/ambientet'));
app.use(express.static('images/coachings'));
app.use(express.static('images/coachings/images'));
app.use(express.static('images/competitions'));
app.use(express.static('images/competitions/images'));
app.use(express.static('images/inxhinieria'));
app.use(express.static('images/employment'));
app.use(express.static('images/matura'));
app.use(express.static('images/ligjet'));
app.use(express.static('images/notifs'));
app.use(express.static('images/partners'));
app.use(express.static('images/tempPartners'));
app.use(express.static('images/welcome'));
app.use(express.static('images/projects'));
app.use(express.static('images/projects/images'));
app.use(express.static('css'));
app.use(express.static('js'));
app.use(express.static('documents'));
app.use(express.static('views'));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(cookies());
app.use(
  cors({
    credentials: true,
    origin: '*',
  })
);
var num = 0;
app.use(function (req, res, next) {
  var url = req.url;
  let includes = url.includes("update");
  if(includes){
    const endpoint = req.url.split('update/')[1].split('/')[0];
    res.locals.updateEndpoint = endpoint;
    // console.log(endpoint)
  }
  next();
});
app.use(function (req, res, next) {
  var url = req.url;
  const endpoint = req.url;
    res.locals.endpoint = endpoint;
    // console.log(endpoint)
  next();
});

app.use('/', viewRouter);
app.use('/api/v1/admin', adminRouter);

// app.all('*', (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
// });

module.exports = app;
