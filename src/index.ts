import "reflect-metadata"
import app from './app';
import { appDataSource } from './db';

async function main() {
    try {
        await appDataSource.initialize();
        console.log('Database connected')
        const port = process.env.PORT || 3000
        app.listen(port)
        console.log('Sever listen on port', port)
    } catch (error) {
        console.error(error)
    }
}
main()
