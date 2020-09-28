const path = require('path')
const express= require('express')
const hbs= require('hbs')
const forcast = require('./utils/forcast')

const port =process.env.PORT || 3000

const app = express()

const publicDirPath= path.join(__dirname,'../public')
const viewsDirPath= path.join(__dirname,'../templates/views')
const partialDirPath= path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsDirPath)
hbs.registerPartials(partialDirPath)

app.use(express.static(publicDirPath))


app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About',
        name: 'Prabhjeet'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'help',
    })
})

app.get('/weather',(req,res)=>{
    if (!req.query.address){
        return res.send({
            Error: 'Please provide valid address.'
        })
    }
    forcast.geoWeather(req.query.address,(error,data)=>{
        if (error){
            res.send({
                Error:error,
            })
        }else{
            res.send({
                Temperature:data.temperature,
                Forcast: data.weather_descriptions[0]
            })
        }
    })
    
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: '404',
        errorMsg: 'Page not found',
    })
})



app.listen(port,()=>{
    console.log('Listing on port: '+port)
})