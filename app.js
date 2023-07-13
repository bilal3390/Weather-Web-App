const express = require("express")
const request = require("request")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const app = express();
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {

    res.render('index');
});
app.post("/weather", (req, res) => {
    let city = req.body.city;
    request(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=192490e60740be89b3cba2044df61c09&units=metric`,
        function (error, response, body) {
            let data = JSON.parse(body);
            if (response.statusCode === 200) {
                const r = Math.round(data.main.temp);
                // res.send(`The weather in ${city} city is ${Math.round(data.main.temp)}° Celcius`);
                res.render('result' , {city , r})
            }
        }
    )
});
app.listen(3000, () => {
    console.log("Server is running on PORT 3000");
});