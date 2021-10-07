import Toyhouse from '../index.js'

const URL = 'https://toyhou.se/4182489.syia'
const Syia_Toyhouse = new Toyhouse(URL)

const Syia = async () => {
    const Syia = await Syia_Toyhouse.All()
    console.log(Syia)
}
Syia()