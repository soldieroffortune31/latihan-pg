const { Pool } = require('pg');
const cryptojs = require('crypto-js');
// const db = require('../konektor');
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'admin',
    database: 'latihan-pg',
    port: 5432
})

pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack)
    }
    client.query('SELECT NOW()', (err, result) => {
      release()
      if (err) {
        return console.error('Error executing query', err.stack)
      }
      console.log(result.rows)
    })
});



module.exports = {
    createUser : async (req, res) => {
        const {id, nama, username, password} = req.body;
        
        try {
            const create = await pool.query('insert into users(id, nama, username, password) values ($1, $2, $3, $4)',[id, nama, username, password]);
            res.status(200).json({message: 'berhasil', code:200, data : create});
        } catch (error) {
            res.status(400).json({message: 'gagal', code:400})
        }
    },
    deleteUser : async (req, res) => {
        const id = req.params.id;
        const find = await pool.query('select * from users where id=$1',[1])
        if(find){
            try {
                const del = await pool.query('delete from users where id=$1',[id]);
                res.status(200).json({message : 'berhasil', code:200});
            } catch (error) {
                res.status(400).json({message : 'gagal', code:400})
            }
        }
    },
    getUsers : async (req, res) => {
        try {
            const find = await pool.query('select * from users')
            res.status(200).json({message: 'berhasil', code:200, data: find.rows});
        } catch (error) {
            res.status(400).json({message: 'error', code:400})
        }
    },
    getUserByID : async (req, res) => {
        const id = req.params.id;
        try {
            const find = await pool.query('select * from users where id=$1',[id]);
            if(find){
                res.status(200).json({message: 'berhasil', code:200, data: find.rows[0]})
            }else{
                res.status(400).json({message: 'data tidak ditemukan', code:400})
            }
        } catch (error) {
            res.status(400).json({message: 'error', code:400})
        }
    }

    // tesString : async (req, res) => {
    //     let nama = cryptojs.SHA1(req.body.nama);
    //     let sha256 = cryptojs.HmacSHA256('4dmin'+'&', nama.toString())
    //     let hash = sha256.toString(cryptojs.enc.Base64);
    //     // let nama = cryptojs.SHA256(req.body.nama);
    //     // let hash = nama.toString(cryptojs.enc.Base64);
    //     var words = cryptojs.enc.Base64.parse("SGVsbG8sIFdvcmxkIQ==");
    //     var txt = cryptojs.enc.Utf8.stringify(words)
    //     console.log(words);
    //     res.status(200).json({hash : hash});
    // }
}