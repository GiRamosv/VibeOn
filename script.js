// Substituímos o btnAdicionar pelo formAdicionar, pois o ID "formAdicionar" existe no HTML
const formAdicionar = document.getElementById("formAdicionar");
const inputMusica = document.getElementById("nomeMusica");
const inputArtista = document.getElementById("nomeArtista");
const contador = document.getElementById("contadorMusicas");
const lista = document.getElementById("listaMusicas");
const musicasJuntas = document.getElementById("musicasJuntas");
const artistaFiltrar = document.getElementById("artistaFiltro");
const btnFiltrar = document.getElementById("btnFiltrar");
const resultadoFiltro = document.getElementById("resultadoFiltro");

let playlist = [];

// Verifica se o formulário existe na página atual antes de adicionar o evento
if (formAdicionar) {
  // Escutamos o evento de "submit" (envio) do formulário
  formAdicionar.addEventListener("submit", function (event) {
    // ESSENCIAL: Impede que a página recarregue e apague o array
    event.preventDefault();

    let musica = {
      nome: inputMusica.value,
      artista: inputArtista.value,
    };

    playlist.push(musica);

    const novaMusica = document.createElement("li");
    novaMusica.textContent = musica.nome + " - " + musica.artista;

    // Adicionamos a música na lista antes de anexar o botão para manter a ordem visual
    lista.appendChild(novaMusica);

    const remover = document.createElement("button");
    remover.textContent = "Remover";
    novaMusica.appendChild(remover);

    remover.addEventListener("click", function () {
      let indice = playlist.indexOf(musica);

      playlist.splice(indice, 1);

      novaMusica.remove();

      if (contador) contador.textContent = playlist.length;

      atualizarMusicas();
    });

    inputMusica.value = "";
    inputArtista.value = "";

    if (contador) contador.textContent = playlist.length;

    atualizarMusicas();
  });
}

function atualizarMusicas() {
  if (!musicasJuntas) return; // Evita erro se o elemento não existir na tela

  let nomes = playlist.map(function (musica) {
    return musica.nome;
  });

  if (nomes.length > 0) {
    musicasJuntas.textContent = nomes.join(", ");
  } else {
    musicasJuntas.textContent = "Nenhuma música adicionada.";
  }
}

// Verifica se o botão de filtro existe na página atual antes de adicionar o evento
if (btnFiltrar) {
  btnFiltrar.addEventListener("click", function () {
    let artista = artistaFiltrar.value.toLowerCase();

    let musicasFiltradas = playlist.filter(function (musica) {
      return musica.artista.toLowerCase() === artista;
    });

    if (resultadoFiltro) {
      resultadoFiltro.innerHTML = "";

      if (musicasFiltradas.length > 0) {
        musicasFiltradas.forEach(function (musica) {
          let resultado = document.createElement("p");
          resultado.textContent = musica.nome + " - " + musica.artista;
          resultadoFiltro.appendChild(resultado);
        });
      } else {
        let resultado = document.createElement("p");
        resultado.textContent = "Nenhum artista encontrado.";
        resultadoFiltro.appendChild(resultado);
      }
    }
  });
}
