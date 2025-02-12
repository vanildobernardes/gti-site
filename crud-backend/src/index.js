import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () =>{
  console.log(`Server is running on port ${port}`)
});

app.get('/', (req, res) =>{
    res.send (<h1>hi</h1>)
})