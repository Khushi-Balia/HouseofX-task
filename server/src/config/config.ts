const config = {
    mongo: {
        options: {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            socketTimeoutMS: 30000,
            maxPoolSize: 50,
            autoIndex: false,
            retryWrites: false
        },
        url: `mongodb+srv://todo:todo123@cluster0.fextakg.mongodb.net/todo`
    },
    server: {
        host: 'localhost',
        port: 5000
    }
};

export default config;
