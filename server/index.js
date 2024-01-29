import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import postRoutes from '../routes/postRoutes'
import commentRoutes from './routes/commentRoutes'

const app = express();
const port = 3000;

app.use(express.json());

// Connect to MongoDB (replace 'your-database-uri' with your actual MongoDB URI)
mongoose.connect('mongodb+srv://root:toor@cluster0.rklht9r.mongodb.net/COMMENT-REPLY-PROBLEM?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
});

app.use(cors())
app.use(express.json({ limit: '50mb' }))
// app.use('/api/posts', postRoutes)
// app.use('/api/posts/:postId/comments', commentRoutes)
// app.use('/api/posts/:postId/replies', commentRoutes)

// // Define a route to get the post from the database
// app.get('/api/post', async (req, res) => {
//     try {
//         // Find the post in the database
//         const foundPost = await Comment.findOne({ id: 64 });
//         res.json(foundPost);
//     } catch (error) {
//         res.status(500).send('Internal Server Error');
//     }
// });



// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});