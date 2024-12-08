const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const logger = require("morgan");

dotenv.config();

const mainRoute = require("./routes/index");  // Ana route dosyanızı dahil ediyorsunuz

app.use(logger("dev"));
app.use(express.json());  // JSON verilerini almak için middleware

app.use('/api', mainRoute);  // 'mainRoute' ana rotasını '/api' ile eşliyoruz

// MongoDB bağlantısı
(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Bağlantı başarıyla sağlandı");
    } catch (err) {
        console.log(err);
    }
})();

// Ana route dosyasını kullanarak '/api' ile başlayan tüm istekleri yönlendiriyoruz

const port = 5000;
app.listen(port, () => {
    console.log("Port üzerinde dinleniyor: " + port);
});
