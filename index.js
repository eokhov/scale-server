const express =       require('express');
const path =          require('path');
const exphbs =        require('express-handlebars');
const bodyParser =    require('body-parser')

const homeRoute =     require('./routes/home');
const site1Route =    require('./routes/site1');
const site2Route =    require('./routes/site2');
const site3Route =    require('./routes/site3');
const createRoute =   require('./routes/create');
const editRoute =     require('./routes/edit');
const getMelt =       require('./routes/melt');
const scaleStart =    require('./routes/scale-start');
const scaleData =     require('./routes/scale-data');
const scaleResult =   require('./routes/scale-result');

const app = express();

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', homeRoute);
app.use('/site1', site1Route);
app.use('/site2', site2Route);
app.use('/site3', site3Route);
app.use('/create', createRoute);
app.use('/edit', editRoute);
app.use('/melt', getMelt);
app.use('/scale-start', scaleStart);
app.use('/scale-data', scaleData);
app.use('/scale-result', scaleResult);

const isDev = process.env.NODE_ENV === 'development';
const PORT = isDev ? process.env.PORT || 3000 : process.env.PORT || 80;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});