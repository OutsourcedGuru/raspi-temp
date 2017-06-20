var express = require('express');
var router = express.Router();
var raspi_temp = require('../raspi-temp.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  raspi_temp.getTemperature(
    'cpu', 'fahrenheit', 'string', function(err, strTemp) {
    if (err) {
      console.log('raspi-temp.getTemperature() returned with error'); 
      res.render('index', { title: 'raspi-temp', temp: '?' });
    } else {
      res.render('index', { title: 'raspi-temp', temp: strTemp });
    }
  });
});

module.exports = router;
