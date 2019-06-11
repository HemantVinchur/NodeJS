const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

const config = require('./config');

app.use(morgan('dev'))
app.use(bodyParser())

app.use((req, res, next) => {
    console.log(req.params, "Params");
    console.log(req.query, "Query");
    console.log(req.body, "Body");
    next();
});

let userData = [
    {
        name: "Hemant",
        mobileNo: "7869044206",
        movies: ['dnjb', 'csdv', 'vwvdghsv'],
        address: {
            street: '123 nyc',
            city: 'Indore',
            country: 'India'
        }
    },
    {
        name: "Aniket",
        mobileNo: "568974123",
        movies: ['dbdsjbb', 'sbdvbhj', 'vwxnjbh'],
        address: {
            street: '123 nyc',
            city: 'Indore',
            country: 'India'
        }
    }
];

app.get('/getUser', (req, res) => {
    let id = req.query.id;
    res.json(userData[id])
})

app.post('/addUser', (req, res) => {
    console.log('Hi')
    let data = req.body
    userData.push(data)
    console.log('created')
    // if(res.json(userData)!=null){
    //     res.json("Successful")
    // }else{
    //     res.json("Failed")
    // }
    res.sendstatus(201)
});
app.put('/updateUser', (req, res) => {
    // Object.assign(profile, req.body)
    // console.log('updated', profile)
    // res.sendstatus(201)
    let data = req.body
    userData.splice(2,0,data);
    res.json(userData)
});

app.delete('/deleteUser', (req, res) => {
    console.log('1111')
    userData.splice(2,1);
    console.log('2222')
    res.json(userData)
})

//catch 404 error i.e. not found
app.use((req, res, next) => {
    next("Not found");
});
app.use((error, req, res, next) => {
    console.log(error);
    res.json(error);
});

app.listen(config[process.argv[2]].port, () => {
    console.log(`Server running @ ${config[process.argv[2]].port}`);
});