const jwt = require('jsonwebtoken');
const CryptoJS = require('crypto-js');

module.exports = {
    getToken : (req, res) => {
        const {username, password} = req.body;
        if(username === 'timInova' && password === '1Team1Semangat1Tujuan'){
            const token = jwt.sign({
                username : username
            }, 'ini rahasia', {expiresIn: 600})
            var txt = CryptoJS.SHA1('heeh').toString()
            console.log(txt)
            res.json({token: token, status : 200})
            // console.log(response.statusCode);
        }else{
            res.status(400).json({message : 'Login Gagal'})
        }
    },

    enkripsiConsId : (req, res) => {
        var cons_id = '1234'
        var d = new Date()
        var date = d.getDate()
        var month = d.getMonth() + 1
        var year = d.getFullYear()
        var skrng = year+('0'+month).slice(-2)+('0'+date).slice(-2)
        var hash = CryptoJS.AES.encrypt(cons_id, skrng).toString();
        res.status(200).json({key : hash})
    },

    check : (req, res) => {
        var cons_iddb = '1234';
        var d = new Date()
        var date = d.getDate()
        var month = d.getMonth() + 1
        var year = d.getFullYear()
        var skrng = year+('0'+month).slice(-2)+('0'+date).slice(-2)
        
        const key = req.headers.key 
        const dcrypt = CryptoJS.AES.decrypt(key, skrng);
        const txt = dcrypt.toString(CryptoJS.enc.Utf8)
        console.log(txt)


    }
}