// Envoi de requête a l'API pour les canapés
/*window.onload = function callAllSofa(){
  fetch("http://localhost:3000/api/products")
  .then(function(res) {
    if (res.ok) {
    return res.json();
    }
  })

  // reponse de l'API
  .then(function(responsApi){
    const itemsSection = document.getElementById('items');

    // boucle pour l'ajout du html
    for(let sofa of responsApi) {
      itemsSection.innerHTML += allSofa(sofa);
    }
  })

  // Affichage de texte en cas d'erreur
  .catch(function(err) {
  const itemsSection = document.getElementById('items');
  let newText = document.createElement('p');
  newText.innerText = "Erreur de chargement";
  itemsSection.append(newText);
  })
}*/

// contenu du html 
/*function allSofa(sofa){
  
  return `
  <a href="${"./product.html?id=" + sofa._id}">
    <article>
      <img src="${sofa.imageUrl}" alt="${sofa.altTxt}">
      <h3 class="productName">${sofa.name}</h3>
      <p class="productDescription">${sofa.description}</p>
    </article>
  </a> `;
}*/

// Variable contenant la liste des produits
const itemsSection = document.getElementById('items');

// Fonction exécuter au chargement de la page
// Cette fonction permet d'affiache les produits sur la page index
(async function onPageload() {
  try {
    //On récupère la liste des produits du serveur
    let products = await getProducts();
    products.forEach((product) => {
      itemsSection.innerHTML += displayProduct(product);
    })
  } catch(e) {
    console.log(e);
  }
})(); //fonction autoexecutable

// Fonction permettant de récupérer la liste de produit du serveur
async function getProducts() {
  const response = await fetch('http://localhost:3000/api/products');
  if (!response.ok) {
    throw new Error(`Erreur HTTP ! statut : ${response.status}`);
  }
  return  response.json();
}
function displayProduct(product) {
  return `
  <a href="${"./product.html?id=" + product._id}">
    <article>
      <img src="${product.imageUrl}" alt="${product.altTxt}">
      <h3 class="productName">${product.name}</h3>
      <p class="productDescription">${product.description}</p>
    </article>
  </a> `;
}