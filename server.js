import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: "*"
}));

app.post('/api/send', (req, res) => {
    const company_id = process.env.VITE_LANKABELL_COMPANY_ID;
    const password = process.env.VITE_LANKABELL_PASSWORD;
    const mobile = req.body.mobile;
    const message = req.body.message;

    const url = `http://smsm.lankabell.com:4040/Sms.svc/SendSms?phoneNumber=${mobile}&smsMessage=${message}&companyId=${company_id}&pword=${password}`;
    try {
        fetch(url, {
            mode: "no-cors",
        })
            .then((res) => res.json())
            .then((data) => {
                return res.send(data);
            });
    } catch (error) {
        res.status(403).json({ message: error.message });
    }

});

app.listen(3000, () => console.log('Server running on port 3000'));