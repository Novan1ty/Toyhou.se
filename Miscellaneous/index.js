import Toyhouse from '../index.js'

const URL = 'https://toyhou.se/4182489.syia'
const Syia_Toyhouse = new Toyhouse(URL)

Syia_Toyhouse.Creator().then(Syia => {
    console.log(Syia)
})