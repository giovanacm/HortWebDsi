function carregarPagina(pagina) {
  $(".navbar").removeClass("d-none");
  $("#footer").removeClass("d-none");
  if (pagina == "./carrinho.html") {
    $("#footer").addClass("d-none");
  } else if (pagina == "./error.html") {
    $("#footer").addClass("d-none");
    $(".navbar").addClass("d-none");
  }

  $("#carregaPaginas").load(pagina);
  carregarCarrinho();
}

carregarPagina("./inicio.html");
