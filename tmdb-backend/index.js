const express = require('express')
const app = express();
const apiRouter = require('./router');

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/api',apiRouter)

app.listen(3000,()=>{
    console.log("The server is up and running at 3000!");
})
