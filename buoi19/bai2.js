const totalEl = document.getElementById("total");
const listProducts = document.getElementById("list-products");
const loader = document.querySelector(".loader");
const detailProduct = document.getElementById("detail-products");



const fetchData = () => {
    loader.style.display = "block";

    fetch("https://dummyjson.com/products")
        .then(res => res.json())
        .then(data => renderProducts(data))
        .catch(error => console.log(error))
        .finally(() => {
            loader.style.display = "none";
        });
};

const renderProducts = (data) => {
    const { total, products } = data;

    console.log(data);

    totalEl.innerHTML = `Total: ${total}`;

    listProducts.innerHTML = products.slice(0, 8).map(product => {
        const { thumbnail, title, price,id } = product;

        return `
            <div class="box-product">
                <img src="${thumbnail}" />
                <p>${title}</p>
                <p>${price}</p>
                <button onclick="handleDetail(${id})">Xem nhanh</button>
            </div>
        `;
    }).join("");
};
const handleDetail = (id) =>{
    loader.style.display="block";
    window.location.href="./detail.html?id=" +id;
}
const fetchDetail = (id) => {
    fetch(`https://dummyjson.com/products/${id}`)
     .then(res=>{
         console.log(res);
         return res.json();
})
.then(detail =>{
    renderDetail(detail);
})
.catch(err =>{
    console.log(err);
})
.finally(()=>{
    loader.style.display="none";
})
};
const renderDetail = (product) => {
    detailProduct.innerHTML =`
        <h1>${product.title}</h1>
        <img src="${product.thumbnail}" />
        <p>Gia: ${product.price}</p>
        <p>${product.description}</p>
        <p>Danh muc: ${product.category}</p>
        <button onclick="window.location.href='./main.html'">Quay lai</button>
    `;
};
if(listProducts){
    fetchData();
}
if(detailProduct){
    fetchDetail(new URLSearchParams(window.location.search).get("id"));
}



