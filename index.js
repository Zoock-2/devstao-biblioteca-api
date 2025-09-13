const loadEnv = require('./src/config/env');
loadEnv();
const routes = require('./src/routes');
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
    ],
    methods: ["GET", "POST", "PUT", "DELETE"]
  }));
}

app.use(express.json());
app.use('/api', routes);

app.get('/health-check', (req, res) => {
  res.json({ success: true, message: 'Hello World!' })
})

app.listen(PORT, () => {
  console.log('server rodando na porta: ' + PORT)
  console.log('Ambiente: ', process.env.APP_ENV)

});