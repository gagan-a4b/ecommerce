const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const {errorHandler} = require('./middlewares/errorMiddleware');
const { protect } = require('./middlewares/authMiddleware');

//import routes
const authroutes = require('./routes/authRoutes');
const productroutes = require('./routes/productRoutes');
const cartroutes = require('./routes/cartRoutes');
const orderroutes = require('./routes/orderRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authroutes);
app.use('/api/products', productroutes);
app.use('/api/cart', cartroutes);
app.use('/api/orders', orderroutes);

app.get('/', (req, res) => {
    res.json({message:"Welcome to Mobile Phones E-commerce"})
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
});