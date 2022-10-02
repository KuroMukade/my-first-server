const express = require('express');
const app = express();
const { PORT, CLIENT_URL } = require('./constants')
const cookieParser = require('cookie-parser');
const passport = require('passport');
const cors = require('cors');

require('./middlewares/passport-middleware');

// app.use добавляет в приложение новое промежуточное ПО. 

// initialize middlewares
app.use(express.json()); // анализирует входящие json запросы и помещает их в req.body
app.use(cookieParser());
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(passport.initialize());
// import routes
const authRoutes = require('./routes/auth');

// initialize routes
app.use('/api', authRoutes);

// app start
const appStart = () => {
    try {
        app.listen(PORT, () => {
            console.log(`The app is running at  http://localhost:${process.env.PORT}`);
        })
    } catch (error) {
        console.log(`Error ${error.message}`);
    }
};

appStart();