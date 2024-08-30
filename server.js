const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
dotenv.config();
const dbConnect = require('./config/dbConnection');

const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoute');
const { notFound,errorHanlder } = require('./middleware/errorHandler');

dbConnect();
app.use(bodyParser.json());

app.use('/api/auth/',authRouter);
app.use('/api/user/',userRouter);

app.use(notFound);
app.use(errorHanlder);

const PORT = process.env.PORT || 3000;
app.listen(PORT,() => {
    console.log(`server running on port ${PORT}`);
})