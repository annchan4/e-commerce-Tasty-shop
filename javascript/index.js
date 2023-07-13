var isSearchBarAnIconOrAnInput = 'input'; //this will change on mobile screens

//the lib i use to make the categories navbar with arrows on side
function initializeSwiper()
{   
    const swiper = new Swiper('.swiper', {
        // Optional parameters
        direction: 'vertical',
        loop: true,
      
        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      
      });    
}

function changeSelectOpenHoursDefault()
{
    var date = new Date();
    var currentDay = date.getDay(); //returns a value from 0-6, starting by sunday, 0
    var currentHour = date.getHours();

    var isOpen = true;
    
    if(currentHour >= 10 && currentHour < 17)
    {   
        if(currentDay != 0)
        {
            //not sunday
            isOpen = true;
        }
        else if(currentHour >= 10 && currentHour < 16)
        {
            isOpen - true;
        }
        else
        {
            isOpen = false;
        }
    }
    else
    {
        isOpen = false;
    }

    //we'll change the symbol and text of the default option of the selector
    var shopIsOpenSymbol = document.querySelector("#shopIsOpenSymbol");
    var openHours = document.querySelector("#openHours");
    var select_default = openHours.querySelector("#select_default");

    if(isOpen == true)
    {
        if(shopIsOpenSymbol.classList.contains("text-danger") == true)
        {
            shopIsOpenSymbol.classList.remove("text-danger");
        }
        
        if(shopIsOpenSymbol.classList.contains("text-success") == false)
        {
            shopIsOpenSymbol.classList.add("text-success");
        }

        select_default.innerHTML = "Open";
    }
    else
    {
        if(shopIsOpenSymbol.classList.contains("text-danger") == false)
        {
            shopIsOpenSymbol.classList.add("text-danger");
        }
        
        if(shopIsOpenSymbol.classList.contains("text-success") == true)
        {
            shopIsOpenSymbol.classList.remove("text-success");
        }

        select_default.innerHTML = "Closed";
    }
}

//the select below is the openHours
function makeSelectGoBackToFirstOption()
{
    var openHours = document.querySelector("#openHours");
    var options = openHours.children;
    for(option of options)
    {
        if(option.id == "select_default")
        {
            option.selected = true;
        }
        else
        {
            option.selected = false;
        }
    }
}

function adaptNavbarCategoriesOnMobile()
{
    var screenWidth = Math.max(window. innerWidth);
    if(screenWidth < 768)
    {
        //mobile
        //navbar foodCategoriesButtons
        var navLinks = document.getElementsByClassName("nav-link");
        for(var myLink of navLinks)
        {
            myLink.classList.remove("btn");
            myLink.classList.remove("btn-secondary");
            myLink.classList.add("link-dark");
            
        } 
    }
}

function adaptfoodCardImagesToLargerScreens()
{
    var screenWidth = Math.max(window. innerWidth);
    if(screenWidth >= 768)
    {
        //not mobile
        //foodCardImage
        var foodCardImages = document.getElementsByClassName("foodCardImage");
        for(var foodCardImage of foodCardImages)
        {
            foodCardImage.classList.remove("img-fluid");
            foodCardImage.style.cssText += 'max-width: 100%;height: 100%;';
            
        } 
    }
}

function adaptSearchBarToMobile()
{
    var screenWidth = Math.max(window. innerWidth);
    if(screenWidth < 768)
    {
        //mobile
        var searchBar = document.querySelector("#searchBar");
        searchBar.innerHTML = '<div onclick="changeSearchBarDisplayOnMobile()"><i class="bi bi-search"></i></div>';
        isSearchBarAnIconOrAnInput = 'icon';
    }
    else
    {
        document.getElementById('clearSearchButton').remove();
    }
}

function changeSearchBarDisplayOnMobile()
{
    var screenWidth = Math.max(window. innerWidth);
    if(screenWidth < 768)
    {
        //mobile
        var searchBar = document.querySelector("#searchBar");

        if(isSearchBarAnIconOrAnInput == 'icon')
        {
            searchBar.innerHTML = `<div id="flex-search-field">
            <div id="flex-search-area">
                <div onclick='changeSearchBarDisplayOnMobile()'><i class="bi bi-search"></i></div>
                <input type="search" name="" id="searchInput" oninput='filterDisplayedCardsBasedOnWhatUserTypesOnTextfield()'>
                <div id="clearSearchButton" onclick='changeSearchBarDisplayOnMobile();clearSearchFiltersOnMobile()'><i class="bi bi-x"></i></div>
            </div>
        </div> `;
            var searchInput = document.querySelector("#searchInput");
            searchInput.addEventListener('input',filterDisplayedCardsBasedOnWhatUserTypesOnTextfield());
            isSearchBarAnIconOrAnInput = 'input';

        }
        else
        {
            searchBar.innerHTML = '<div onclick="changeSearchBarDisplayOnMobile()"><i class="bi bi-search"></i></div>';
            isSearchBarAnIconOrAnInput = 'icon';
        }
    }
}

function clearSearchFiltersOnMobile()
{
    //this method will be called whenever the user press the x inside the search input.
    //all cards should return to the state of being displayed
    var foodCardGridArray = document.querySelectorAll(".foodCardGrid");
    for(foodCardGrid of foodCardGridArray)
    {
        foodCardGrid.style.display = "block";
    }
}

function filterDisplayedCardsBasedOnWhatUserTypesOnTextfield()
{
    var searchInput = document.querySelector("#searchInput");
    var textOnSearchInput = searchInput.value;
    textOnSearchInput = textOnSearchInput.toUpperCase();// when we decide to compare this string, we dont want it to be case sensitive
    var foodCardGridArray = document.querySelectorAll(".foodCardGrid");

    if(textOnSearchInput == "")
    {
        clearSearchFiltersOnMobile();
    }
    else
    {
        for(foodCardGrid of foodCardGridArray)
        {
            var cardTitle = foodCardGrid.querySelector(".card-title");
            var cardText= foodCardGrid.querySelector(".card-text");
            var cardTitleText = cardTitle.innerText.toUpperCase();
            var cardTextText = cardText.innerText.toUpperCase();
            if(cardTitleText.includes(textOnSearchInput) == false && cardTextText.includes(textOnSearchInput) == false)
            {
                foodCardGrid.style.display = "none";
            }
            else
            {
                foodCardGrid.style.display = "block";
            }
        }
    }
}

initializeSwiper();
//changeSelectOpenHoursDefault();
adaptNavbarCategoriesOnMobile();
adaptfoodCardImagesToLargerScreens();
adaptSearchBarToMobile();


