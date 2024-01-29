import { Schema, model, models } from "mongoose";

// Define a Comment schema
const postSchema = new Schema({
    id: { type: Number, required: true, unique: true, },
    content: { type: String, required: true },
    postsOn: { type: Date, required: true, default: new Date() },
    username: String,
});

// Create a Post model
const Post = models.Post || model('Post', postSchema);

export default Post; 