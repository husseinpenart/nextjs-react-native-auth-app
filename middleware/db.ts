import mongoose from 'mongoose';

const CONNECTIONSTRING = process.env.NEXT_MONGO_CONNECTION_URL;

const connection = async () => {
    const connectionState = mongoose.connection.readyState;
    if (connectionState === 1) {
        console.log('Already connected to MongoDB.');
        return;
    }
    if (connectionState === 2) {
        console.log('Connecting to MongoDB...');
        return;
    }
    try {
        await mongoose.connect(CONNECTIONSTRING!, {
            dbName: '3dauth',
            bufferCommands: true,

        });
        console.log('Connected to MongoDB successfully.');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        throw new Error('Error connecting to MongoDB');
    }
};

export default connection;
