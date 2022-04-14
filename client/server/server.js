const jsonServer = require('json-server');
const server = jsonServer.create();
const products = require('./products.json');
const slider = require('./slider.json');
const nav = require('./nav.json');
const order = require('./order.json');
const router = jsonServer.router({products, slider, nav, order});
const middlewares = jsonServer.defaults({static: './build'});

const PORT = process.env.PORT || 3001;

server.use(middlewares);
server.use('/api', router);

server.listen(PORT, () => {
  console.log('Сервер запущен на порту 3001');
});
