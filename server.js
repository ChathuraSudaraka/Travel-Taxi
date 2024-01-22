import express from 'express';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(express.json());

app.post('/api/send', (req, res) => {

    const message = req.body.message;
    const phone = process.env.VITE_MOBILE_NUMBER;
    const companyId = process.env.VITE_LANKABELL_COMPANY_ID;
    const pword = process.env.VITE_LANKABELL_PASSWORD;

    console.log(phone, companyId, pword);
    res.send('OK');
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});