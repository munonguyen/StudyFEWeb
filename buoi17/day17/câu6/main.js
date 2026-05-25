const idinput = document.getElementById("id-form");
const nameinput = document.getElementById("name-form");
const avatarinput = document.getElementById("avatar-form");
const avatarpreviewbox = document.getElementById("avatar-preview-box");
const avatarpreview = document.getElementById("avatar-preview");
const addressinput = document.getElementById("address-form");
const salaryinput = document.getElementById("salary-form");
const desinput = document.getElementById("des-form");
const listGender = document.querySelectorAll("input[type=radio][name=gender]");
const marriedinput = document.getElementById("married-form");
const eduinput = document.getElementById("edu-form");
const saveBtn = document.getElementById("save-btn");
const display = document.getElementById("display");

let idRecord = null;
let avatarValue = "";
const STORAGE_KEY = "USER_RECORDS";
let records = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

const saveRecords =  () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

avatarinput.onchange = () =>{
    if (!avatarinput.files[0]) {
        deleteAvatar();
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement("canvas");
            const maxSize = 200;
            const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
            canvas.width = img.width * scale;
            canvas.height = img.height * scale;
            canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
            avatarValue = canvas.toDataURL("image/jpeg", 0.7);
            avatarpreview.src = avatarValue;
            avatarpreviewbox.style.display = "flex";
        }
        img.src = e.target.result;
    };
    reader.onerror = () => {
        alert("Không đọc được file avatar");
        deleteAvatar();
    };
    reader.readAsDataURL(avatarinput.files[0]);
}

const deleteAvatar = () => {
    avatarinput.value = "";
    avatarValue = "";
    avatarpreview.removeAttribute("src");
    avatarpreviewbox.style.display = "none";
}

const getSelectedGender = () => {
    let gender = null;
    listGender.forEach(item => {
        if (item.checked) {
            gender = item.value;
        }
    });
    return gender;
}

const handleSave = () => {
    const oldRecord = records.find(item => item.id === idRecord);
    const record = {
        id: idRecord || idinput.value || Date.now(),
        name: nameinput.value,
        avatar: avatarValue || (oldRecord ? oldRecord.avatar : "Chưa chọn"),
        address: addressinput.value,
        salary: salaryinput.value,
        des: desinput.value,
        gender: getSelectedGender(),
        married: marriedinput.checked,
        edu: eduinput.value,
        approved: oldRecord ? oldRecord.approved : false
    };

    if (idRecord) {
        const newRecords = records.map(item => {
            if (item.id === idRecord) {
                return record;
            }
            return item;
        });
        alert("Sửa");
        records = [...newRecords];
        saveBtn.innerText = "Save";
        idRecord = null;
    } else {
        records.push(record);
    }

    saveRecords();
    handleReset();
    renderTable();
}

const handleReset = () => {
    idinput.value = "";
    nameinput.value = "";
    addressinput.value = "";
    salaryinput.value = "";
    desinput.value = "";
    marriedinput.checked = false;
    eduinput.value = "";
    listGender.forEach(item => item.checked = false);
    deleteAvatar();
}

const handleClear = () => {
    records = [];
    localStorage.removeItem(STORAGE_KEY);
    handleReset();
    renderTable();
}

const handleDelete = () => {
    handleClear();
}

const handleCheckOne = (id, checked) => {
    records = records.map(item => {
        if (String(item.id) === String(id)) {
            return {
                ...item,
                approved: checked
            };
        }
        if(checked){
            listId = [...listId, item.id];

        }else{
            const newData = ListId.filter(i=>i != item.id);
            listId = [...newData];
        }
        return item;
    });

    saveRecords();
    renderTable();
}

const handleCheckAll = (checked) => {
    records = records.map(item => {
        return {
            ...item,
            approved: checked
        };
    });

    saveRecords();
    renderTable();
}

const renderTable = () => {
    if (records.length === 0) {
        display.innerHTML = "";
        return;
    }

    const allChecked = records.length > 0 && records.every(item => item.approved);
    let tableHTML = `
        <table>
            <tr>
                <th>
                    <input
                        type="checkbox"
                        ${allChecked ? "checked" : ""}
                        onchange="handleCheckAll(this.checked)"
                    >
                </th>
                <th>Id</th>
                <th>Name</th>
                <th>Avatar</th>
                <th>Address</th>
                <th>Salary</th>
                <th>Description</th>
                <th>Gender</th>
                <th>Married</th>
                <th>Education</th>
                <th>Action</th>
            </tr>
    `;

    records.forEach(record => {
        const avatarHTML = record.avatar && record.avatar.startsWith("data:")
            ? `<img src="${record.avatar}" alt="Avatar">`
            : record.avatar;

        tableHTML += `
            <tr>
                <td>
                    <input
                        type="checkbox"
                        ${record.approved ? "checked" : ""}
                        onchange='handleCheckOne(${JSON.stringify(record.id)}, this.checked)'
                    >
                </td>
                <td>${record.id}</td>
                <td>${record.name}</td>
                <td>${avatarHTML}</td>
                <td>${record.address}</td>
                <td>${record.salary}</td>
                <td>${record.des}</td>
                <td>${record.gender || ""}</td>
                <td>${record.married ? "Yes" : "No"}</td>
                <td>${record.edu}</td>
                <td>
                    <button class="btn-edit" onclick="handleEdit(${JSON.stringify(record.id)})">Edit</button>
                    <button class="btn-del" onclick="handleDeleteOne(${JSON.stringify(record.id)})">Delete</button>
                </td>
            </tr>
        `;
    });

    tableHTML += "</table>";
    display.innerHTML = tableHTML;
}
const handleDeleteOne = (id) =>{
    const newRecords = records.filter(i => i.id !=id);
    records = [...newRecords];
    saveRecords();
    renderTable();
}
const handleEdit =(recordId) =>{
    const submitBtn = document.getElementById("save-btn");
    idRecord = recordId;
    submitBtn.innerText = "Update";
    const record = records.find(item => item.id === idRecord);
    const {id,name,avatar,address,salary,des,gender,married,edu} = record;
    idinput.value = id;
    nameinput.value = name;
    avatarValue = avatar;
    addressinput.value = address;
    salaryinput.value = salary;
    desinput.value = des;
    listGender.forEach(item =>{
        if(item.value === gender){
            item.checked = true;
        }
    })
    marriedinput.checked = married;
    eduinput.value = edu;

    

}

renderTable();
