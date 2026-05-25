function calcularIMC() {
    const nome = document.getElementById("nome").value.trim();
    const idade = parseInt(document.getElementById("idade").value);
    const peso = parseFloat(document.getElementById("peso").value);
    const altura = parseFloat(document.getElementById("altura").value);
    const resultado = document.getElementById("resultado");

    document.querySelectorAll(".tabela-imc tr")
        .forEach(tr => tr.classList.remove("ativo"));

    if (nome && idade > 0 && peso > 0 && altura > 0) {
        const imcCalculado = peso / (altura * altura);
        const imc = imcCalculado.toFixed(2);

        let classificacao = "";
        let classeTabela = "";

        if (imcCalculado < 18.5) {
            classificacao = "Abaixo do peso";
            classeTabela = "abaixo-peso";
        } else if (imcCalculado < 25) {
            classificacao = "Eutrófico";
            classeTabela = "eutrofico";
        } else if (imcCalculado < 30) {
            classificacao = "Sobrepeso";
            classeTabela = "sobrepeso";
        } else if (imcCalculado < 35) {
            classificacao = "Obesidade grau I";
            classeTabela = "obesidade1";
        } else if (imcCalculado < 40) {
            classificacao = "Obesidade grau II";
            classeTabela = "obesidade2";
        } else {
            classificacao = "Obesidade grau III";
            classeTabela = "obesidade3";
        }

        resultado.innerText = `IMC: ${imc} (${classificacao})`;


        const linha = document.querySelector(`.${classeTabela}`);
        if (linha) linha.classList.add("ativo");
    } else {
        resultado.innerText = "Preencha nome, idade, peso e altura corretamente.";
    }
}

function mostrarSecao(id) {
    const secoes = document.querySelectorAll("section");

    secoes.forEach(secao => {
        secao.classList.remove("mostrar");
    });
    
if (id !== "avaliacao") {
        limparDados();
    }


    const ativa = document.getElementById(id);
    if (ativa) {
        ativa.classList.add("mostrar");
    }
}

function abrirMenuLateral() {
    document.getElementById("menu-lateral").classList.add("ativo");
}

function fecharMenuLateral() {
    document.getElementById("menu-lateral").classList.remove("ativo");
}

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("section")
        .forEach(secao => secao.classList.remove("mostrar"));

    const home = document.getElementById("home");
    if (home) home.classList.add("mostrar");
});
function limparDados() {
    document.getElementById("nome").value = "";
    document.getElementById("idade").value = "";
    document.getElementById("peso").value = "";
    document.getElementById("altura").value = "";
    document.getElementById("profissional").value = "";

    document.getElementById("resultado").innerText = "";

    document.querySelectorAll(".tabela-imc tr")
        .forEach(tr => tr.classList.remove("ativo"));
}
function imprimirIMC() {
    const nome = document.getElementById("nome").value;
    const idade = document.getElementById("idade").value;
    const peso = document.getElementById("peso").value;
    const altura = document.getElementById("altura").value;
    const profissional = document.getElementById("profissional").value;
    const resultado = document.getElementById("resultado").innerText;

    if (!resultado) {
        alert("Realize o cálculo do IMC antes de imprimir.");
        return;
    }

    const tabela = document.querySelector(".tabela-imc");
    const tabelaIMC = tabela ? tabela.outerHTML : "<p>Tabela não encontrada.</p>";

    const janela = window.open("", "", "width=900,height=700");

    janela.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Avaliação Física - OTC Academia</title>
            <style>
                body {
                    font-family: Arial, Helvetica, sans-serif;
                    padding: 30px;
                }
                .cabecalho {
                    text-align: center;
                    margin-bottom: 30px;
                }
                .cabecalho h1 {
                    margin: 0;
                    color: #0e168a;
                }
                h2 {
                    color: #cc0000;
                    margin-top: 30px;
                }
                p {
                    margin: 6px 0;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                    font-size: 14px;
                }
                th {
                    background-color: #0e168a;
                    color: white;
                    padding: 8px;
                    text-align: left;
                }
                td {
                    padding: 6px;
                    border-bottom: 1px solid #ddd;
                }
                tr.ativo {
                    background-color: #ffdddd;
                    font-weight: bold;
                }
                .assinatura {
                    margin-top: 50px;
                    text-align: center;
                }
                .resultado-impressao {
                    font-size: 22px;
                    font-weight: bold;
                    color: #0e168a;
                    margin: 15px 0;
                }

            </style>
        </head>
        <body>

            <div class="cabecalho">
                <h1>OTC Academia</h1>
                <p>Avaliação Física - IMC</p>
            </div>

            <p><strong>Aluno:</strong> ${nome}</p>
            <p><strong>Idade:</strong> ${idade} anos</p>
            <p><strong>Peso:</strong> ${peso} kg</p>
            <p><strong>Altura:</strong> ${altura} m</p>

            <h2>Resultado</h2>
        <p class="resultado-impressao">
         ${resultado.replace(/\n/g, "<br>")}
        </p>


            <h2>Tabela de Classificação IMC (OMS)</h2>
            ${tabelaIMC}

            <div class="assinatura">
                <p>____________________________________</p>
                <p><strong>${profissional}</strong></p>
                <p>Profissional Responsável</p>
            </div>

            <script>
                window.print();
                window.onafterprint = () => window.close();
            </script>

        </body>
        </html>
    `);

    janela.document.close();
}
document.addEventListener("DOMContentLoaded", () => {

    const imagensHome = Array.from(document.querySelectorAll(".home-galeria img"));
    const imagensGaleria = Array.from(document.querySelectorAll(".galeria-grid img"));
    const imagensProfessor = Array.from(document.querySelectorAll("#professores .card-professor img"));
    const imagensPlanos = Array.from(document.querySelectorAll(".plano-card img"));

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    let imagensAtuais = [];
    let indiceAtual = 0;

    function abrirLightbox(imagens, indice) {
        imagensAtuais = imagens;
        indiceAtual = indice;
        lightboxImg.src = imagensAtuais[indiceAtual].src;
        lightbox.style.display = "flex";
    }
    lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        fecharLightbox();
    }
    });


    function fecharLightbox() {
        lightbox.style.display = "none";
    }

    function proximaImagem() {
        if (imagensAtuais.length > 1) {
            indiceAtual = (indiceAtual + 1) % imagensAtuais.length;
            lightboxImg.src = imagensAtuais[indiceAtual].src;
        }
    }

    function imagemAnterior() {
        if (imagensAtuais.length > 1) {
            indiceAtual = (indiceAtual - 1 + imagensAtuais.length) % imagensAtuais.length;
            lightboxImg.src = imagensAtuais[indiceAtual].src;
        }
    }

    // HOME
    imagensHome.forEach((img, index) => {
        img.addEventListener("click", () => {
            abrirLightbox(imagensHome, index);
        });
    });

    // GALERIA
    imagensGaleria.forEach((img, index) => {
        img.addEventListener("click", () => {
            abrirLightbox(imagensGaleria, index);
        });
    });

    // PROFESSOR (normalmente só 1 imagem)
    imagensProfessor.forEach((img, index) => {
        img.addEventListener("click", () => {
            abrirLightbox(imagensProfessor, index);
        });
    });
    // PLANOS
     imagensPlanos.forEach((img, index) => {
         img.addEventListener("click", () => {
        abrirLightbox(imagensPlanos, index);
     });
    });

    // Teclado
    document.addEventListener("keydown", (e) => {
        if (lightbox.style.display === "flex") {
            if (e.key === "ArrowRight") proximaImagem();
            if (e.key === "ArrowLeft") imagemAnterior();
            if (e.key === "Escape") fecharLightbox();
        }
    });

    // Expor funções para o HTML
    window.fecharLightbox = fecharLightbox;
    window.proximaImagem = proximaImagem;
    window.imagemAnterior = imagemAnterior;
});


function abrirInfo(id) {

    const foto = document.getElementById("foto-prof");
    const nome = document.getElementById("nome-prof");
    const desc = document.getElementById("desc-prof");

    if (id === "carlos-costa") {

        foto.src = "assets/img/carlos-costa-modal.png";

        nome.innerText = "Professor Carlos Costa";

        desc.innerHTML = `
        <p><strong>Mestre de Taekwondo – 7º Dan </strong></p>

Formado em Educação Física - CREF 027088-G/SP<br>
Personal Trainer em defesa pessoal e atividade física em geral<br><br>

Foi atleta da seleção brasileira de taekwondo:<br><br>

• 10 vezes campeão paulista<br>
• 9 vezes campeão brasileiro<br>
• Bicampeão Sul-Americano<br>
• Bronze Sul-Americano<br>
• Campeão Pan-Americano(Aruba)<br>
• 2 vezes bronze Pan-Americano(Cuba 97 / Santo Domingo 03)<br>
• Bronze Campeonato Ibero-Americano<br>
• Campeão de 15 seletivas nacionais<br>
• Participação em 5 campeonatos mundiais<br>
• 5º lugar no Mundial no Canadá<br>
• Participação em 3 copas do mundo (bronze no Egito 97)<br><br>

• Integrante da seleção brasileira por 10 anos<br>
• Participação nos Jogos Pan-Americanos de Santo Domingo<br>
• Participação nos Jogos Olímpicos de Sydney
`;
    }
    
    else if (id === "carlos-costa-junior") {

        foto.src = "assets/img/carlos-costa-junior-modal.png"; // <-- ajuste pro nome real da sua imagem
        nome.innerText = "Carlos Costa Junior";

        desc.innerHTML = `
<p><strong>Professor de Taekwondo – 2º Dan</strong></p>

<p>
Cursando formação em Educação Física, atua como personal fight na Academia OTC,
com foco em defesa pessoal e condicionamento físico em geral.
</p>

<p>Foi atleta de Taekwondo desde muito jovem, conquistando diversos campeonatos como:</p>

<ul>
  <li>Campeonatos BadBoy</li>
  <li>Campeonato Paulista</li>
  <li>Copa América (pela Liga)</li>
  <li>Campeonato Brasileiro (pela Liga)</li>
  <li>Disputou Campeonato Brasileiro pela CBTKD</li>
</ul>

<p>
Hoje atua como treinador da equipe OTC, levando diversos atletas a campeonatos e conquistas.
</p>
        `;
    }
else if (id === "vlademir") {

    foto.src = "assets/img/vlademir-modal.png"; // nome da imagem (ajusta se precisar)

    nome.innerText = "Vlademir Henrique";

    desc.innerHTML = `
<p><strong>Mestre de Muay Thai</strong></p>

<p>
Atua na área esportiva há cerca de 24 anos, com vasta experiência e conhecimento na área de competição.
</p>

<p>
É Personal Fight de Muay Thai e Boxe, possui cursos de arbitragem, seminários e formação em defesa pessoal.
</p>

<p>
Como atleta, conquistou títulos importantes:
</p>

<ul>
  <li>Campeão Regional</li>
  <li>Campeão Paulista</li>
  <li>Campeão Brasileiro de Muay Thai</li>
</ul>

<p>
Também se destaca na formação de diversos campeões no esporte.
</p>

<p><strong>Atuação atual:</strong></p>

<ul>
  <li>Mestre pela CMTB e atual Diretor STJ pela CMTB</li>
  <li>Árbitro de Muay Thai, MMA e Boxe</li>
  <li>Instrutor de Boxe, filiado à COBRAM</li>
  <li>Professor na Academia OTC</li>
</ul>
    `;
}
else if (id === "anderson") {

    foto.src = "assets/img/anderson-modal.png"; // ajusta se o nome for outro

    nome.innerText = "Anderson";

    desc.innerHTML = `
<p><strong>Professor Faixa Preta de Jiu-Jitsu</strong></p>

<p>
Possui formação como Bombeiro Civil e atua como professor de Jiu-Jitsu, com experiência no ensino da modalidade
voltada à defesa pessoal.
</p>

<p>
Tem amplo conhecimento técnico no esporte, trabalhando com alunos de diversas faixas etárias, contribuindo
para o desenvolvimento físico, disciplina e segurança dos praticantes.
</p>

<p>
Atualmente ministra aulas na Academia OTC, promovendo o aprendizado e evolução dos alunos na modalidade.
</p>
    `;
}


    document.getElementById("modal-professor").style.display = "flex";
}

function fecharModal() {
    document.getElementById("modal-professor").style.display = "none";
}
document.getElementById("modal-professor").addEventListener("click", function(e) {
    if (e.target.id === "modal-professor") {
        fecharModal();
    }
});
function abrirCadastro() {
    const modal = document.getElementById("modal-cadastro");
    modal.style.display = "flex";

    // animação
    modal.classList.add("ativo");
    modal.setAttribute("aria-hidden", "false");

    // foco no primeiro campo
    setTimeout(() => {
        const nome = document.getElementById("cad-nome");
        if (nome) nome.focus();
    }, 50);
}

function fecharCadastro() {
  const modal = document.getElementById("modal-cadastro");
  const form = document.getElementById("form-cadastro");
  const erro = document.getElementById("cad-erro");

  // limpa tudo
  if (form) form.reset();
  if (erro) erro.textContent = "";

  modal.classList.remove("ativo");
  modal.setAttribute("aria-hidden", "true");

  setTimeout(() => {
    modal.style.display = "none";
  }, 200);
}

/* Fecha clicando fora do box */
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal-cadastro");
    if (!modal) return;

    modal.addEventListener("click", (e) => {
        if (e.target === modal) fecharCadastro();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.style.display === "flex") fecharCadastro();
    });
});

/* Enviar dados para WhatsApp (CTA forte) */
function enviarCadastro(event) {
  event.preventDefault();

  const nome = document.getElementById("cad-nome").value.trim();
  const tel = document.getElementById("cad-telefone").value.trim();
  const email = document.getElementById("cad-email").value.trim();

  const plano = document.getElementById("cad-plano").value;

  const cep = document.getElementById("cad-cep").value.trim();
  const rua = document.getElementById("cad-rua").value.trim();
  const campoComplemento = document.getElementById("cad-complemento");
  const complemento = campoComplemento ? campoComplemento.value.trim() : "";
  const numero = document.getElementById("cad-numero").value.trim();
  const bairro = document.getElementById("cad-bairro").value.trim();
  const cidade = document.getElementById("cad-cidade").value.trim();
  const estado = document.getElementById("cad-estado").value.trim();

  const erro = document.getElementById("cad-erro");
  erro.textContent = "";

  // validações simples
  if (nome.length < 3) {
    erro.textContent = "Digite um nome válido.";
    return;
  }

  const soDigitos = tel.replace(/\D/g, "");
  if (soDigitos.length < 10) {
    erro.textContent = "Digite um telefone válido com DDD.";
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    erro.textContent = "Digite um e-mail válido.";
    return;
  }

  if (!plano) {
    erro.textContent = "Selecione um plano.";
    return;
  }

  // monta o endereço só com o que estiver preenchido (não obriga tudo)
  const enderecoPartes = [];
  if (rua) enderecoPartes.push(rua);
  if (numero) enderecoPartes.push("nº " + numero);
  if (complemento) enderecoPartes.push(complemento);
  if (bairro) enderecoPartes.push(bairro);
  if (cidade) enderecoPartes.push(cidade);
  if (estado) enderecoPartes.push(estado);
  if (cep) enderecoPartes.push("CEP " + cep);

  const endereco = enderecoPartes.length ? enderecoPartes.join(" - ") : "Não informado";

  // monta mensagem
  const msg =
`Olá! Quero me matricular na OTC Academia.
Nome: ${nome}
Telefone: ${tel}
Email: ${email}
Plano: ${plano}
Endereço: ${endereco}`;

  const url = "https://wa.me/5519991524542?text=" + encodeURIComponent(msg);

  window.open(url, "_blank");

// limpa campos e mensagem de erro
  document.getElementById("form-cadastro").reset();
  document.getElementById("cad-erro").textContent = "";

  fecharCadastro();
}
function buscarCEP() {
    let cep = document.getElementById("cad-cep").value.replace(/\D/g, '');

    if (cep.length !== 8) return;

    // libera campos antes
    document.getElementById("cad-rua").readOnly = false;
    document.getElementById("cad-bairro").readOnly = false;
    document.getElementById("cad-cidade").readOnly = false;
    document.getElementById("cad-estado").readOnly = false;

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(dados => {

            if (dados.erro) {
                console.log("CEP não encontrado");
                return;
            }

            document.getElementById("cad-rua").value = dados.logradouro || '';
            document.getElementById("cad-bairro").value = dados.bairro || '';
            document.getElementById("cad-cidade").value = dados.localidade || '';
            document.getElementById("cad-estado").value = dados.uf || '';

            // trava depois de preencher
            document.getElementById("cad-rua").readOnly = true;
            document.getElementById("cad-bairro").readOnly = true;
            document.getElementById("cad-cidade").readOnly = true;
            document.getElementById("cad-estado").readOnly = true;

        })
        .catch(() => {
            console.log("Erro ao buscar CEP");
        });
}
document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("modal-cadastro");
    if (!modal) return;

    const cepInput = document.getElementById("cad-cep");

    let ultimoCEP = ""; // 🔥 agora está no lugar certo

    if (cepInput) {
        cepInput.addEventListener("input", function (e) {

            let value = e.target.value.replace(/\D/g, '');

            if (value.length > 5 && value.length <= 8) {
                value = value.slice(0,5) + '-' + value.slice(5,8);
            }

            e.target.value = value;

            // 🔥 CHAMADA CONTROLADA
            if (value.length === 9 && value !== ultimoCEP) {
                ultimoCEP = value;
                buscarCEP();
            }

        });
    }

    modal.addEventListener("click", (e) => {
        if (e.target === modal) fecharCadastro();
    });

});
