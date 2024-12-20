import express from 'express'
import session from 'express-session'
import passport from './passport-config.mjs'
import registerRoute from './routes/registerRoute.mjs'
import logInRoute from './routes/logInRoute.mjs'

const app = express()

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(
  session({
    secret: 'TU_SECRETO_SEGURO',
    resave: false,
    saveUninitialized: false,
  })
);

// Inicializar Passport
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => res.render('landing'))
app.use('/register', registerRoute)
app.use('/log-in', logInRoute)

app.listen(3000, () => console.log("Server started on port 3000!"))