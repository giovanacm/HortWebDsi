
function carregarPagina(pagina) { 
  $("#carregaPaginas").load(pagina);
  carregarCarrinho();
}

carregarPagina('./inicio.html')
