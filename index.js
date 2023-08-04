const express = require('express');
const cors = require('cors');
const port = process.env.port | 5000;
const app = express();

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('server running')
})

app.listen(port, () => {
    console.log(`server is running or port ${port}`)
})
