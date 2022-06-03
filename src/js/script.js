const listProdutos =    document.getElementById("listProdutos")
const searchInput =     document.getElementById("searchInput");
const precoTotal =      document.getElementById("precoTotal")
const searchButton =    document.getElementById("searchButton");

let totalPriceValue = 0;

const amount = document.getElementById("amount");
let amountValue = 0;



// cria todos os protudos na tela
function loadProducts (produtos){  
    for (let i=0; i < produtos.length; i++){
        createProduct(produtos[i]);
    }    
}

// criando um único card de produto
function createProduct (produtos) {
    const li = document.createElement("li");    //lista
    
    const img = document.createElement("img");  //imagem
    img.src = produtos.img;

    const h3 = document.createElement("h3");  //nome
    h3.innerText = produtos.nome;

    const p = document.createElement("p");  // preço
    p.innerText = `R$ ${produtos.preco.toFixed(2)}`;

    const span = document.createElement("span"); // seção
    span.innerText = produtos.secao;
    
    const componentes = document.createElement("ul");

    for (let i=0; i < produtos.componentes.length; i++){
    const listComponentes = document.createElement("li");
    listComponentes.innerText = produtos.componentes[i];
    componentes.classList.add("componentes")
    componentes.appendChild(listComponentes);
   }   


   const button = document.createElement("button");
    button.classList.add("estiloGeralBotoes");    
    button.innerText = "Comprar"
    button.onclick = function(){
        createCartItem(produtos);
        totalPriceValue += produtos.preco;
        totalPrice.innerText = `R$ ${totalPriceValue.toFixed(2)}`;   
        amountValue += 1
        amount.innerText = `${amountValue}`
    }
    

    li.append(img, h3, p, span, componentes, button);
    listProdutos.append(li);
}



// apaga todos produtos da tela
function clearProducts (){
    while (listProdutos.firstChild) {
        listProdutos.removeChild(listProdutos.firstChild);
    }
}


// ---- PROCURAS ----
// procura por tag
function searchByTag (filtro){
    console.log(filtro)
    clearProducts();    
    filtrados = produtos.filter(produtos => produtos.secao.includes(filtro));
    loadProducts(filtrados);    
    if (filtro == "Todos"){
        loadProducts(produtos);    
    }
}

// procura por nome 
function searchByNameItem (filtro){
    clearProducts();
    filtro = filtro.toLowerCase()   
    filtrados = produtos.filter(produtos => produtos.nome.toLowerCase().includes(filtro) || produtos.secao.toLowerCase().includes(filtro) || produtos.categoria.toLowerCase().includes(filtro))
    loadProducts(filtrados);        
}



// procura com enter
searchInput.onkeydown = function(event){    
    console.log(event.key);
    if (event.key === "Enter") {
        searchByNameItem(searchInput.value);                
    }
}

// procura com click - função inicia um evento que é fazer a busca
// do nome pelo input no searchValue.
searchButton.onclick = function(event) {        
        searchByNameItem(searchInput.value);                
}



const svg = document.getElementById("emptyCart");

// CARRINHO E FUNCIONALIDADES 
const columnItems = document.getElementById("columnItems");

function createCartItem (produtos){
    removeCartItem(svg)
    const li = document.createElement("li");
    columnItems.appendChild(li);
    const img = document.createElement("img");
    img.src = produtos.img;    
    li.appendChild(img);
    const main = document.createElement("main");
    li.appendChild(main);
    const p1 = document.createElement("p");
    p1.innerText = produtos.nome;
    main.appendChild(p1);
    const p2 = document.createElement("p");
    p2.innerText = `R$ ${produtos.preco.toFixed(2)}`;
    main.appendChild(p2);
    const button = document.createElement("button");
    button.innerHTML = "Remover"
    button.classList.add("estiloGeralBotoes--remover")
    button.onclick = function (){
        removeCartItem(button);        
        totalPriceValue -= produtos.preco;
        totalPrice.innerText = `R$ ${totalPriceValue.toFixed(2)}`;      
        amountValue -= 1
        amount.innerText = `${amountValue}`
    }
    main.appendChild(button);
}




// para remover chamar função removeCartItem
// tem que achar o elemento do botão pra remover, questão de ID

function removeCartItem (button) {
    const remove = button.closest("li").remove();
}

loadProducts(produtos);





