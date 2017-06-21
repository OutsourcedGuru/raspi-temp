'use strict';

var child_process = require('child_process');
var path = require('path');
var raspi_temp = exports;

//-----------------------------------------------
// getTemperature() 
//-----------------------------------------------
exports.getTemperature = function(strWhich, strScale, strType, callback) {
  if (typeof callback !== 'function') {
    callback = function() {};
  }

  var commands, childD, strCmdLineArgs, decimalTemperature, strReturnedTemp;
  if (strWhich == 'gpu') {
    strCmdLineArgs = 'measure_temp';
    commands = [ strCmdLineArgs ];
    childD = child_process.spawn('/opt/vc/bin/vcgencmd', commands);
  } else {
    strCmdLineArgs = '/sys/class/thermal/thermal_zone0/temp';
    commands = [ strCmdLineArgs ];
    childD = child_process.spawn('cat', commands);
  }
  childD.stdin.setEncoding('ascii');
  childD.stderr.setEncoding('ascii');

  childD.stdout.on('data', function(data) {
    console.log('Spawn output: ' + data);
    if (strWhich == 'gpu') {
      // GPU
      // temp=47.2'C
      var numberPattern = /\d+\.\d+/;
      decimalTemperature = data.toString().match(numberPattern);
      if (strScale == 'fahrenheit') {
        // fahrenheit
        if (strType == 'integer') {
          strReturnedTemp = Math.round((decimalTemperature * 9 / 5) + 32);
        } else {
          if (strType == 'string') {
            strReturnedTemp = Math.round((decimalTemperature * 9 / 5) + 32).toString() + '°F';
          } else {
            strReturnedTemp = ((decimalTemperature * 9 / 5) + 32).toFixed(2);
          } // else from if strType == 'string...
        } // else from if (strType == 'int ...
      } else {
        // celsius
        if (strType == 'integer') {
          strReturnedTemp = Math.round(decimalTemperature).toString();
        } else {
          if (strType == 'string') {
            strReturnedTemp = Math.round(decimalTemperature).toString() + '°C';
          } else {
            strReturnedTemp = decimalTemperature.toString();
          } // end else if (strType == 'string...
        } // end else if (strType == 'int...
      } 
    } else {
      // CPU
      decimalTemperature = data / 1000;
      if (strScale == 'fahrenheit') {
        if (strType == 'integer') {
          strReturnedTemp = Math.round((decimalTemperature * 9 / 5) + 32);
        } else {
          if (strType == 'string') {
            strReturnedTemp = Math.round((decimalTemperature * 9 / 5) + 32).toString() + '°F';
          } else {
            strReturnedTemp = ((decimalTemperature * 9 / 5) + 32).toFixed(2);
          } // else from if strType == 'string...
        } // else from if (strType == 'int ...
      } else {
        // celsius
        if (strType == 'integer') {
          strReturnedTemp = Math.round(decimalTemperature);
        } else {
          if (strType == 'string') {
            strReturnedTemp = Math.round(decimalTemperature).toString() + '°C';
          } else {
            strReturnedTemp = decimalTemperature.toFixed(2);
          } // else from if (strType == 'string...
        } // else from if (strType == 'integer...
      } // else from if (strScale == 'fahren...
    } // End of if (strWhich)...
  });

  childD.stderr.on('data', function(data) {
    console.log('Spawn error: ' + data);
  });

  childD.stdout.on('close', function(code) {
    console.log('Spawn return: ' + code);
    if (code == 0) {
      callback(null, strReturnedTemp);
    } else {
      callback(null, 'N/A');
    }
  });
  // End of getTemperature()
}
