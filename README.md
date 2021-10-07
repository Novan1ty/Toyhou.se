# Toyhou.se
Toyhou.se is a basic project for web scraping [Toyhou.se](Toyhou.se)

Creator: `Novanity#1148`

## Features
- Easy-To-Use
- Easy-To-Understand
- 100% Beginner-Friendly

## Example
```js
import Toyhouse from '../index.js'

const URL = 'https://toyhou.se/4182489.syia'
const Syia_Toyhouse = new Toyhouse(URL)

const Syia = async () => {
    const Syia = await Syia_Toyhouse.All()
    console.log(Syia)
}
Syia()
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