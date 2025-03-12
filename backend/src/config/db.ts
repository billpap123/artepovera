import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('artepovera', 'root', '', {
  host: '127.0.0.1',
  dialect: 'mysql',
  port: 3306,  // Keep it on 3306
  logging: console.log, // Enable SQL query logging
});

export default sequelize;
