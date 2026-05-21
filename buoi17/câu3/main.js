const img_main = document.getElementById("img_main");
const handleChangeImage = (url) =>{
    console.log(url,"url");
    console.log({img_main},'img_main');
    img_main.setAttribute("src",url);

}