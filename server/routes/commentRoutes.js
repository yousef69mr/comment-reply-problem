import express from "express"
const router = express.Router()

router.route('/').get((req, res) => {
    res.status(200).json({ message: "Hello from DALL.E" })
})

router.route('/').post(async (req, res) => {
    try {

        const { prompt } = req.body

        const response = await openai.createImage({
            prompt,
            n: 1,
            size: "1024x1024",
            response_format: "b64_json"
        })
        console.log(response.data)

        const image = response.data.data[0].b64_json

        res.status(200).json({ photo: image })

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Something went Wrong" })
    }
})

export default router
