var sName = document.getElementById('siteName');
var url = document.getElementById('siteUrl');
var favSite =[];
var updateIndex;
var siteInfo;

if (localStorage.getItem("Site_Info")) {
    favSite = JSON.parse(localStorage.getItem("Site_Info"));
    display(favSite);
}

function sumbit(){
if(checkValidate() && checkDuplicate()){
 siteInfo = {
  siteName : sName.value, 
  siteUrl : url.value
}
favSite.push(siteInfo);
display(favSite);
localStorage.setItem("Site_Info",JSON.stringify(favSite));
lastSiteName= siteInfo.siteName;
clear();
}
}
function display(list) {
    var content=``;
    var splitUrl;
    var validUrl;
    for (var i = 0; i < list.length; i++) {    
        splitUrl = list[i].siteUrl.split("//");
        if (splitUrl[0]!="https:"&&splitUrl[0]!="http:") {
           validUrl="https:"+list[i].siteUrl;
        }else{
            validUrl=list[i].siteUrl;
        }
        content+=`<tr class="text-center">
        <td>${i+1}</td>
        <td>${list[i].siteName}</td>
        <td><a href="${validUrl}" target="_blank" class="btn btn-success px-2" onclick="visitSite()"><i class="fa fa-eye me-1"></i> Visit</a></td>
        <td><button class="btn btn-warning px-2" onclick="update(${i})"><i class="fa fa-pencil me-1"></i> Update</button></td>
        <td><button class="btn btn-danger px-2" onclick="deleteSite(${i})"><i class="fa fa-trash-can me-1"></i> Delete</button></td>
        </tr>`
    }
    document.getElementById('tableContent').innerHTML=content;
}

function update(index) {
    updateIndex = index;
    sName.value = favSite[updateIndex].siteName;
    url.value = favSite[updateIndex].siteUrl;
    document.getElementById('sumbit').classList.add('d-none');
    document.getElementById('sumbitUpdate').classList.remove('d-none');
}

function sumbitUpdate() {
    if (checkValidate()) {
    siteInfo = {
        siteName : sName.value,
        siteUrl : url.value
    }
    favSite.splice(updateIndex,1,siteInfo);
    display(favSite);
    localStorage.setItem("Site_Info",JSON.stringify(favSite)); 
    document.getElementById('sumbit').classList.remove('d-none');
    document.getElementById('sumbitUpdate').classList.add('d-none');
    clear(); 
    }
}

function deleteSite(index){
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this row!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            favSite.splice(index,1);
            display(favSite);
            localStorage.setItem("Site_Info",JSON.stringify(favSite));
          swal("Poof! Your row has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your imaginary file is safe!");
        }
      });
}

function clear(){
 sName.value = "";
 url.value = "";
}


function checkValidate(){
    if(validateUrl() && validateName()){
       return true;
    }else if(sName.value=="" && url.value ==""){
        swal({
            title: "Invaild",
            text: `Please Fill The Inputs`,
            icon: "error",
            button: "Ok",
          });
    }else if(!validateName()){
        swal({
            title: "Invaild",
            text: `Site name must contain at least 3 characters`,
            icon: "error",
            button: "Ok",
          });
    } 
    else if(!validateUrl()){
        swal({
            title: "Invaild",
            text: `Site URL must be a valid one`,
            icon: "error",
            button: "Ok",
          });
    }
}

function checkDuplicate(){
   for (var i = 0; i < favSite.length; i++) {
    if(sName.value==favSite[i].siteName){
        swal({
            title: "Invaild",
            text: `Name is Already exits`,
            icon: "error",
            button: "Ok",
          });
          return false;
    }
    if(url.value==favSite[i].siteUrl){
        swal({
            title: "Invaild",
            text: `Site is Already exits`,
            icon: "error",
            button: "Ok",
          });
          return false;
    }   
}
return true;
}

function validateName(){
    var regex = /^\w{3,}$/;
    if (!regex.test(sName.value)) {
        document.getElementById('siteName').classList.add('is-invalid')
    }else{
        document.getElementById('siteName').classList.replace("is-invalid","is-valid");
    }
    return regex.test(sName.value)
}

function validateUrl() {
     var regex = /^(https?:\/\/)?(www\.)?\w+\.[a-z]{2,}/
    if (!regex.test(url.value)) {
        document.getElementById('siteUrl').classList.add('is-invalid')
    }else{
        document.getElementById('siteUrl').classList.replace("is-invalid","is-valid");
    }
    return regex.test(url.value)
}





