import "reflect-metadata"
import app from './app';
import { appDataSource } from './db';

async function main() {
    try {
        await appDataSource.initialize();
        console.log('Database connected')
        app.listen(3000)
        console.log('Sever listen on port', 3000)
    } catch (error) {
        console.error(error)
    }
}
main()