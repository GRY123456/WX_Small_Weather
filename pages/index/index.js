var app = getApp()
var day = ["今天", "明天", "后天", "大后天"];
Page({
  data: {
    day: day,
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    that.getLocation();
  },
  //获取经纬度方法
  getLocation: function () {
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        console.log("lat:" + latitude + " lon:" + longitude);
        that.getCity(latitude, longitude);
      }
    })
  },
  //获取城市信息
  getCity: function (latitude, longitude) {
    var that = this;
    var url = "https://api.map.baidu.com/geocoder/v2/";
    var params = {
      ak: "ILbXcAXN5w1Xmc7abekEQHYPpvESNjnM",
      output: "json",
      location: latitude + "," + longitude
    }
    wx.request({
      url: url,
      data: params,
      success: function (res) {
        var city = res.data.result.addressComponent.city;
        var district = res.data.result.addressComponent.district;
        var street = res.data.result.addressComponent.street;
        that.setData({
          city: city,
          district: district,
          street: street,
        })
        var descCity = city.substring(0, city.length - 1);
        that.getWeahter(descCity);
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //获取天气信息
  getWeahter: function (city) {
    var that = this
    var url = "https://restapi.amap.com/v3/weather/weatherInfo"
    var parameters = {
      city: city,
      key: "a4debc0315ec7e7ec051f846e8e3b367",
      extensions: "base"
    }
    wx.request({
      url: url,
      data: parameters,
      success: function (res) {
        var tmp = res.data.lives[0].temperature;
        var txt = res.data.lives[0].weather;
        var dir = res.data.lives[0].winddirection;
        var sc = res.data.lives[0].windpower;
        var hum = res.data.lives[0].humidity;
        var fl = res.data.lives[0].temperature;
        that.setData({
         tmp: tmp,
         txt: txt,
         dir: dir,
          sc: sc,
          hum: hum,
          fl: fl,
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })

    var parameters = {
      city: city,
      key: "a4debc0315ec7e7ec051f846e8e3b367",
      extensions: "all"
    }
    wx.request({
      url: url,
      data: parameters,
      success: function (res) {
        var daily_forecast = res.data.forecasts[0].casts;
        console.log(res);
        that.setData({
          daily_forecast: daily_forecast,
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})