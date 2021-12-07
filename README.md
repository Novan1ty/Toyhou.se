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

const Syias_URL = 'https://toyhou.se/4182489.syia'
const Syia = new Toyhouse(Syias_URL)

Syia.Links('PixelLeaf').then(Links => console.log(Links))
Syia.All().then(Syia => console.log(Syia))
```

### Setup
```js
// Toyhou.se API

const Fetch = require('node-fetch')

const Syia = 'https://toyhou.se/4182489.syia'
const Toyhouse_API = 'https:/toyhouse.novan1ty.repl.co/all?url=' + Syia
const Novanity = 'https://novanitys-api.novan1ty.repl.co/toyhou.se/all?url=' + Syia
```

### Retrieving Data
```js
// First Method

const Response = await Fetch(YOUR_CHOSEN_API)
const All = await Response.json()

console.log(All)

// Second Method

Fetch(YOUR_CHOSEN_API)
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
- `Links()`

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

    - December 7, 2021
        - New User Method: `Links()`
        - Username parameter for user methods.