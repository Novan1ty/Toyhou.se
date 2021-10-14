// Toyhou.se ~ 10/7/21; October 7, 2021

const Fetch = require('node-fetch')
const Cheerio = require('cheerio')

/**
 * The Toyhou.se Class
 */
class Toyhouse {
    /**
     * @param {String} URL The URL of the Character
     */
    constructor(URL) {
        if (!URL) throw new Error('"URL" has to be a URL of a Character.')
        if (!URL.includes('toyhou.se')) throw new Error('"URL" has to be a valid URL of a Character.')

        this.URL = URL
        this.Gallery_URL = URL + '/gallery'
    }

    /**
     * Returns an object of the creator.
     */
    async Creator() {
        const Body = await this.Load_Body()
        const $ = Cheerio.load(Body)

        const Creator = $('.display-user')
        const Creator_Username = $('.display-user-username')
        const Creator_Avatar = $('.display-user-avatar')

        const Creator_URL = (Creator.find('a'))[0].attribs.href
        const Username = Creator_Username.text()
        const Avatar = Creator_Avatar[0].attribs.src
        
        // console.log(Avatar)

        return { URL: Creator_URL, Username: Username, Avatar: Avatar }
    }
    /**
     * Returns an object of the character.
     */
    async Character() {
        const Body = await this.Load_Body()
        const $ = Cheerio.load(Body)

        const Name = $('.display-4').text()
        const Avatar = $('.profile-name-icon')[0].attribs.src
        return { Name: Name, Avatar: Avatar }
    }
    /**
     * Returns an array of strings of the character's profile.
     * @returns {Promise<String[]>}
     */
    async Profile() {
        const Body = await this.Load_Body()
        const $ = Cheerio.load(Body)

        const Profile = []

        $('.profile-content-content p').each((I, Element) => {
            const Content = $(Element).text()
            if (!Content) return;

            Profile.push(Content)
        })
        $('.profile-content-content ul li').each((I, Element) => {
            const Content = $(Element).text()
            Profile.push(Content)
        })

        return Profile
    }
    /**
     * Returns an array of image URLs from the character's gallery.
     * @returns {Promise<String[] | URL[]>}
     */
    async Gallery() {
        const Body = await this.Load_Body(this.Gallery_URL)
        const $ = Cheerio.load(Body)

        const Gallery = []

        const Images = $('.gallery-item .gallery-thumb .thumb-image a')
        Images.each((I, Element) => {
            const Image = $(Element)[0].attribs.href
            if (!Image) return;
            
            Gallery.push(Image)
        })

        return Gallery
    }
    /**
     * Returns the date of creation of the character.
     */
    async Creation() {
        const Body = await this.Load_Body()
        const $ = Cheerio.load(Body)

        const Creation = $('.tooltipster')
        const Created = Creation.text()
        const Date_n_Time = Creation[0].attribs.title

        return { Created: Created, 'Date & Time': Date_n_Time }
    }
    /**
     * Returns an array of tags of the character.
     * @returns {Promise<String[]>}
     */
    async Tags() {
        const Body = await this.Load_Body()
        const $ = Cheerio.load(Body)

        const Tags = []

        $('.profile-tags-content')
        .children().each((I, Element) => {
            const Tag = $(Element).text()
            Tags.push(Tag)
        })

        return Tags
    }

    /**
     * Returns an object of the character's information.
     */
    async All() {
        const Creator = await this.Creator()
        const Info = await this.Character()
        const Profile = await this.Profile()
        const Gallery = await this.Gallery()
        const Creation = await this.Creation()
        const Tags = await this.Tags()

        return {
            Creator: Creator, Info: Info,
            Profile: Profile, Gallery: Gallery,
            Creation: Creation, Tags: Tags
        }
    }

    /**
     * Returns a string representation of the body.
     * @param {String | URL} URL
     */
    async Load_Body(URL) {
        return await this.Body_String(URL)
    }
    /**
     * Returns a string representation of the HTML.
     * @param {String | URL} URL
     */
    async Body_String(URL) {
        const Response = await Fetch(URL || this.URL)
        const Body = await Response.text()

        return Body
    }
}

module.exports = { Toyhouse }