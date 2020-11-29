const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/Views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  let log = `${now}: ${req.method} , ${req.url}`;
  
  console.log(log);
  fs.appendFile('server.log', log +'\n', (err) => {
      if(err){
          console.log('Unable to append to server.log')
      }
  });
  next();
});

// app.use((req, res, next) => {
//     res.render('Maintenance.hbs', {
//         pageTitle:'stop',
//         message: 'koll kara'
//     })
// })

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.get('/', (req, res) => {
   res.render('home.hbs', {
       pageTitle: 'Home Page',
       message: 'Welcome to my website',
   })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle:'About Page',
    });
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessgae: 'this is a bad Page'
    })
});


app.listen(port, () => {
    console.log(`Server is up on Prot ${port}`);
});