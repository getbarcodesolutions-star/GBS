// server.js
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import conectDB from './config/mongodb.js';
import { connectCloudinary } from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

const app = express();
const port = process.env.PORT || 4000;

// Connect DB + Cloudinary
conectDB();
connectCloudinary();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.get('/', (req, res) => {
  res.send('API Working');
});

app.listen(port, () => console.log('Server started on port ' + port));
