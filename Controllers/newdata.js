function setMaxDate(){
    let date = document.querySelector('#date');
    date.max =  new Date().toISOString().split("T")[0];
}

function getToday(){
    setTimeout(()=>{setMaxDate()}, 500);
}

function addMoney(){
    let tag = document.querySelector('#tag');
    let date = document.querySelector('#date');
    let osszeg = document.querySelector('#osszeg');
    let bevORkia = document.querySelector('#bevORkia');
    if(bevORkia.value == 1) 
    {
        osszeg * -1;
    }

    axios.get(`${serverURL}/users/ID/eq/${loggedUser.ID}`).then(res=>{
        let upID = -1;
        let data = {
            userID : loggedUser.ID,	
            date : date.value,	
            amount : osszeg.value,
            type : bevORkia.value,
            tag : tag.value	
        }
        axios.post(`${serverURL}/items`, data).then((res)=>{
            alert('Adat rögzítve!');
            date.value = null;
            tag.value = null;
            osszeg.value = 0;
        });
        }
    )
    
}
getToday();
