const express = require('express');
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');
require('dotenv').config()

const app = express();
app.use(bodyParser.json());

// Configurar AWS SDK
AWS.config.update({
  region: process.env.AWS_REGION,  // por ejemplo, 'us-west-2'
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'Users';

// Ruta para crear un usuario
app.post('/create-user', (req, res) => {
  const params = {
    TableName: TABLE_NAME,
    Item: {
      user_id: req.body.UserId,
      name: req.body.Name,
      email: req.body.Email
    }
  };

  dynamodb.put(params, (error) => {
    if (error) {
      console.log("Error", error);
      res.status(400).json({ error: 'No se pudo crear el usuario' });
    } else {
      res.json({ UserId: req.body.UserId, Name: req.body.Name, Email: req.body.Email });
    }
  });
});

// Ruta para obtener un usuario
app.get('/get-user/:userId', (req, res) => {

  console.log("userId:", req.params.userId)

  const params = {
    TableName: TABLE_NAME,
    Key: {
      user_id: req.params.userId
    }
  };

  dynamodb.get(params, (error, result) => {
    if (error) {
      console.log("Error", error);
      res.status(400).json({ error: 'No se pudo obtener el usuario' });
    } else {
      if (result.Item) {
        res.json(result.Item);
      } else {
        res.status(404).json({ error: "Usuario no encontrado" });
      }
    }
  });
});

// Ruta para actualizar un usuario
app.put('/update-user/:userId', (req, res) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      user_id: req.params.userId
    },
    UpdateExpression: "set #name = :n, #email = :e",
    ExpressionAttributeNames: {
      "#name": "name",
      "#email": "email"
    },
    ExpressionAttributeValues: {
      ":n": req.body.name,
      ":e": req.body.email
    },
    ReturnValues: "UPDATED_NEW"
  };

  dynamodb.update(params, (error, result) => {
    if (error) {
      console.log("Error", error);
      res.status(400).json({ error: 'No se pudo actualizar el usuario' });
    } else {
      res.json(result.Attributes);
    }
  });
});

// Ruta para eliminar un usuario
app.delete('/delete-user/:userId', (req, res) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      user_id: req.params.userId
    }
  };

  dynamodb.delete(params, (error) => {
    if (error) {
      console.log("Error", error);
      res.status(400).json({ error: 'No se pudo eliminar el usuario' });
    } else {
      res.json({ message: 'Usuario eliminado exitosamente' });
    }
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});