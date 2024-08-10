const { Schema, model } = require('mongoose');
const { isURL } = require('validator');

const JobSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
        },
        slug: {
            type: String,
            unique: true,
            required: [true, "Slug is required"],
        },
        description: {
            type: String,
            required: [true, "Description is required"],
        },
        thumbnailID: {
            type: String
        },
        thumbnail: {
            type: String,
            required: [true, "Thumbnail is required"],
        },
        status: {
            type: String,
            enum: ["published", "draft"],
            default: "published"
        },
        resourceURL: {
            type: String,
            required: [true, "Resource URL is required"],
            validate: [isURL, "Resource URL should be a valid URL"]
        }
    },
    { timestamps: true }
);

module.exports = model('jobs', JobSchema);