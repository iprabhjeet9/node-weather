const request = require('postman-request')

const geoWeather =(Address,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=2cbc10f32b8ebfd2d8b5ff5ea1cd3a18&query='+encodeURIComponent(Address)
    request({url:url,json:true},(error,res)=>{
        if (error){
            callback(error,undefined)
        }else if(res.body.error){
            callback(res.body.error.info,undefined)
        }else{
            callback(undefined,res.body.current)
        }
    })
}

module.exports={
    geoWeather: geoWeather
}