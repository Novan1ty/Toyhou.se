# Toyhou.se
Toyhou.se is a basic project for web scraping [Toyhou.se](Toyhou.se)

Creator: `Novanity#1148`

## Features
- Easy-To-Use
- Easy-To-Understand
- 100% Beginner-Friendly

## API
[Novanity's API](https://novanitys-api.novan1ty.repl.co/)

## Examples
```js
// Toyhou.se

const { Toyhouse } = require('toyhou.se')

const URL = 'https://toyhou.se/4182489.syia'
const Syia_Toyhouse = new Toyhouse(URL)

Syia_Toyhouse.All().then(Syia => {
    console.log(Syia)
})
```
```js
// Novanity's API

const Fetch = require('node-fetch')

const Syia = 'https://toyhou.se/4182489.syia'
const Novanity = 'https://novanitys-api.novan1ty.repl.co/toyhou.se/all?url=' + Syia

// Method 1

const Response = await Fetch(Novanity)
const All = await Response.json()

console.log(All)

// Method 2

Fetch(Novanity)
.then(Response => Response.json())
.then(All => console.log(All))

```

## Methods
- `Creator`
- `Character`
- `Profile`
- `Gallery`
- `Created`
- `Tags`

## Updates
- V1
    ### Methods
    - `Creator`
    - `Character`
    - `Profile`
    - `Gallery`
    - `Created`
    - `Tags`