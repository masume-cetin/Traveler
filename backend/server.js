const express = require('express');
const notes = require('./data/notes');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes')


const app = express();
dotenv.config();
connectDB();
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("api is runnıng");
});
app.get('/api/notes',(req,res)=>{
    res.send(notes);
});
app.use('/api/users',userRoutes);



const PORT = process.env.PORT||5000;

app.listen(PORT,console.log('server started on port {PORT}'));