require('dotenv').config();
const mongoose = require('mongoose');
const Flight = require('./models/flight');
const Destination = require('./models/flight');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; 
const methodOverride = require('method-override');

const mongoURI = process.env.MONGO_URI;
const db = mongoose.connection;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const jsxViewEngine = require('jsx-view-engine');

db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('open', () => console.log('mongo connected!'));
db.on('close', () => console.log('mongo disconnected'));

app.set('view engine', 'jsx')
app.set('views', './views')
app.engine('jsx',jsxViewEngine())


app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));






app.get('/flight', async (req, res) => {
    try {
      const foundFlight = await Flight.find({});
      console.log(foundFlight);
      res.status(200).render('Index', {
        flight: foundFlight,
      });
    } catch (err) {
      res.status(400).send(err);
    }
  });
  

app.get('/flight/new', (req, res) => {
    console.log('New controller');
    res.render('New');
  });

   
  app.post('/flight', async (req, res) => {
    try {
  
     const createdFlight = await Flight.create(req.body);
  
      res.status(201).redirect('/flight');
    } catch (err) {
      res.status(400).send(err);
    }
  });



   
   app.get('/flight/:id', async (req, res) => {
     try {
       const foundFlight = await Flight.findById(req.params.id);
        
       });
     } catch (err) {
       res.status(400).send(err);
     }
   });

app.put('/flight/:id', async (req, res) => {
    try {
      const destination = req.body
      const foundFlight = await Flight.findById(req.params.id)
      foundFlight.destinations.push(destination)
      const updatedFlight = await Flight.findByIdAndUpdate(
        
        {new: true})
        console.log(updatedFlight)
        res.status(201).redirect('/flight')
    } catch (err) {
      res.status(400).send(err);
    }
  });

  
  app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
  });
