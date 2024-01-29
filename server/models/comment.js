import { Schema, model, models } from "mongoose";

// Define a Comment schema
const commentSchema = new Schema({
    id: { type: Number, required: true, unique: true, },
    content: { type: String, required: true },
    postId: { type: Schema.Types.ObjectId, required: true },
    commentedAt: { type: Date, required: true, default: new Date() },
    parentId: { type: String },
    username: String,
});

// Create a Comment model
const Comment = models.Comment || model('Comment', commentSchema);

export default Comment;