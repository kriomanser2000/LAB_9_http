const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 5000;
app.use(bodyParser.json());
app.post('/api/users', (req, res) => 
{
    const { login, password } = req.body;
    const usersFilePath = path.join(__dirname, 'users.json');
    fs.readFile(usersFilePath, (err, data) => 
      {
        if (err) 
        {
            return res.status(500).json({ message: 'Помилка читання файлу' });
        }
        const users = JSON.parse(data);
        const userExists = users.some(user => user.login === login);
        if (userExists) 
        {
            return res.status(400).json({ message: 'Користувач з таким логіном вже існує' });
        }
        users.push({ login, password });
        fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => 
        {
            if (err) 
            {
                return res.status(500).json({ message: 'Помилка запису файлу' });
            }
            res.json({ message: 'Користувача успішно додано' });
        });
    });
});
app.listen(PORT, () => 
{
    console.log(`Server is running on http://localhost:${PORT}`);
});