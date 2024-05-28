async function fetchDataFromMultipleFiles() {
    const [categoriesResponse, Akustic, Electro,Bass,Classic] = await Promise.all([
        fetch('./api/categories.json'),
        fetch('./api/AkusticGuitare.json'),
        fetch('./api/ElectroGuitars.json'),
        fetch('./api/BassGuitar.json'),
        fetch('./api/ClassicGuitare.json')
    ]);

    const categoriesData = await categoriesResponse.json();
    const AkusticData = await Akustic.json();
    const ElectroData = await Electro.json();
    const BassData = await Bass.json();
    const ClassicData = await Classic.json();
   

    return { categoriesData, AkusticData,ElectroData,BassData,ClassicData};
}

let specialsLinkInserted = false;

function loadHomePage() {
document.getElementById('content').innerHTML = "";

const container_nav_menu = document.querySelector(".menu__list");

const navMenuChildren = container_nav_menu.children;

if (navMenuChildren.length >= 4) {
    container_nav_menu.removeChild(navMenuChildren[4]);

}
specialsLinkInserted = false;

}

async function loadCatalog() {
try {
    const data = await fetchDataFromMultipleFiles();
    const categories = data.categoriesData;
    const content = document.getElementById('content');
    
    const container_nav_menu = document.querySelector(".menu__list");
    document.querySelector(".section").style.minWidth="600px";
    content.innerHTML = '';

    for (const category of categories) {
        const categoryContainer = `
            <div class="catalog_container">
                <div class="category_img">
                    <a href="#" class="mainLink" id="${category.id}"><img src="${category.img}" alt="img"></a>
                </div>
                <div class="category_shortname">${category.shortname}</div>
                <div class="category_name">${category.name}</div>
            </div>
        `;
        content.innerHTML += categoryContainer;
    }

    const categoryLinks = document.querySelectorAll('.mainLink');
    categoryLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const categoryId = event.target.parentElement.id;
            
            loadSubCategoties(categoryId);
            
            
            
        });
    });

    if (!specialsLinkInserted) {
        const specialsLi = document.createElement('li');
        const specialsLink = document.createElement("a");
        specialsLink.href = '#';
        
        specialsLink.innerText = 'Specials';
        specialsLi.appendChild(specialsLink);
       
        specialsLink.style.textUnderlinePosition;
        specialsLink.classList.add("clickForSubCatalog");
        
        

        specialsLink.addEventListener("mouseover", function () {
            this.style.textDecoration = "underline";
        });
        specialsLink.addEventListener("mouseout", function () {
            this.style.textDecoration = "none";
        });


        specialsLink.addEventListener("click", function(){
           
            randomSubCategories();
        })



        container_nav_menu.appendChild(specialsLi);
      

        specialsLinkInserted = true;
    }

    window.scrollTo({top: 500, behavior: "smooth"})
} catch (error) {
    console.error('Помилка завантаження каталогу: ', error);
}
}

async function loadSubCategoties(id) {

const content = document.getElementById('content');
content.innerHTML="";
const data = await fetchDataFromMultipleFiles();
let categories = null;
    


if(id==1){
     categories = data.AkusticData;
}
else if(id==2){
    categories = data.ElectroData;
}
else if(id==3){
    categories= data.ClassicData;
}
else if(id==4){
    categories= data.BassData;
}

    for (const category of categories) {
        const categoryContainer = `
            <div class="catalog_container">
                <div class="category_img">
                    <a href="#" class="mainLink" id="${category.id}"><img src="${category.img}" alt="img"></a>
                </div>
                <div class="category_shortname">${category.shortname}</div>
                <div class="category_name">${category.name}</div>
                <div class="category_discription">${category.description}</div>
                <div class="category_price">${category.price}</div>
            </div>
        `;
        content.innerHTML += categoryContainer;
    }




}
function randomSubCategories() {
const randomId = Math.floor(Math.random() * 4) + 1;
console.log(`Random category ID selected: ${randomId}`);
loadSubCategoties(randomId.toString());
}

let homePage = document.querySelector(".item1");
let loadMainCatalog = document.querySelector(".item2");
homePage.addEventListener("click", function(){
   loadHomePage();

});
loadMainCatalog.addEventListener("click", function(){
   
    loadCatalog();
    
});
    



