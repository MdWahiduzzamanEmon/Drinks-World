const cardAdd = document.getElementById("card-add");
const detailsCard = document.getElementById("details-card");
const spiner = document.getElementById("spinner");

const searchButton = document.getElementById("search-btn");
searchButton.addEventListener("click", async () => {
  const inputField = document.getElementById("input-field");
  const inputText = inputField.value;
    
    if (inputText === "") {
        cardAdd.innerHTML = `<p class="text-white text-center"> Search field cann't be empty</p>`;
        return;
    }
    inputField.value = "";
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputText}`;
    spiner.classList.remove("d-none");
  fetch(url)
        .then(res => res.json())
      .then(data => {
        //   spiner
           setTimeout(() => {
               spiner.classList.add("d-none");
            //    function call 
        getDrinks(data.drinks);
      }, 800);
      })
    detailsCard.textContent = "";
  ;
});

const getDrinks = (drinks) => {

    if (drinks == null) {
        cardAdd.innerHTML = `<p class="text-white text-center">No result found!</p>`;
    } else {
         cardAdd.textContent = "";
         drinks.forEach((drink) => {
        //    console.log(drink.strDrinkThumb);
           const div = document.createElement("div");
           div.classList.add("col");
           div.innerHTML = `
        <div class="card h-100 text-center" >
                        <img src="${drink.strDrinkThumb}" class="card-img-top img-fluid" alt="img">
                        <div class="card-body">
                            <h5 class="card-title">${drink.strDrink}</h5>
                            <p class="card-text">${drink.strCategory}</p>
                        </div>
                       <button class="btn btn-warning fw-bold" onclick="details('${drink.idDrink}')">Details</button>
                    
        `;
           cardAdd.appendChild(div);
         });
    }
 
};

const details = (getId) => {
  console.log(getId);
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${getId}`)
    .then((res) => res.json())
    .then((data) => getDrinksDetails(data.drinks));
};

const getDrinksDetails = (drinks) => {
  drinks.forEach((drink) => {
    // console.log(drink);
    window.scrollTo(0, 20);

    detailsCard.innerHTML = `
         <img src="${drink.strDrinkThumb}" class="card-img-top img-fluid" alt="drink">
                <div class="card-body bg-white text-dark">
                    <h5 class="card-title">${drink.strDrink}</h5>
                    <p>${drink.strInstructions}</p>
                </div>`;
  });
};
