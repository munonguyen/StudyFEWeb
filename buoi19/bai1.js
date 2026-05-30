fetch("https://jsonplaceholder.typicode.com/posts")
.then((res) => {
    console.log(res);
    return res.json();

})
.then(data => {
    console.log(data);
})
.catch(err =>{ console.log(err);})

const promise= new Promise((resolve,reject) =>{
    resolve("Thanh cong");
})
promise 
.then((res) => {
    return 1;
})
.then(data =>{console.log(data)})

