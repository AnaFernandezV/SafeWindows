const express = require('express');
const sgMail = require('@sendgrid/mail');
const cors = require('cors');


const app = express();
const API_KEY = '';

sgMail.setApiKey(API_KEY);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
  res.send('Formulario de envío de correo electrónico');
});

app.post('/send-email', (req, res) => {
  const { to, from, subject, text} = req.body;

  const message = {
    to,
    from,
    subject,
    text
    
  };

  sgMail
    .send(message)
    .then(() => {
      res.send('Correo electrónico enviado exitosamente');
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Ocurrió un error al enviar el correo electrónico');
    });
});

app.listen(3003, () => {
  console.log('Servidor en ejecución en http://localhost:3003');
});
