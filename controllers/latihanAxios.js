const axios = require('axios');

module.exports = {
    getData : async (req, res) => {
        const data = await axios.get('https://api-pesantren-indonesia.vercel.app/pesantren/3513.json')
        data.data.forEach(element => {
            console.log(element.nama)
        });
        res.status(200).json({message: 'berhasil', data: data.data})
    }
}