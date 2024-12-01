import express from 'express'
const app = express()

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => res.render('landing'))

app.listen(3000, () => console.log("Server started on port 3000!"))