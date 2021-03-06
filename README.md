# raspi-temp
JavaScript functions to query the Raspberry Pi's CPU in celsius or fahrenheit and perhaps later, the GPU temperature as well

A lot of people probably think that you'd need to purchase a [Sense Hat](https://www.adafruit.com/product/2738) at $40 in order to ask the Pi how hot it is.  Clearly, if the Desktop which comes with the PIXEL version of Raspbian has access to the temperature of the Pi itself, then so should you.

## Express
Given that most people in the coding space are familiar with Express, this is the demonstration piece for these functions but all you need is the raspi-temp.js file for your own project.  You'd be expected to extract that out and then query the function(s) as necessary.

## Installation
`SSH` into the Raspberry Pi (of any type) and run the following, say, under a Sites folder.

```
$ cd ~
$ mkdir Sites
$ cd Sites
$ git clone --depth 1 https://github.com/OutsourcedGuru/raspi-temp.git
$ cd raspi-temp
$ npm install
$ DEBUG=raspi-temp:* npm start
```

From another computer, you'd then open up a browser session to something like `http://name-of-pi-host.local:3000`.  The home page of this simple site should exercise the JavaScript function to display the CPU temperature in fahrenheit as a demonstration.

## getTemperature(which, scale, type)
I've tried to create an easy-to-use interface here.

### which
Either 'cpu' or 'gpu' as a string should select which chip's temperature you're interested in, with 'cpu' as the default.

### scale
Either 'celsius' or 'fahrenheit' as a string should select which scale you're interested in, with 'fahrenheit' as the default.

### type
Use 'integer', 'decimal(2)' for a decimal with two digits of precision, or 'string' if you want to see the degree symbol plus either 'F' or 'C' at the end, with 'string' as the default.  As of v1.0.0, null/integer/string are recognized and anything else returns decimal(2).

### returns
The function will return a string or a number, depending upon that third argument.

## Examples
```
var strTempCPU = getTemperature('cpu', 'fahrenheit');
console.log('The CPU temperature is ' + strTempCPU);
```
...or more directly...
```
console.log('The CPU temperature is ' + getTemperature());
```

In case you need the temperature as a number...
```
console.log('The GPU temperature is ' + getTemperature('gpu', 'celsius', 'integer').toString() + '°C');
```

|Donate||Cryptocurrency|
|:-----:|---|:--------:|
| ![eth-receive](https://user-images.githubusercontent.com/15971213/40564950-932d4d10-601f-11e8-90f0-459f8b32f01c.png) || ![btc-receive](https://user-images.githubusercontent.com/15971213/40564971-a2826002-601f-11e8-8d5e-eeb35ab53300.png) |
|Ethereum||Bitcoin|
