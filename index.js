const express = require('express');

const path = require('path');

const port = 3000; 
let app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  // Either serve the file directly:
  res.sendFile(path.join(__dirname,'node_modules/public/index.html'));
});

app.use(express.json());

app.post('/submit',(req,res)=>{
    
    const data = req.body;
    res.send(`received: ${JSON.stringify(data)}`);
});

app.use((req, res,next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
  });

  const items = ['apple','orange','banana'];
  
  app.post('/item', (req, res) => {
    const { item } = req.body;
    items.push(item);
    res.json(items);  // Return the updated list
  });
  
app.get('/items', (req, res) => {    
    res.json(items);


});
    

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

