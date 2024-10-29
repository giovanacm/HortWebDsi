function addCarrinho(element) {
  // Obter informações do produto usando os data-attributes
  const productId = $(element).data("id");
  const productName = $(element).data("nome");
  const productPrice = parseFloat($(element).data("preco"));

  // Verificar se o carrinho existe no localStorage
  let cart = JSON.parse(localStorage.getItem("carrinho")) || [];

  // Verificar se o produto já está no carrinho
  const existingProduct = cart.find((item) => item.id === productId);

  if (existingProduct) {
    // Se o produto já existe, incrementa a quantidade
    existingProduct.quantidade += 1;
  } else {
    // Se o produto não existe, adiciona um novo item ao carrinho
    const newProduct = {
      id: productId,
      nome: productName,
      preco: productPrice,
      quantidade: 1,
    };
    cart.push(newProduct);
  }

  // Atualizar o localStorage com o carrinho atualizado
  localStorage.setItem("carrinho", JSON.stringify(cart));

  // Mensagem de confirmação
  alert(`Produto "${productName}" adicionado ao carrinho!`);
}

// Função para exibir o carrinho (opcional para verificar os itens)
function exibirCarrinho() {
  const cart = JSON.parse(localStorage.getItem("carrinho")) || [];
  console.log("Carrinho:", cart);
}

// Função para limpar o carrinho (opcional para testes)
function limparCarrinho() {
  localStorage.removeItem("carrinho");
  alert("Carrinho limpo!");
}

function carregarCarrinho() {
  let cont = 0;
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const carrinhoLista = $("#carrinho-lista");
  const totalPreco = $("#total-preco");

  carrinhoLista.html("");
  let total = 0;

  carrinho.forEach((produto) => {
    cont++;
    // Calcula o preço total do produto pela quantidade
    const precoTotalProduto = produto.preco * produto.quantidade;
    total += precoTotalProduto;

    // Atualiza o total de itens no carrinho
    $('#carrinhoTot').html(cont);

    // Cria o elemento de produto no carrinho
    const produtoDiv = $(`
      <div class="produto">
        <div class="produto-info col-6">
          <span class="produto-nome">${produto.nome}</span>
          <span class="produto-preco">R$ ${produto.preco.toFixed(2)} un</span>
        </div>
        <div class="produto-quantidade d-flex justify-content-end col-2">
          <button class="quantidade-btn p-2" onclick="alterarQuantidade('${produto.id}', -1)">-</button>
          <input class="quantidade-input p-2" type="text" value="${produto.quantidade}" readonly>
          <button class="quantidade-btn p-2" onclick="alterarQuantidade('${produto.id}', 1)">+</button>
        </div>
        <div class="text-end p-2 col-4">
          <span>R$ ${precoTotalProduto.toFixed(2)}</span>
          <button class="bg-danger border text-white" onclick="removerProduto('${produto.id}')">Remover</button>
        </div>
      </div>
    `);
    carrinhoLista.append(produtoDiv);
  });

  // Exibe o total atualizado
  totalPreco.text(`Total: R$ ${total.toFixed(2)}`);
}

function alterarQuantidade(produtoId, quantidade) {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const produto = carrinho.find((item) => item.id === produtoId);

  if (produto) {
    produto.quantidade += quantidade;
    if (produto.quantidade <= 0) {
      const res = confirm("Remover produto do Carrinho?");
      if (res) {
        removerProduto(produtoId);
      }
    } else {
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
      carregarCarrinho();
    }
  }
}

function removerProduto(produtoId) {
  const res = confirm("Remover produto do Carrinho?");
  if (res) {
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho = carrinho.filter((item) => item.id !== produtoId);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    carregarCarrinho();
  }
}

// Carrega o carrinho ao abrir a página
$(document).ready(function() {
  carregarCarrinho();
});
