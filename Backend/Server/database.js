
import mysql from 'mysql2';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'anime_forum'
});

export default pool;