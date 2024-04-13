// Pegar as cidades do Maranhão e adicionar ao select de Cidade
var url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados/MA/municipios";

var selectCidades = document.getElementById("cidade");

fetch(url)
    .then(response => response.json())
    .then(data => {
        data.forEach(function (cidade) {
            var option = document.createElement("option");
            option.text = cidade.nome;
            selectCidades.add(option);
        });
    })
    .catch(error => console.error('Erro ao obter cidades:', error));

// Mostrar os nome do arquivo anexados e validar a extensão do arquivo
document.getElementById('documento-res').addEventListener('change', function() {
    var fileName = this.files[0].name;
    var fileExtension = fileName.split('.').pop().toLowerCase();
    var allowedExtensions = ['pdf', 'png', 'jpg'];
    var fileInfo = document.querySelector('.doc-res__custom-file-input .file-info');
    if (allowedExtensions.includes(fileExtension)) {
        fileInfo.querySelector('p').innerText = fileName;
    } else {
        alert('Extensão de arquivo inválida. Por favor, selecione um arquivo PDF, PNG ou JPG.');
    }
});
document.getElementById('documento-id').addEventListener('change', function() {
    var fileName = this.files[0].name;
    var fileExtension = fileName.split('.').pop().toLowerCase();
    var allowedExtensions = ['pdf', 'png', 'jpg'];
    var fileInfo = document.querySelector('.doc-id__custom-file-input .file-info');
    if (allowedExtensions.includes(fileExtension)) {
        fileInfo.querySelector('p').innerText = fileName;
    } else {
        alert('Extensão de arquivo inválida. Por favor, selecione um arquivo PDF, PNG ou JPG.');
    }
});

// Máscara para o campo CPF
document.getElementById('cpf').addEventListener('input', function(e) {
    let cpf = e.target.value.replace(/\D/g, '');
    if (cpf.length > 3) {
        cpf = cpf.substring(0, 3) + '.' + cpf.substring(3); 
    }
    if (cpf.length > 7) {
        cpf = cpf.substring(0, 7) + '.' + cpf.substring(7);
    }
    if (cpf.length > 11) {
        cpf = cpf.substring(0, 11) + '-' + cpf.substring(11); 
    }
    e.target.value = cpf;
});

// Máscara para o campo Telefone
document.getElementById('telefone').addEventListener('input', function(e) {
    let tel = e.target.value.replace(/\D/g, '');
    if (tel.length > 0) {
        tel = '(' + tel.substring(0);
    }
    if (tel.length > 3) {
        tel = tel.substring(0, 3) + ') ' + tel.substring(3);
    }
    if (tel.length > 10) {
        tel = tel.substring(0, 10) + '-' + tel.substring(10);
    }
    e.target.value = tel;
});

document.querySelector('.formulario--botoes-enviar').addEventListener('click', function(event) {
    var documentoId = document.getElementById('documento-id');
    var documentoRes = document.getElementById('documento-res');

    var camposObrigatorios = document.querySelectorAll('input[required], select[required]');
    camposObrigatorios.forEach(function (campo) {
        if (!campo.value){
            alert('Por favor, preencha todos os campos obrigatórios.');
            event.preventDefault();
            return;
        }
    });

    if (!documentoId.files[0] || !documentoRes.files[0]) {
        alert('Por favor, anexe os dois documentos.');
        event.preventDefault();
        return;
    }

    // Validar a idade do usuário
    var dataNascimento = new Date(document.getElementById('data-nascimento').value);
    var hoje = new Date();
    var idade = hoje.getFullYear() - dataNascimento.getFullYear();
    var mes = hoje.getMonth() - dataNascimento.getMonth();

    if (mes < 0 || (mes === 0 && hoje.getDate() < dataNascimento.getDate())) {
        idade--;
    }

    if (idade < 16) {
        alert('Você precisa ter mais de 16 anos.');
        event.preventDefault();
        return;
    }

    alert('Obrigado pela inscrição! Um link de confirmação foi enviado para o email cadastrado.');

});