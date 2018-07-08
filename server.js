const express = require('express');
const hbs = require('express-handlebars');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

 app.engine('.hbs',hbs({extname : '.hbs'}));
 app.set('view engine','.hbs');

 hbs.create({
 	helpers : {
 		getCurrentYear : () => {
 			return new Date().getFullYear();
 		},
 		screamIt  : (text) =>{
    return text.toUpperCase();}
 	  },
    partialsDir: [__dirname +'/views/partials']
  });

   app.use((req,res,next)=>
   {
      var now = new Date().toString();
      var log = `${now}: ${req.method}: ${req.url}`;

      console.log(log);

      fs.appendFile('server.log',log + '\n',(err)=>{
      if(err) {
      console.log('Unable to log');
              }
            });
         next();

    });

 // app.use((req,res,next)=>
 // {
 //  res.render('maintenance.hbs');
 //  next();
 // });
  
 app.use(express.static(__dirname + '/public'));//express static middleware

 //next exists so u can tell express when the middleware ends
app.get('/',(req, res) =>{
   //res.send('<h1>Hello Express!</h1>');
   res.render('home.hbs', {
   	pageTitle : 'HomePage',
   	welcomeMessage : 'welcome to my website',
   
   });
});
//handler for request of url of about
app.get('/about',(req,res) => {
	res.render('about.hbs',{
		pageTitle: 'About Page',
		
	});
});

app.listen(port,()=>{
  console.log(`server running on port ${port}`);
});// app.listen binds the app to a local port on the machine we use 3000 for localhost here

app.get('/bad',(req,res) => {
   res.send({
   	errorMessage : 'Unable to handle request'
   });
});