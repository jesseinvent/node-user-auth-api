import  mongoose from "mongoose";

export default () => {

    mongoose.connect(process.env.DB_TEST_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connected to test DB');
    })
    .catch(err => {
        console.error(err);
    });

}
