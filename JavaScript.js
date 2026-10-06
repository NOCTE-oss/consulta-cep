async function buscarCEP() {
    const cepInput = document.getElementById("cep");
    const cepDigitado = cepInput.value;

    console.log(cepDigitado);

    const cepLimpo = cepDigitado.replace(/\D/g, "");
    if (cepLimpo.length !== 8) {
        alert("CEP inválido");
        cepInput.focus();
        cepInput.value = "";
        return;
    }

    console.log("Cep limpo:", cepLimpo);

    document.getElementById("carregando").style.display = "block";
    document.getElementById("resultado").style.display = "none";
    document.getElementById("mapa-janela").style.display = "none";
    document.getElementById("mensagem-erro").style.display = "none";

    try {
        const resposta = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        const dados = await resposta.json();


        document.getElementById("carregando").style.display = "none";

        if (dados.erro) {
            document.getElementById("mensagem-erro").style.display = "block";
            return;
        }

        document.getElementById("res-cep").textContent = dados.cep;
        document.getElementById("res-rua").textContent = dados.logradouro;
        document.getElementById("res-bairro").textContent = dados.bairro;
        document.getElementById("res-cidade").textContent = dados.localidade;
        document.getElementById("res-estado").textContent = dados.uf;

        document.getElementById("resultado").style.display = "block";

        const enderecoBusca = `${dados.logradouro}, ${dados.localidade}, ${dados.uf}`;
        const mapaSrc = `https://www.google.com/maps?q=${encodeURIComponent(enderecoBusca)}&output=embed`;

        document.getElementById("mapa").src = mapaSrc;
        document.getElementById("mapa-janela").style.display = "block";
    } catch (erro) {
        console.log("Deu erro na busca: ", erro);
    }
}



