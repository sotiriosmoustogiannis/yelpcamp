const mongoose = require('mongoose')
const Review = require('./review')

// https://res.cloudinary.com/douqbebwk/image/upload/w_300/v1600113904/YelpCamp/gxgle1ovzd2f3dgcpass.png

const ImageSchema = new mongoose.Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_150');
});


const campgroundSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    price: {
        type: Number,
        min: 0
    },
    images: [ImageSchema],
    description: {
        type: String,
    },
    location: {
        type: String,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
})

campgroundSchema.post('findOneAndDelete', async function (camp) {
    if (camp.reviews.length) {
        const res = await Review.deleteMany({ _id: { $in: camp.reviews } })
        console.log(res)
    }
})

const Campground = mongoose.model('Campground', campgroundSchema)

module.exports = Campground