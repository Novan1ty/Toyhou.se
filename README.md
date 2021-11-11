# Toyhou.se
Toyhou.se is a basic project for web scraping [Toyhou.se](Toyhou.se)

Creator: `Novanity#1148`

## Features
- Easy-To-Use
- Easy-To-Understand
- 100% Beginner-Friendly

## APIs
[Toyhou.se | API](https://toyhouse.novan1ty.repl.co/) (Recommended)

[Novanity's API](https://novanitys-api.novan1ty.repl.co/)

## Examples
```js
// Toyhou.se

const Toyhouse = require('toyhou.se')

const PixelLeafs_URL = 'https://toyhou.se/PixelLeaf'
const Syias_URL = 'https://toyhou.se/4182489.syia'

const PixelLeaf = new Toyhouse(PixelLeafs_URL)
const Syia = new Toyhouse(Syias_URL)

PixelLeaf.Characters(1, 'Names').then(Characters => {
    console.log(Characters)
})

Syia.All().then(Syia => console.log(Syia))
```

### Setup
```js
// Toyhou.se API

const Fetch = require('node-fetch')

const Syia = 'https://toyhou.se/4182489.syia'
const Novanity = 'https://novanitys-api.novan1ty.repl.co/toyhou.se/all?url=' + Syia

// Or...

const Toyhouse_API = 'https:/toyhouse.novan1ty.repl.co/all?url=' + Syia
```

### Retrieving Data
```js
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

### Character

- `Creator()`
- `Character()`
- `Profile()`
- `Gallery()`
- `Creation()`
- `Tags()`
- `All()`

### User

- `Stats()`
- `Characters()`
- `Arts()`
- `Favorites()`
- `Registration()`
- `Worlds()`
- `Literatures()`
- `Username_Log()`

- - -

## Updates
- V1
    ### Methods
    - `Creator()`
    - `Character()`
    - `Profile()`
    - `Gallery()`
    - `Creation()`
    - `Tags()`
    - `All()`
- V2
    - Added User Methods.
        - `Status()`
        - `Characters()`
        - `Arts()`
        - `Favorites()`
        - `Registration()`
        - `Worlds()`
        - `Literatures()`
        - `Username_Log()`
    - Faster Response.