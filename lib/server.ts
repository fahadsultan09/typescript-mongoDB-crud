
import app from './config/app'
import env from './environments'

const PORT = env.getPort()
app.listen(PORT, () => {
    console.log("EXPRESS RUNNING <====>", PORT)
})