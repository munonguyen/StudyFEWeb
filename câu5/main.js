const nameinput = document.getElementById("name-form");
const emailinput = document.getElementById("email-form");
const passwordinput = document.getElementById("pass-form");
const avatarinput = document.getElementById("avatar-form");
const dateinput = document.getElementById("date-form");
const addressinput = document.getElementById("address-form");
const incomeinput = document.getElementById("income-form");
const descriptioninput = document.getElementById("des-form");
const listGender = document.querySelectorAll("input[type=radio][name=gender]");
const maritalinput = document.getElementById("marital-form");
const expiryinput = document.getElementById("expiry-form");
const display = document.getElementById("display");
const submit = document.getElementById("submit-btn");
const searchInput = document.getElementById("search-form");
const filterMaritalInput = document.getElementById("filter-marital");
let idRecord = null;
const STORAGE_KEY = "credit-card-records";
let records = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

const saveRecords = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
};

const handleSubmit = () => {
    const name = nameinput.value;   
    const email = emailinput.value;
    const password = passwordinput.value;
    const date = dateinput.value;
    const address = addressinput.value;
    const income = incomeinput.value;
    const description = descriptioninput.value;
    const marital = maritalinput.value;
    const expiry = expiryinput.value;
    
    let gender = null;
    listGender.forEach(item => {
        if(item.checked) {
            gender = item.value;
        }
    });
    if(avatarinput.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const record = {
                id: idRecord || Date.now(),
                name: name,
                email: email,
                password: password,
                avatar: e.target.result,
                date: date,
                address: address,
                income: income,
                description: description,
                gender: gender,
                marital: marital,
                expiry: expiry
            };
            if(idRecord){
                const newRecords = records.map(item => {
                    if(item.id === idRecord){
                        return {
                            ...item,
                            name: record.name,
                            email: record.email,
                            password: record.password,
                            avatar: record.avatar,
                            date: record.date,
                            address: record.address,
                            income: record.income,
                            description: record.description,
                            gender:record.gender,
                            marital: record.marital,
                            expiry: record.expiry,
                            id: idRecord
                        }
                    } else {
                        return item;
                    }
                })
                alert("Sua");
                records =[...newRecords];
                document.getElementById("submit-btn").innerText ="Đăng ký";
                idRecord = null;


            } else {
                records.push(record);
            }
            saveRecords();
            renderTable();
            searchInput.value = '';
            filterMaritalInput.value = '';
            resetForm();
        };
        reader.readAsDataURL(avatarinput.files[0]);
    } else {
        const oldRecord = records.find(item => item.id === idRecord);
        const record = {
            id: Date.now(),
            name: name,
            email: email,
            password: password,
            avatar: oldRecord ? oldRecord.avatar : "Chưa chọn",
            date: date,
            address: address,
            income: income,
            description: description,
            gender: gender,
            marital: marital,
            expiry: expiry
        };
        if(idRecord){
            const newRecords = records.map(item => {
                if(item.id === idRecord){
                    return { ...record, id: idRecord };
                } else {
                    return item;
                }
            });
            alert("Sửa");
            records = [...newRecords];
            submit.innerText = "Đăng ký";
            idRecord = null;
        } else {
            records.push(record);
        }
        saveRecords();
        renderTable();
        searchInput.value = '';
        filterMaritalInput.value = '';
        resetForm();
    }
};

const renderTable = (dataToRender = records) => {
    if(dataToRender.length === 0) {
        display.innerHTML = '';
        return;
    }
    
    let tableHTML = `
    <table border="1" style="border-collapse:collapse; margin-top:20px; width:100%;">
    <tr>
    <th>Tên</th><th>Email</th><th>Password</th><th>Avatar</th><th>Ngày sinh</th>
    <th>Địa chỉ</th><th>Thu nhập</th><th>Giới thiệu</th><th>Giới tính</th>
    <th>Hôn nhân</th><th>Thẻ hạn</th><th>Sửa</th><th>Xoá</th>
    </tr>
    `;
    
    dataToRender.forEach(record => {
        const passwordMask = '*'.repeat(record.password.length);
        const avatarHTML = record.avatar.startsWith('data:') 
            ? `<img src="${record.avatar}" style="max-width:100px; max-height:100px;">` 
            : record.avatar;
        
        tableHTML += `
        <tr>
        <td>${record.name}</td>
        <td>${record.email}</td>
        <td>${passwordMask}</td>
        <td>${avatarHTML}</td>
        <td>${record.date}</td>
        <td>${record.address}</td>
        <td>${record.income}</td>
        <td>${record.description}</td>
        <td>${record.gender}</td>
        <td>${record.marital}</td>
        <td>${record.expiry}</td>
        <td><button onclick="handleEditRecord(${record.id})">✎</button></td>
        <td><button onclick="handleRemoveRecord(${record.id})">🗑</button></td>
        </tr>
        `;
    });
    
    tableHTML += `</table>`;
    display.innerHTML = tableHTML;
};

const handleSearch = () => {
    const searchText = searchInput.value.toLowerCase();
    const selectedMarital = filterMaritalInput.value;
    
    let filtered = records.filter(r => {
        const matchName = r.name.toLowerCase().includes(searchText);
        const matchEmail = r.email.toLowerCase().includes(searchText);
        const matchMarital = selectedMarital ? r.marital === selectedMarital : true;
        
        return (matchName || matchEmail) && matchMarital;
    });
    
    renderTable(filtered);
};

const resetForm = () => {
    nameinput.value = '';
    emailinput.value = '';
    passwordinput.value = '';
    avatarinput.value = '';
    dateinput.value = '';
    addressinput.value = '';
    incomeinput.value = '0-10000000';
    descriptioninput.value = '';
    maritalinput.value = 'single';
    expiryinput.value = '';
    listGender.forEach(item => item.checked = false);
};
const handleRemoveRecord = (id) =>{
    const newRecords = records.filter(i => i.id !=id);
    records = [...newRecords];
    searchInput.value = '';
    filterMaritalInput.value = '';
    saveRecords();
    renderTable();


}
const handleEditRecord = (id) =>{
    const submitBtn = document.getElementById("submit-btn");
    
    idRecord = id;
    submitBtn.innerText ="Cập nhật";
    const record = records.find(o=> o.id === id);
    const {name,email,password,avatar,date,address,income,description,gender,marital,expiry} =record;
    nameinput.value = name;
    emailinput.value = email;
    passwordinput.value = password;
    dateinput.value = date;
    addressinput.value = address;
    incomeinput.value = income;
    descriptioninput.value = description;
    listGender.forEach(item =>{
        if(item.value === gender){
            item.checked = true;
        }
    })
    maritalinput.value = marital;
    expiryinput.value = expiry;
}

renderTable();
