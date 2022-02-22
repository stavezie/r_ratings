import express from "express";
import db from "./config/database.js";
import artsRoutes from "./routes/artsRouter.js"
import authRoutes from './routes/authRouter.js'
import cookieParser from 'cookie-parser'
import cors from "cors";
import 'dotenv/config'
import errorMiddleware from "./middlewares/error-middleware.js";
import userRouter from "./routes/userRouter.js";
import adminRouter from "./routes/adminRouter.js";


const app = express();
const PORT = process.env.PORT || 7000

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use(express.json());
app.use(cookieParser())
app.use('/api/auth', authRoutes);
app.use('/api/users', userRouter);
app.use('/api/arts', artsRoutes);
app.use('/api/admin', adminRouter);
app.use(errorMiddleware);


const start = async () => {
    try {
        await db.authenticate();
        app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
        console.log('Database connected...');
    } catch (e) {
        console.log(e)
    }
}

start()






