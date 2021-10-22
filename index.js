// Toyhou.se ~ 10/7/21; October 7, 2021

const Fetch = require('node-fetch')
const Cheerio = require('cheerio')
const { User } = require('discord.js')

/**
 * The Toyhou.se Class
 */
class Toyhouse {
    /**
     * @param {String} URL The URL of the Character
     */
    constructor(URL) {
        this.URL_Error =  new Error('"URL" has to be a URL of a character or user.')
        if (!URL || !URL.includes('https://toyhou.se/')) throw this.URL_Error

        this.URL = URL
        this.Gallery_URL = URL + '/gallery'
    }

    // Character ~ 10/7/21; October 7, 2021

    /**
     * Returns the creator of a character.
     */
    async Creator() {
        const Body = await this.Load_Body()
        const $ = Cheerio.load(Body)

        const Username = $('.display-user-username').text()
        const Avatar = $('.display-user-avatar').attr('src')
        const Creator_URL = $('.display-user').find('a').attr('href')
        
        // console.log(Avatar)

        return {
            Username: Username,
            Avatar: Avatar,
            Creator_URL: Creator_URL }
    }
    /**
     * Returns the name and avatar of a character.
     */
    async Character() {
        const Body = await this.Load_Body()
        const $ = Cheerio.load(Body)

        const Name = $('.display-4').text()
        const Avatar = $('.profile-name-icon').attr('src')
        return { Name: Name, Avatar: Avatar }
    }
    /**
     * Returns the profile of a character.
     * @returns {Promise<String[]>}
     */
    async Profile() {
        const Body = await this.Load_Body()
        const $ = Cheerio.load(Body)

        const Characters_Profile = []

        const Profile = $('.profile-content-content p')
        const Others = $('.profile-content-content ul li')

        Profile.each((I, Element) => {
            const Content = $(Element).text()
            if (!Content) return;

            Characters_Profile.push(Content)
        })
        Others.each((I, Element) => {
            const Content = $(Element).text()
            Characters_Profile.push(Content)
        })

        return Characters_Profile
    }
    /**
     * Returns the gallery of a character.
     * @returns {Promise<String[] | URL[]>}
     */
    async Gallery() {
        const Body = await this.Load_Body(this.Gallery_URL)
        const $ = Cheerio.load(Body)

        const Arts = []

        const Art = $('.gallery-item .gallery-thumb .thumb-image a')
        Art.each((I, Element) => {
            const Art = $(Element).attr('href')
            if (!Art) return;
            
            Arts.push(Art)
        })

        return Arts
    }
    /**
     * Returns the date of creation of a character.
     */
    async Creation() {
        const Body = await this.Load_Body()
        const $ = Cheerio.load(Body)

        const Creation = $('.tooltipster')
        const Created = Creation.text()
        const Date_n_Time = Creation.attr('title')

        return { Created: Created, 'Date & Time': Date_n_Time }
    }
    /**
     * Returns tags of a character.
     * @returns {Promise<String[]>}
     */
    async Tags() {
        const Body = await this.Load_Body()
        const $ = Cheerio.load(Body)

        const Tags = []

        const Characters_Tags = $('.profile-tags-content').children()
        Characters_Tags.each((I, Element) => {
            const Tag = $(Element).text()
            Tags.push(Tag)
        })

        return Tags
    }

    /**
     * Returns all of a character's information.
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

    // User ~ 10/19/21; October 19, 2021

    // Stats & Characters ~ 10/19/21; October 19, 2021

    /**
     * Returns the stats of a user.
     */
    async Stats() {
        const Body = await this.Load_Body(this.URL + '/stats')
        const $ = Cheerio.load(Body)

        const User = $('.display-user a')
        const Username = User.first().text()
        const Avatar = User.find('img').attr('src')

        const User_Stats = $('.stats-content dl')
        
        const Values = []
        User_Stats.find('.field-value').each((I, Element) => {
            let Value = $(Element).text().split('')
            Value = Value.filter(Character => Character !== '\n')

            Values.push(Value.join(''))
        })

        // console.log(Values)

        return {
            Username: Username, Avatar: Avatar,
            Time_Registered: Values[0],
            Last_Logged_In: Values[1],
            Invited_By: Values[2],
            Characters: Values[3],
            Images: Values[4],
            Literatures: Values[5],
            Words: Values[6],
            Forum_Posts: Values[7],
            Subscribed_To: Values[8],
            Subscribed_To_By: Values[9],
            Authorizing: Values[10],
            Authorized_By: Values[11]
        }
    }
    /**
     * Returns the name(s) and avatar(s) of a character
     * from a certain page.
     * 
     * ### Function
     * - Names
     * - Avatar
     * 
     * @param {Number | String} Page Default: `1`
     * @param {String} Function Default: `null`
     * @returns {Promise<string[] | object[]>}
     */
    async Characters(Page = 1, Function = null) {
        if (typeof Function === 'string') Function = Function.toLowerCase()

        const Page_Error = new Error('"Page" has to be a page number.')
        if (!Page || isNaN(Page)) throw Page_Error

        const Body = await this.Load_Body(this.URL + '/characters/folder:all?page=' + Page)
        const $ = Cheerio.load(Body)
        
        const Characters = []

        const Character = $('.gallery-row .gallery-item')
        Character.each((I, Element) => {
            const All = $(Element)

            const Name = All.find(
                '.thumb-caption .thumb-character-name a'
            ).text()
            const Avatar = All.find('.thumb-image a img').attr('src')

            Characters.push({ Name: Name, Avatar: Avatar })
        })

        return Characters
    }
    /**
     * Returns a user's arts from a certain page.
     * 
     * @param {Number | String} Page Default: `1`
     * @returns {Promise<string[]>}
     */
    async Arts(Page = 1) {
        const Page_Error = new Error('"Page" has to be a page number.')
        if (!Page || isNaN(Page)) throw Page_Error

        const Body = await this.Load_Body(this.URL + '/art?page=' + Page)
        const $ = Cheerio.load(Body)
    
        const Arts = []

        const Gallery = $('.gallery-thumb .thumb-image')
        Gallery.each((I, Element) => {
            const Gallery = $(Element).find('a')
            // console.log(Gallery)

            Arts.push(Gallery.attr('href'))
        })

        return Arts
    }
    /**
     * Returns a user's favorite character(s) from
     * a certain page.
     * 
     * @param {Number | String} Page Default: `1`
     * @returns {Promise<string[]>}
     */
    async Favorites(Page = 1) {
        const Page_Error = new Error('"Page" has to be a page number.')
        if (!Page || isNaN(Page)) throw Page_Error

        const Body = await this.Load_Body(this.URL + '/favorites?page=' + Page)
        const $ = Cheerio.load(Body)
        
        const Favorites = []

        const Characters = $('.gallery-item')
        Characters.each((I, Element) => {
            const Favorite_Character = {}

            const Character = $(Element)
            const Name = Character.find('.thumb-caption .thumb-character-name').text()
            const Avatar = Character.find('.thumb-image a img').attr('src')

            Favorite_Character.Name = Name
            Favorite_Character.Avatar = Avatar

            Favorites.push(Favorite_Character)
        })

        return Favorites
    }
    /**
     * Returns the date and time of registration of a user.
     */
    async Registration() {
        const Body = await this.Load_Body(this.URL + '/stats')
        const $ = Cheerio.load(Body)

        const User_Stats = $('.stats-content dl')
        const Time_Registered = User_Stats.find('.field-value')
        const Registration = Time_Registered.first().text().slice(1, -1)

        return Registration
    }
    /**
     * Returns the worlds of a user.
     * 
     * @param {Number | String} Page Default: `1`
     * @param {String} Function Default: `null`
     * @returns {Promise<string[] | object[]>}
     */
    async Worlds(Page = 1) {
        const Page_Error = new Error('"Page" has to be a page number.')
        if (!Page || isNaN(Page)) throw Page_Error

        const Body = await this.Load_Body(this.URL + '/worlds?page=' + Page)
        const $ = Cheerio.load(Body)

        // console.log(Body)
    
        const Worlds = []

        const World = $('.gallery-row .gallery-item')
        World.each((I, Element) => {
            const All = $(Element)

            const Name = All.find('.group-name').text().slice(1, -1)

            const World = All.find('.thumb-image a')
            const Thumbnail = World.find('img').attr('src')
            const World_URL = World.attr('href')

            Worlds.push(
                {
                    Name: Name,
                    Thumbnail: Thumbnail,
                    World_URL: World_URL
                }
            )
        })

        return Worlds
    }
    /**
     * Returns the literatures of a user.
     * 
     * @param {Number | String} Page Default: `1`
     * @param {String} Function Default: `null`
     * @returns {Promise<string[] | object[]>}
     */
    async Literatures(Page = 1) {
        // This is a pain to make. ~ 10/19/21; October 19, 2021
        
        const Page_Error = new Error('"Page" has to be a page number.')
        if (!Page || isNaN(Page)) throw Page_Error

        const Body = await this.Load_Body(this.URL + '/literatures?page=' + Page)
        const $ = Cheerio.load(Body)
    
        const Literatures = []

        const Library = $('.literatures .literature .card .card-block')
        Library.each((I, Element) => {
            // Phosphini is a great example for literatures.
            // Phosphini: https://toyhou.se/Phosphini
            
            const All = $(Element)

            let Literature = All.find('.display-literature a')
            Literature = $(Literature)
            
            // const Anchor = $(Literature)
            // console.log(Anchor.attr('href'))

            const Title = Literature.text()

            const Literature_Content = All.find('.literature-header-content')

            const Thumbnail = Literature_Content.find('img').attr('src')
            const Description = Get_Text('.literature-header-blurb').slice(1, -1)
            const Subinfo = Get_Text('.literature-header-subinfo').slice(4, -3)

            const Author = Get_Text(
                '.literature-header-authors .literature-header-row-value a'
            )
            const Date_n_Time = Literature_Content.find(
                '.literature-header-published .literature-header-row-value abbr'
            ).attr('title')

            const Stats = Literature_Content.find('.literature-header-stats')

            const Chapters = Stats.find(
                '.literature-header-row-chapters'
            ).attr('title')
            const Words = Get_Stats(
                '.literature-header-row-words'
            ).slice(1, -1)
            const Favorites = Get_Stats('.literature-header-row-favorites').slice(1)

            const Warnings = Get_Stats('.literature-header-warnings')
            const Literature_URL = 'https://toyhou.se' + Literature.attr('href')

            Literatures.push(
                {
                    Title: Title,
                    Description: Description || null,
                    Thumbnail: Thumbnail,
                    Author: Author,
                    Published_On: Date_n_Time,
                    Chapters: Chapters,
                    Words: Words,
                    Favorites: Favorites || null,
                    Warnings: Warnings || Subinfo || null,
                    Literature_URL: Literature_URL
                }
            )
            
            function Get_Stats(Tag) {
                return Stats.find(Tag).text()
            }
            function Get_Text(Tag) {
                return Literature_Content.find(Tag).text()
            }
        })

        return Literatures
    }
    /**
     * Returns a user's username log.
     * @returns {Promise<object[]>}
     */
    async Username_Log() {
        const Body = await this.Load_Body(this.URL + '/stats/usernames')
        const $ = Cheerio.load(Body)

        const Username_Log = []

        const Main = $('.content-main .table-striped tbody .row')
        
        Main.each((I, Element) => {
            const All = $(Element)

            const Date_n_Time = All.find('.col-3 abbr').attr('title')
            const Usernames = All.find('.col-9 strong')
            
            const Before = Usernames.first().text()
            const After = Usernames.last().text()

            Username_Log.push(
                {
                    Before: Before,
                    After: After,
                    'Date & Time': Date_n_Time
                }
            )
        })

        return Username_Log
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

        if (Body.includes('Invalid user selected.')) throw this.URL_Error

        return Body
    }
}

module.exports = { Toyhouse }