const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 8000;
const router = require('./router/routes');

app.use(cors());
app.use(express.json());

app.use('/api', router);

app.listen(PORT,()=>console.log(`port: ${PORT}`));