//---------------------------------------- Affichage du panier --------------------------------------------

const itemsSection = document.getElementById('cart__items');
const inputsQuantity = document.getElementsByClassName('itemQuantity');
let basket = JSON.parse(localStorage.getItem("basket")) || [];


// Fonction exécuter au chargement de la page
// Cette fonction parcourt le localStorage
// récupère les produits du localStorage
(async function onPageload() {
	for (let product of basket) {
		const baseProduct =  await getProduct(product.id);
		itemsSection.innerHTML += buildProduct(product, baseProduct);
		updateQuantity(product);
	}

})();
// Récupération du locaStorage 
/*(function showCart(){
    let cart = JSON.parse(localStorage.getItem("basket")) || [];

    //afficher le resultat de la boucle dans le html 
    for(let item of cart) {
    getSofa(item.id, item.quantity, item.color);
		updateQuantity(item);

	}
})();*/


async function getProduct(productId) {
	const response = await fetch(`http://localhost:3000/api/products/${productId}`);
	if (!response.ok) {
		throw new Error(`Erreur HTTP ! statut : ${response.status}`);
	}
	return   response.json();
}
// appel API 
/*function getSofa(itemId, quantity, color){
    fetch("http://localhost:3000/api/products/"+ itemId)
    .then(res => {
        if(res.ok){
            return res.json();
        }
    })

    // se placer et changez les élements dans le html
    .then(function(value){
        const itemsSection = document.getElementById('cart__items');
        itemsSection.innerHTML += buildItems(value, quantity, color);
        //deleteSofa();
        //updateQuantity();
        //totalQuantity();
        //totalPrice();

    })
}*/


function buildProduct(product, baseProduct){
	return `
    <article class="cart__item" " id="${product.id}" data-color="${product.color}">
        <div class="cart__item__img">
            <img src="${baseProduct.imageUrl}" alt="${baseProduct.altTxt}">
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__description">
            <h2>${product.name}</h2>
            <p>${product.color}</p>
            <p>${baseProduct.price} €</p>
            </div>
            <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}"  id="quantity-${product.id}">
            </div>
            <div class="cart__item__content__settings__delete">
                <p class="deleteItem" id="del-${product.id}">Supprimer</p>
            </div>
            </div>
        </div>
    </article> `;
}
// contenu du html 
function buildItems(item, quantity, color){
    return `
    <article class="cart__item" " id="${item._id}" data-color="${color}">
        <div class="cart__item__img">
            <img src="${item.imageUrl}" alt="${item.altTxt}">
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__description">
            <h2>${item.name}</h2>
            <p id="color-${item._id}">${color}</p>
            <p id="price-${item._id}">${item.price} €</p>
            </div>
            <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}" id="quantity-${item._id}">
            </div>
            <div class="cart__item__content__settings__delete">
                <p class="deleteItem" id="${item._id}">Supprimer</p>
            </div>
            </div>
        </div>
    </article> `;
}
// -------------------------------Changement de quantité---------------------------------------------------
function updateQuantity() {
	for (let input of inputsQuantity) {
		input.addEventListener('change', ()=> {
			let modifyQuantity = parseInt(input.value);
			if (parseInt(modifyQuantity) > 0 && parseInt(modifyQuantity) <= 100) {
				basket.forEach(p => {
					if (("quantity-"+p.id) === input.id) {
						p.quantity = modifyQuantity;
					}
				});
				localStorage.setItem("basket", JSON.stringify(basket));
			}
		})
	}

	/*alert("cgcb")
	debugger;
		const productQuantityTag = document.getElementById(`quantity-${product.id}`);
		if (productQuantityTag!=null) {
			productQuantityTag.addEventListener("change", () => {
				if (parseInt(productQuantityTag.value) > 0 && parseInt(productQuantityTag.value) <= 100) {
					product.quantity = parseInt(productQuantityTag.value);
					let basket = JSON.parse(localStorage.getItem("basket"));
					basket.forEach(p => {
						if (p.id === product.id) {
							p.quantity = product.quantity;
						}
					});
					localStorage.setItem("basket", JSON.stringify(basket));
				}
				/*const prodIndex = storage.findIndex(
					(item) => item.id === product.id && item.color === product.color,
				);
				if (prodIndex !== -1) {
					storage[prodIndex].quantity = Number(inputQuantity[i].value);
				}
			} else {
				alert("Veuillez choisir une quantité entre 1 et 100");
			}
			localStorage.setItem("products", JSON.stringify(storage));*/
				//location.reload();
				//validateForm();
			//});
		//}

}

// -------------------------------Gestion du bouton supprimer l'article------------------------------------
function deleteSofa() {
	const deleteBtn = document.getElementsByClassName("deleteItem");
    const storage = JSON.parse(localStorage.getItem("products"));
	for(let i = 0; i < deleteBtn.length; i++) {
		deleteBtn[i].addEventListener("click", () => {
			if (
				window.confirm("Voulez-vous vraiment supprimer le produit sélectionné?")
			) {
				const idRemove = storage[i].id;
				const colorDelete = storage[i].color;
				const updateRemoveStorage = storage.filter(
					(product) => product.id !== idRemove || product.color !== colorDelete,
				);
				localStorage.setItem("products", JSON.stringify(updateRemoveStorage));
				location.reload();
			}
		});
	};
	if (deleteBtn.length == 0) {
		localStorage.removeItem("products");
		location.reload();
	}
}

// Calcul et affichage des quantités
function totalQuantity() {
	const totalQuantity = document.getElementById("totalQuantity");
	const quantityProduct = document.querySelectorAll(".itemQuantity");
	let totalNumber = 0;
	quantityProduct.forEach((quantity) => {
		totalNumber += parseInt(quantity.value);
	});
	totalQuantity.innerText = totalNumber;
}
/*/ Calcul du prix total
function totalPrice() {
	const getTotalPrice = document.getElementById("totalPrice");
	const priceProduct = item.price;
	let totalNumber = 0;
	priceProduct.forEach((element) => {
		const totalPrice = element.textContent;
		totalNumber += parseInt(totalPrice);
		getTotalPrice.innerText = totalNumber;
	});
}*/