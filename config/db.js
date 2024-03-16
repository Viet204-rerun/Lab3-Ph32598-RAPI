const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

// Đối với database dùng compass
const local = "mongodb://127.0.0.1:27017/Lab3_Ph32598";

const connect = async () => {
    try {
        await mongoose.connect(local, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connect success');
    } catch (error) {
        console.error('Connect failed:', error.message);
    }
};

module.exports = { connect };
