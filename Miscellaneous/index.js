// ~ 10/7/21; October 7, 2021

const { Toyhouse } = require('../index.js')

const PixelLeafs_URL = 'https://toyhou.se/PixelLeaf'
const Syias_URL = 'https://toyhou.se/4182489.syia'

const PixelLeaf = new Toyhouse(PixelLeafs_URL)
const Syia = new Toyhouse(Syias_URL)

PixelLeaf.Characters(1, 'Names').then(Characters => {
    console.log(Characters)
})

// Syia.All().then(Syia => console.log(Syia))