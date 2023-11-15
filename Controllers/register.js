function registerUser()
{
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let jelszo = document.getElementById('jelszo');
    let jelszoMeg = document.getElementById('jelszoMeg')   

    let alertBox = document.getElementById('alert');

    if (name.value == "" || email.value == "" || jelszo.value == "" || jelszoMeg.value == ""){
        showMessage('Nem adtál meg minden adatot!')
    }
    else{
        if (jelszo.value != jelszoMeg.value){
            showMessage('A megadott jelszavak nem egyeznek!')
        }
        else
        {
            axios.get(`${serverURL}/users/email/eq/${email.value}`).then(res =>{
                if (res.data.length > 0){
                    showMessage('Ez az e-mail cím már regisztrálva van!')
            }
            else
            {
                let newUser = {
                    name: name.value,
                    email: email.value,
                    passwd: jelszo.value
                };
                axios.post(`${serverURL}/users`, newUser).then(res =>{
                    alertBox('Siker regisztáció! Mostmár beléphetsz!')
                        document.location.href = "index.html"
                })
            }
            });
           
        
        }
    }
}