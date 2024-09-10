import Hapi from '@hapi/hapi';
import 'dotenv/config';
import routes from './routes/books.js';

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 5000,
        host: process.env.HOST || 'localhost',
        routes: {
            cors: true
        }
    });

    server.route(routes);

    await server.start();
    console.log(`Server is running at http://localhost:${process.env.PORT}`)
};

init();