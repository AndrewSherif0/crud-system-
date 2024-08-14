//fn get totall
//fn create product 
//save data in localstorage
//cleare inputs
//read from data in table
//count fn
//delete all or singe
//search
//clean data input data

// begin with call id each element to var
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
//test if call is correct
//console.log(title,price,taxes,ads,discount,total,count,category,submit);

// 1st) fn get total
let mood = 'create';//create or update
let srchmood = 'title';// by title or category search 
let tmp;
function getTotal(){
    if(price.value !=''){
        let result = (+price.value + +taxes.value + +ads.value)-(+discount.value/100)*(+price.value + +taxes.value + +ads.value);
        total.innerHTML = result;
        total.style.background='#040';
    }
    else{
        total.innerHTML = '';
        total.style.background='#a00d02';
    }
}
//finish fn get total

//create product
// list of objects newPro
let dataPro=[] ;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
}
function cleardata(){
     title.value='';
     price.value='';
     taxes.value='';
     ads.value='';
     discount.value='';
     total.innerHTML='';
     count.value='';
     category.value='';
     }

submit.onclick = function(){
        //create object datastructure to save all product detail
       
        let newPro = {
            title : title.value,
            price : price.value,
            taxes : taxes.value,
            ads : ads.value,
            discount : discount.value,
            total:total.innerHTML ,
            count : count.value,
            category : category.value,
        }
        if(title.value!='' &&  price.value!='' &&category.value!=''&&count.value<100){
        if(mood == 'create'){
            if(newPro.count>1){
                for(let i =0;i<newPro.count;i++){
                dataPro.push(newPro);
                }
            }else{
                dataPro.push(newPro);}
        }else{
                dataPro[tmp]= newPro;
                mood='create';
                submit.innerHTML="Create";
                count.style.display='block';
        }
        cleardata();
    }
        //save in local storage becouse when refresh data saved 
        localStorage.product = JSON.stringify(dataPro);
        // == localStorage.setItem('product',JSON.stringify(newPro));
        // test // console.log(newPro);

        // clear inputs after create 
       

        //show data in table
        showData();
        console.log(dataPro);
        
}
function showData(){
    let table = '';
    for(let i = 0 ; i < dataPro.length ; i++){
        table += `
        <tr>
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].pric}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick = "updateData(${i})"id = "update">update </button></td>
        <td><button onclick = "deleteData(${i})" id = "delete">delete</button></td>
        </tr>
        `;
    }
    document.querySelector('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if(dataPro.length > 0){
        btnDelete.innerHTML=`
        <button onclick = "deleteAll()" id = "delete" > delete All(${dataPro.length}) </button>
        `
    }
    btnDelete.onclick = function(){
        btnDelete.innerHTML=``}
        getTotal();
    
}
showData();

function deleteData(i){
    dataPro.splice(i,1);
    localStorage.product= JSON.stringify(dataPro);
    showData();
}


function deleteAll(){
    localStorage.clear();
    dataPro.splice(0);
    showData();
    // for(let i =0;i<dataPro.length;i++){
    //     deleteData(i);
    // }
}

function updateData(i){
    console.log(i);
    title.value= dataPro[i].title;
    price.value= dataPro[i].price;
    taxes.value= dataPro[i].taxes;
    ads.value= dataPro[i].ads;
    discount.value= dataPro[i].discount;
    count.style.display='none';
    category.value= dataPro[i].category;
    getTotal();
    submit.innerHTML="update";
    mood = 'update';
    tmp = i;
    scroll({
        top:0,
        behavior:"smooth"
    })
}

function getSearchMood(id){
    let search = document.getElementById('search');
    if (id =="searchtitle"){
        srchmood = "title";
    }else{
        srchmood = "category";
    }
    search.placeholder ="search by "+srchmood;
 search.focus();
 search.value="";
 showData();
}
function  searchDAta(value){
    table = '';
    for(let i =0; i<dataPro.length;i++){
    if(srchmood == "title" )
        {
            
                if(dataPro[i].title.toLowerCase().includes(value.toLowerCase()))
                    table += `
                <tr>
                <td>${i+1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].pric}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick = "updateData(${i})"id = "update">update </button></td>
                <td><button onclick = "deleteData(${i})" id = "delete">delete</button></td>
                </tr>
                `;
            }
        else{
           
                if(dataPro[i].category.toLowerCase().includes(value.toLowerCase()))
                    table += `
                <tr>
                <td>${i+1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].pric}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick = "updateData(${i})"id = "update">update </button></td>
                <td><button onclick = "deleteData(${i})" id = "delete">delete</button></td>
                </tr>
                `;
            
        }
    }
    document.querySelector('tbody').innerHTML = table;
}