let todos = [];
let idToDo = null;
const valTitle = document.getElementById("valTitle");
const listStatus = document.querySelectorAll("input[type=radio][name=status]");
const renderToDo = document.getElementById("renderToDo");
const btnSubmit = document.querySelector("button.add");
const nodata = document.getElementById("no-data");


const handleSubmit =() =>{
    const title = valTitle.value;
    let status ="";
    for(let i =0;i<listStatus.length;i++){
        const item = listStatus[i];
        const {checked,value}=item;
        if(checked){
            status = value;
        }

    }
    const formData = {
        id:Date.now(),
        title,
        status
    }
    if(idToDo){
        const newData = todos.map(item =>{
            if(item.id === idToDo){
                return {
                    ...item,
                    title:formData.title,
                    status:formData.status,
                    id:idToDo
                }
                
            }
            return item;
        })
        alert("sua");
        todos = [...newData];
        btnSubmit.innerText = "Thêm";
        idToDo = null;
    }else{
        todos= [...todos,formData];

    }
    console.log(formData);
    console.log(todos,"todos");
    renderToDoList(todos);
    resetForm();

    }
const renderToDoList=(data=[])=>{
    console.log(data,"data");
    if(data.length){
        nodata.innerHTML="";
    }else{
        nodata.innerHTML="No data";
    }
    renderToDo.innerHTML= data.map((item)=>{
        return `
        <div class="item">
        <div class="task-name">${item.title}</div>
        <div class="task-right">
        <div class ="badge ${item.status.toLowerCase()}">${item.status}</div>
        <button class="edit" onclick="handleDetailToDo(${item.id})">✎</button>
        <button class="delete" onclick="handleRemoveToDo(${item.id})">🗑</button>
        </div>
        </div>
        `
    }).join('')
    

}
const resetForm = () => {
    valTitle.value ="";
    idToDo = null;
    btnSubmit.innerText = "Thêm";
    listStatus.forEach(item =>{
        item.checked = false;
    })
}
const handleRemoveToDo =(id) =>{
    console.log(id,'id',todos);
    const newData = todos.filter(i => i.id !=id);
    todos =[...newData]
    renderToDoList(todos);
}
const handleDetailToDo =(id) =>{
    idToDo = id;
    btnSubmit.innerText = "Cập nhật";
    const itemToDo = todos.find(item =>item.id ===id);
    console.log(itemToDo,'itemToDo');
    const {title,status} = itemToDo;
    valTitle.value = title;
    listStatus.forEach(item =>{
        if(item.value === status){
            item.checked =true;
        }
    })
}

// Hiển thị "No data" khi trang load
renderToDoList(todos);



