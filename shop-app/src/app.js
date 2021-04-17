// const createHttpError = require('http-errors');
const express = require('express');
const session = require('express-session');
const ConnectMongoDBSession = require('connect-mongodb-session');
const path = require('path');
const logger = require('morgan');
const multer = require('multer');
const csurf = require('csurf');
const flash = require('connect-flash');

const router = require('./router');
const authMw = require('./middlewares/auth-mw');
const ErrorController = require('./controllers/error-controller');

const app = express();
const MongoDBStore = ConnectMongoDBSession(session);
const store = new MongoDBStore({
  collection: process.env.MONGODB_URI,
  collection: 'session',
});

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname.replace(' ', '_'));
  },
});

const upload = multer({
  storage: fileStorage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

// view engine setup
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(upload.single('image'));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/images', express.static(path.join(__dirname, '..', 'images')));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
  }),
);
app.use(csurf());
app.use(flash());

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  return next();
});
app.use(authMw);

app.use('/', router);

app.get('/500', ErrorController.get500);

app.use(ErrorController.get404);

app.use((error, req, res, next) => {
  // res.status(error.httpStatusCode).render(...);
  // res.redirect('/500');
  res.status(500).render('500', {
    pageTitle: 'Error!',
    path: '/500',
    isAuthenticated: req.session.isLoggedIn,
  });
});

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   return next(createHttpError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//   // render the error page
//   res.status(err.status || 500);
//   return res.render('error');
// });

module.exports = app;
