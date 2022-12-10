import express from 'express';
import fs from 'fs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as bodyParser from 'body-parser';

const PORT = 3000;
const app = express();
app.use(bodyParser.json());
const secret = 'mysecretkey';
const usersPath = `${process.cwd()}\\src\\db\\users.json`;
type User = {
  id: number;
  username: string;
  password: string;
}

const users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
app.post('/users', async (req, res) => {
  const userData: User = req.body;
  try {

    userData.id = Date.now();
    userData.password = await bcrypt.hash(userData.password, 10);
    users.push(userData);
    fs.writeFileSync(usersPath, JSON.stringify(users));

    res.send({
      id: userData.id,
      username: userData.username,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/users/auth', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = users.find(u => u.username === username);
    if (!user) {
      res.status(404).send('User not found');
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).send('Incorrect password');
      return;
    }
    const token = jwt.sign({ user }, secret);
    res.send({
      id: user.id,
      username: user.username,
      token,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});