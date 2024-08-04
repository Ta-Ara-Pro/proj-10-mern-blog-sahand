import express from 'express'

const app = express(); //create the application

app.listen(3000, () => {
    console.log('Server is running at port 3000')
})