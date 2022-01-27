const express = require('express');
// const morgan = require('morgan');
const routes = require('./src/routes');
const server = express();
const cors = require('cors')
server.name = 'API';

server.use(cors())

require('./db');
server.use(express.urlencoded({ extended: false, limit: '50mb' }));
server.use(express.json({ limit: '50mb' }));
// server.use(cookieParser());
server.use(express.static("./uploads"))


//MANEJO DE ERRORES
server.use((err, req, res, next) => {
	// eslint-disable-line no-unused-vars
	const status = err.status || 500;
	const message = err.message || err;
	console.error(err);
	res.status(status).send(message);
});

//
server.use('/', routes);

server.set('port', process.env.PORT || 3001);
server.listen(server.get('port'), () => console.log(`I'm in http://localhost:${server.get('port')}`));


