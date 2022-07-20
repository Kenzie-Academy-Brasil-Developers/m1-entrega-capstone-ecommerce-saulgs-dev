let ul = document.querySelector(".produtos-container");
let produtosNoCarrinho = [];

// função pra gerar cada produto através de cada objeto do database
function criaLi(objeto) {
  let id = objeto.id;
  let img = objeto.img;
  let tittle = objeto.nameItem;
  let description = objeto.description;
  let value = objeto.value;
  let categoria = objeto.tag;

  let li = document.createElement("li");
  li.classList.add("card-container");
  li.setAttribute("id", id);

  let imagemCard = document.createElement("img");
  let div = document.createElement("div");
  div.classList.add("card-description-container");
  let pCategoria = document.createElement("p");
  pCategoria.classList.add("card-categoria");
  let pTittle = document.createElement("p");
  pTittle.classList.add("card-tittle");
  let pDescription = document.createElement("p");
  pDescription.classList.add("card-description");
  let pPrice = document.createElement("p");
  pPrice.classList.add("card-price");
  let button = document.createElement("button");
  button.classList.add("card-button");

  imagemCard.src = img;
  imagemCard.alt = tittle;
  pCategoria.innerText = categoria;
  pTittle.innerText = tittle;
  pDescription.innerText = description;
  pPrice.innerHTML = `R$${value},00`;
  button.innerText = "Adicionar Carrinho";

  div.append(pCategoria, pTittle, pDescription, pPrice, button);
  li.append(imagemCard, div);

  return li;
}

function criaLiCarrinho(objeto) {
  let li = document.createElement("li");
  li.classList.add("item-carrinho-container");
  li.setAttribute("id", objeto.id);
  let imagem = document.createElement("img");
  let divC = document.createElement("div");
  divC.classList.add("item-description");
  let pT = document.createElement("p");
  pT.classList.add("item-carrinho-tittle");
  let pP = document.createElement("p");
  pP.classList.add("item-price");
  let pB = document.createElement("button");
  pB.classList.add("item-button");

  imagem.src = objeto.img;
  imagem.alt = objeto.nameItem;
  pT.innerText = objeto.nameItem;
  pP.innerHTML = `R$${objeto.value},00`;
  pB.innerText = "Remover do carrinho";

  divC.append(pT, pP, pB);
  li.append(imagem, divC);

  return li;
}

//função que passa pelo array de objetos usando a função que gera os li pra inserir os produtos na Ul
function inserirLi(array) {
  for (let i in array) {
    let objeto = array[i];
    let li = criaLi(objeto);
    ul.appendChild(li);
  }
}

inserirLi(data);

let divCarrinho = document.querySelector(".carrinho");
let vazio = document.querySelector(".carrinho-default");

function renderArray(produtosNoCarrinho) {
  let ulCarrinho = document.createElement("ul");
  ulCarrinho.classList.add("inserir-Li");

  divCarrinho.innerHTML = "";
  for (let i in produtosNoCarrinho) {
    let objeto = produtosNoCarrinho[i];
    let li = criaLiCarrinho(objeto);
    ulCarrinho.appendChild(li);
    divCarrinho.append(ulCarrinho);
  }
}

ul.addEventListener("click", (evento) => {
  let el = evento.target;
  let estoque = data;

  let atributos = el.closest("li");
  let id = atributos.id;

  if (el.tagName == "BUTTON") {
    for (let i in estoque) {
      let obj = estoque[i];
      if (id == estoque[i].id) {
        produtosNoCarrinho.push(obj);
      }
    }
  }

  if (produtosNoCarrinho.length > 0) {
    renderArray(produtosNoCarrinho);
  }
  calculaCarrinho(produtosNoCarrinho);
});

let ulCarrinho2 = document.querySelector(".inserir-Li");

divCarrinho.addEventListener("click", (e) => {
  let el = e.target;

  let atributos = el.closest("li");
  let id = atributos.id;

  if (el.tagName == "BUTTON") {
    for (let i in produtosNoCarrinho) {
      let obj = produtosNoCarrinho[i];
      let index = produtosNoCarrinho.indexOf(obj);

      if (id == obj.id) {
        produtosNoCarrinho.splice(index, 1);
        renderArray(produtosNoCarrinho);
      } else if (produtosNoCarrinho.length == 0) {
        divCarrinho.innerHTML = "";
      }
    }
  }
  if (produtosNoCarrinho.length == 0) {
    divCarrinho.innerHTML = `<div class="carrinho-default">
    <p class="carrinho-vazio">Carrinho Vázio</p>
    <p class="adicione-item">Adicione Item</p>
    </div>`;
  }
  calculaCarrinho(produtosNoCarrinho);
});

let resultadoCarrinho = document.querySelector(".carrinho-footer");

function calculaCarrinho(produtosNoCarrinho) {
  let result = 0;
  let quantidade = produtosNoCarrinho.length;

  for (let i in produtosNoCarrinho) {
    let valor = produtosNoCarrinho[i].value;
    result += valor;
  }

  return resultadoCarrinho.innerHTML = `
              <div class="carrinho-quantidade">
              <p class="quantidade">Quantidade:</p>
              <p class="quantidade-itens">${quantidade}</p>
              </div>
              <div class="carrinho-total">
              <p class="total">Total</p>
              <p class="total-itens">R$${result},00</p>
              </div>`
}
