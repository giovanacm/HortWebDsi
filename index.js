
function carregarPagina(pagina) {
  if(pagina == "carrinho.html"){
    $('#footer').addClass("d-none")
  } else {
    $('#footer').removeClass("d-none")
  }
  $("#carregaPaginas").load(pagina);
}

carregarPagina('./inicio.html')