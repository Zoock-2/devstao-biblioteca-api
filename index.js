const loadEnv = require('./src/config/env');
loadEnv();
const routes = require('./src/routes');
const path = require('path');
const cors = require('cors');
const PORT = process.env.PORT || 3000;

const express = require('express');

const app = express();

if (process.env.APP_ENV === 'development') {
  app.use(cors({
    // Alterar ou adicionar p/ a porta necessário
    origin: [
      "http://localhost:8080",
      "http://localhost:8000",
      "http://localhost:80",
      "http://localhost",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"]
  }));
}
else if (process.env.APP_ENV === 'production') {
  app.use(cors({
    origin: [
      'https://pardoxandria.devstao.dev',
    ],
    methods: ["GET", "POST", "PUT", "DELETE"]
  }));
}

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use('/api', routes);

app.get('/health-check', (req, res) => {
  res.json({ success: true, message: 'Hello World!' })
})

app.listen(PORT, () => {
  console.log('server rodando na porta: ' + PORT)
  console.log('Ambiente: ', process.env.APP_ENV)

});