const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


const app = express()
const port = process.env.PORT || 3000

// for customizing directories
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsDirectory = path.join(__dirname, "../template/views")
const partialsPath = path.join(__dirname, "../template/partials")


//setting the properties for express
app.set('view engine', 'hbs')
app.set('views', viewsDirectory)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Biranchi Narayan Padhi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Biranchi Narayan Padhi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'In this Web Application, you have to enter a City name. Once you click on  check weather details, it will show you the current Temperature and chances of Rain in Percentage and Humidity in Percentage. I have used weather Stack API for weather information and mapbox API for Geocoding. Hope this information helps you.',
        title: 'Help',
        name: 'Biranchi Narayan Padhi'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Kindly provide the address in query string"
        })

    }
    geocode(req.query.address, (error, geocodeData) => {
        if (error) {
            return res.send({
                error: error
            });
        }
        else {

            const { latitude, longitude, location } = geocodeData
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error: error
                    });
                }
                else {
                    const { temperature, precipitation, summary, humidity } = forecastData
                    res.send({
                        latitude: latitude,
                        longitude: longitude,
                        location: location,
                        humidity: "The Humidity is " + humidity + "%",
                        summary: "The Weather is " + summary,
                        temperature: "The current temperature is " + temperature + " degree celsius.",
                        precipitation: "There is " + precipitation + "% of rain.",
                        address: req.query.address
                    })
                }
            })
        }
    })
})


app.get("/products", (req, res) => {

    if (!req.query.rating) {
        return res.send({
            error: "Kindly provide the product rating in query string"
        })
    }

    res.send({
        products_rating: req.query.rating
    })

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Biranchi Padhi',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Biranchi Padhi',
        errorMessage: 'Page not found.'
    })
})



app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
// app.get('/about',(req,res)=>{

//    res.send("<h1>About Page</h1>")

// })

// app.get('/weather', (req,res)=>{

//     res.send({

//             location : "Rayagada",
//             forecast:{
//                 temperature: 27,
//                 precipitation:0.1
//             }

//     })

// })

// app.listen(3000,(req,res)=>{
//     console.log("Server is up on port 3000")
// })