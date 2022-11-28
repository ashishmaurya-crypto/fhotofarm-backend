const _ = require('lodash');

const items = [1,[2, [ 3, 4]]];

const newItem = _.flattenDeep(items);

console.log(newItem);





// const http = require('http');

// const server = http.createServer((req, res)=>{
//     if(req.url === '/'){
//         res.end('welcome to our home page')
//     }
//     if(req.url === '/about'){
//         res.end('welcome to our about page')
//     }
//     res.end(`<h1>Oopsss</h1>`)
// })

// server.listen(3000)


















// const names = require('./name');
// // const sayHi = require('./intro1');

// names.item.map((val, index)=>{
//     console.log(names.sayHi(val))
// })

// const { readFileSync, readFile, writeFile} = require('fs');
// const fs = require('fs');

// // fs.writeFileSync('./content/result.txt','fisrt file is here ')
// // console.log(readFileSync('./content/subfolder/text.txt', 'utf8'))

// readFile('./content/result.txt', 'utf8', (err, result)=> {
//     if (err){
//         console.log(err)
//         return
//     }
//     console.log(result)
// })

