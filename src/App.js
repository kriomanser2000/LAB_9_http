import React, { useEffect, useState } from 'react';
import axios from 'axios';
const App = () => 
  {
    const [goods, setGoods] = useState([]);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    useEffect(() => 
    {
        axios.get('/goods.json')
            .then(response => 
            {
                setGoods(response.data);
            })
            .catch(error => 
            {
                console.error('Error fetching goods:', error);
            });
    }, []);
    const handleSubmit = (e) => 
    {
        e.preventDefault();
        axios.post('/api/users', { login, password })
            .then(response => 
            {
                setMessage(response.data.message);
            })
            .catch(error => 
            {
                console.error('Error submitting user:', error);
            });
    };
    return (
        <div>
            <h1>Список товарів</h1>
            <ul>
                {goods.map((item, index) => 
                (
                    <li key={index}>{item.name} - {item.price}</li>
                ))}
            </ul>
            <h2>Введіть логін і пароль</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    placeholder="Логін"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Пароль"
                    required
                />
                <button type="submit">Відправити</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};
export default App;