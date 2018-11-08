const config = {
  development: {
    username: 'PUT YOUR USER HERE',
    password: 'PUT YOUR PASSWORD HERE',
    database: 'grounded_n_grits_development',
    host: '127.0.0.1',
    dialect: 'mysql',
    port: 3306
  },
  test: {
    username: 'PUT YOUR USER HERE',
    password: 'PUT YOUR PASSWORD HERE',
    database: 'grounded_n_grits_development',
    host: '127.0.0.1',
    dialect: 'mysql',
    port: 3306
  },
  production: {
    username: 'PUT YOUR USER HERE',
    password: 'PUT YOUR PASSWORD HERE',
    database: 'grounded_n_grits_development',
    host: '127.0.0.1',
    dialect: 'mysql',
    port: 3306,
  },
};
module.exports.config = config;
