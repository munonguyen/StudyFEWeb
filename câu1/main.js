const valUser = document.getElementById("valUser");
const valCity = document.getElementById("valCity");
const listGender = document.querySelectorAll("input[type=radio][name=gender]");
const display = document.getElementById("display");

const handleSubmit = () => {
    const userName = valUser.value;
    const city = valCity.value;
    let gender = null;
    console.log({listGender},'listGender');

    listGender.forEach(item =>{
        if(item.checked){
           gender = item.value;
        }
    })
    display.innerHTML =`
    <p>Name:${userName}</p>
    <p>City:${city}</p>
    <p>Gender:${gender ?? ""}</p>
    `

    console.log(gender,"gender");
    
}
