const express = require('express')
const JWT  = require('jsonwebtoken')
const CONFIG = require('./config')

const BarChartData = require('./Models/BarChartData.json')
const LinearChartData = require('./Models/LinearChartData.json')
const MultiBarChartData = require('./Models/MultiBarChartData.json')
const PieChartData = require('./Models/PieChartData.json')
const RadarChartData = require('./Models/RadarChartData.json')



const app = express()



app.post('/login',(req,res)=>{
    const {username,password} = req.body //read username and password from request body
    //we use static username and password but you can query on database here and check for username and password
    if(username === 'John' && password === '1234'){
        //now we have this user and create a json web token (JWT) with everything that we want
        const token = JWT.sign({userId:username,FirstName:'John',LastName:'Smith',PersonalCode:'123456'},'secretKey')
        res.json({jwt:token})
    }
    else{
        //just send status code 403 with a custome message
        res.status(403).send('Username or Password is Not Valid')
    }
})

app.get('/GetWithAuthentication',(req,res)=>{
    if(!req.header.authorization){
        res.status(403).send("Missing autorization header")
    }
    const authorization = req.get('authorization')
    const token = authorization.split(" ")[1]; //not select bearer
    try {
        var decoded = JWT.verify(token, 'secretKey');
        res.json({ ProductId : 100, ProductName : "Laptop", Price : "300$" })
      } catch(err) {
        res.status(403).send("Invalid autorization")
      }
})
app.get('/GetWithoutAuthentication',(req,res)=>{
    res.json({ ProductId: 100, ProductName : "Laptop", Price : "300$" });
})

app.get('/GetWithParameter',(req,res)=>{
    const {productId} = req.query
    res.json({ ProductId : productId, ProductName : `Laptop ${productId}`, Price : `${productId}$` })
})

app.post('/Call',(req,res)=>{
    const {ProductId} = req.body
    res.json({ ProductId : ProductId, ProductName : "Laptop", Price : "500$" })
})

app.get('/DrawBarChartFromFile',(req,res)=>{
    res.json(BarChartData)
})

app.get('/DrawBarChart',(req,res)=>{
    let charts = [];

    const barchart = {};
    barchart.name = "set1";
    barchart.setColor = [ "#7cb5ec", "#434348", "#90ed7d", "#f7a35c", "#8085e9", "#f15c80", "#e4d354", "#2b908f", "#f45b5b", "#91e8e1" ]
    barchart.points = [ { x : "USA", y : "24" }, { x : "Fiji", y : "38" }, { x : "UK", y : "77" }, { x : "Italy", y : "17" }, { x : "PR", y : "53" }, { x : "IR", y : "19" }, { x : "India", y : "99" }]
   
    
    charts.push(barchart)

    const dataset = {};
    dataset.datasets = charts;
    res.json(dataset)
})

app.get('/DrawMultiBarChart',(req,res)=>{
    let charts = [];

    const chart1 = {}
    chart1.name = "set1";
    chart1.setColor = [ "#004D40", "#8085e9", "#f15c80", "#e4d354", "#434348", "#90ed7d", "#f7a35c" ]
    chart1.points = [ { x : "Rome", y : "11" },  { x : "London", y : "43" },  { x : "Paris", y : "167" },  { x : "Bern", y : "17" } ]

   const chart2  = {}
    chart2.name = "set2";
    chart2.setColor = ["#7cb5ec", "#434348", "#90ed7d", "#f7a35c", "#8085e9", "#f15c80", "#e4d354" ]
    chart2.points =[{ x : "Rome", y : "12" },  { x : "London", y : "24" },  { x : "Paris", y : "125" },  { x : "Bern", y : "7" }]

    charts.push(chart1)
    charts.push(chart2)

    const dataset = {};
    dataset.datasets = charts;
    res.json(dataset)

})


app.get('/DrawPieChart',(req,res)=>{
    let charts = [];
    const dataset = {};

   const chart = {}
    chart.name = "set1";
    chart.setColor =  ["#7cb5ec", "#434348", "#90ed7d", "#f7a35c", "#8085e9", "#f15c80", "#e4d354", "#2b908f", "#f45b5b", "#91e8e1"]
    chart.points = [{ x : "USA", y : "24" },  { x : "Fiji", y : "38" },  { x : "UK", y : "77" },  { x : "Italy", y : "17" },  { x : "PR", y : "53" },  { x : "IR", y : "19" },  { x : "India", y : "99" }]
    charts.push(chart)
    dataset.datasets = charts;

    res.json(dataset)
})

app.get('/DrawRadarChart',(req,res)=>{
    let charts = [];
    const chart = {}
            chart.name = "set1";
            chart.fillColor = "#f15c80";
            chart.borderColor = "#8085e9";
            chart.points = [{ x : "USA", y : "24" }, { x : "Fiji", y : "38" }, { x : "UK", y : "77" }, { x : "Italy", y : "17" }, { x : "PR", y : "53" }, { x : "India", y : "99" }]
charts.push(chart)
const dataset = {}
dataset.datasets = charts;
res.json(dataset)
        })

app.get('/DrawMultiRadarChart',(req,res)=>{
   let charts =[];

            const chart1 = {}
            chart1.name = "set1";
            chart1.fillColor = "#f15c80";
            chart1.borderColor = "#8085e9";
            //   chart1.points =  {  { x = "USA", y = "24" },  { x = "Fiji", y = "38" },  { x = "UK", y = "77" },  { x = "Italy", y = "17" },  { x = "PR", y = "53" },  { x = "IR", y = "19" },  { x = "India", y = "99" } };
            chart1.points =  [{ x : "Rome", y : "42" },  { x : "London", y : "44" },  { x : "Paris", y : "95" },  { x : "Bern", y : "37" }]

            const chart2  = {}
            chart2.name = "set2";
            chart2.fillColor = "#7cb5ec";
            chart2.borderColor = "#434348";
            chart2.points = [{ x : "Rome", y : "12" },  { x : "London", y : "24" },  { x : "Paris", y : "125" },  { x : "Bern", y : "7" }]

            charts.push(chart1)
            charts.push(chart2)

            const dataset = {}
            dataset.datasets = charts
            res.json(dataset)
})

app.get('/DrawLinearChart',(req,res)=>{
   let charts = [];

    const chart = {}
    chart.name = "set1";
    chart.startColor = "#f15c80";
    chart.endColor = "#FFFFFF";
    chart.circleColor = "#51BBD1";
    chart.borderColor = "#8085e9";
    chart.points = [{ x : "USA", y : "24" }, { x : "Fiji", y : "38" }, { x : "UK", y : "77" }, { x : "Italy", y : "17" }, { x : "PR", y : "53" }, { x : "IR", y : "19" }, { x : "India", y : "99" }]

    charts.push(chart)

    const dataset = {}
    dataset.datasets = charts
    res.json(dataset)
})


app.get('/DrawMultiLinearChart',(req,res)=>{
    let charts = [];

    const chart1 = {}
    chart1.name = "set1";
    chart1.startColor = "#f15c80";
    chart1.endColor = "#FFFFFF";
    chart1.circleColor = "#51BBD1";
    chart1.borderColor = "#8085e9";
    chart1.points = [ { x : "Rome", y : "72" }, { x : "London", y : "84" }, { x : "Paris", y : "105" }, { x : "Bern", y : "57" } ]

    const chart2 = {}
    chart2.name = "set2";
    chart2.startColor = "#7cb5ec";
    chart2.endColor = "#434348";
    chart2.circleColor = "#90ed7d";
    chart2.borderColor = "#2b908f";
    chart2.points = [{ x : "Rome", y : "12" }, { x : "London", y : "24" }, { x : "Paris", y : "125" }, { x : "Bern", y : "7" }]

    charts.push(chart1)
    charts.push(chart2)

    const dataset = {}
    dataset.datasets = charts

    res.json(dataset)
})


app.get('/GridView',(req,res)=>{
    let data = [];

    data[0]=["Stone", "John", "28" ];
    data[1] = [ "Priya", "Ponnappa", "31" ];
    data[2] = [ "Wong", "Mia", "25" ];
    data[3] = [ "Stanbrige ", "Peter", "25" ];

    const GridData = {};
    GridData.data = data;

    res.json(GridData)

})


app.get('/GetItemList',(req,res)=>{
    const {pageindex,pagesize} = req.query
    let data = {};
    data.page = pageindex;
    data.totalPages = 10;
    data.toast = "test";

  let items= [];

 

    let index = (pageindex - 1) * pagesize;
    let j;
    for (let i = 0; i < pagesize; i++)
    {
         j = ++index;
         const item = {}
        
        item.id = j.toString();
        item.description = "description " + j.toString();
        item.left = "left " + j.toString();
        item.right = "right " + j.toString();
        item.title = "title " + j.toString();
        item.imageIcon = "http://api.androidhive.info/images/glide/medium/dory.jpg";
        items.push(item)
    }

    data.items = items;
    res.json(data)
})


app.get('/GetImageList',(req,res)=>{
    const imagesUrl = ["https://cdn.apgr.me/images/logo-1.png","https://cdn.apgr.me/images/logo-2.png", "https://cdn.apgr.me/images/logo-3.png","https://cdn.apgr.me/images/logo-4.png","https://cdn.apgr.me/images/logo-5.png","https://cdn.apgr.me/images/logo-6.png"]
        const {pageindex,pagesize} = req.query
        let data = {};
        data.page = pageindex;
        data.totalPages = 10;
        data.toast = "test";
    
      let items= [];
    
     
    
        let index = (pageindex - 1) * pagesize;
        let j;
        for (let i = 0; i < pagesize; i++)
        {
             j = ++index;
             const item = {}
            
            item.id = j.toString();
            item.caption = "Caption " + j.toString();
            item.subtitle = "Subtitle " + j.toString();
            item.imageSource = imagesUrl[Math.round(Math.random() * imagesUrl.length -1)]
            items.push(item)
        }
    
        data.items = items;
    res.json(data)
})


app.listen(process.env.PORT || CONFIG.PORT,CONFIG.HOST,()=>{
    console.log(`${CONFIG.SERVER_RUN_SUCCESS} ${process.env.PORT || CONFIG.PORT}`)
}) 