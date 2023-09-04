const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities')
const { descriptors, places } = require('./seedHelpers')


mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

// Campground.insertMany(cities)
//     .then(res => {
//         console.log(res)
//     })
//     .catch(e => {
//         console.log(e)
//     })

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            author: '64e735d1d87d091fac992ee0',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/dztbyx92f/image/upload/v1693390563/YelpCamp/ymzsv6rvo5shs519iijf.jpg',
                    filename: 'YelpCamp/ymzsv6rvo5shs519iijf',
                },
                {
                    url: 'https://res.cloudinary.com/dztbyx92f/image/upload/v1693390561/YelpCamp/h0cj27z3cstu7u9gvxh7.jpg',
                    filename: 'YelpCamp/h0cj27z3cstu7u9gvxh7',
                }
            ],
            price: 30,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit dolor eum distinctio a possimus iure architecto, vitae dolorem est inventore beatae laborum quis minima voluptatem culpa sequi nisi veritatis ad!'
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})