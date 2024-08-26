export const test = async(req, res) => {
    try {
        res.json({ "1" :'API is working!',"2": 'user data'})
    } catch (error) {
        console.error('Error in fetching data:', error)
        res.status(500).json({ message: 'Internal server error' })
    }
 
}