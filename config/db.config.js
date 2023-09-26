const mysql = require('mysql2/promise');
const connection = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
   database: 'db',
    password: 'password',
    port: 3306,
    
  });

module.exports = connection;