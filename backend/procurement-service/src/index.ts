import express from 'express';

const app = express();
const PORT = process.env.PORT || 3002;

app.get('/', (req, res) => res.send('Procurement Service is running!'));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.listen(PORT, () => {
  console.log(`Vendor Service listening on port ${PORT}`);
});
