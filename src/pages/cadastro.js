import Button from '../components/button.js';
import Input from '../components/input.js';

function cadastrarUser() {
  const nome = document.querySelector('.nome-input').value;
  const sobrenome = document.querySelector('.sobrenome-input').value;
  const email = document.querySelector('.email-input').value;
  const nascto = document.querySelector('.dtNasc-input').value;
  const password = document.querySelector('.senha-input').value;
  firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
    window.location.href = '#home';
  }).catch((error) => {
      const errorCode = error.code;
      alert(errorCode);
    });
  const user = {
    nome,
    sobrenome,
    nascto,
    email,
  };

  firebase.firestore().collection('users').add(user).then((res) => {
    nome.value = '';
    sobrenome.value = '';
    nascto.value = '';
    email.value = '';
    password.value = '';
  });  
}

function voltarPg() {
  window.location.href = '#home';
}

function Cadastro() {
  const template = `
  <section class="dados-cadastro">
  <h1 class = "name-page"> Cadastro</h1>
  <form class="form-cadastro">
    ${Input({class:'input nome-input', placeholder: 'Nome', type: 'text' })}
    ${Input({class:'input sobrenome-input', placeholder: 'Sobrenome', type: 'text' })}
    ${Input({class:'input dtNasc-input', placeholder: 'Nascimento', type: 'date' })}
    ${Input({class:'input email-input', placeholder: 'E-mail', type: 'text' })}
    ${Input({class:'input senha-input', placeholder: 'Senha', type: 'password' })}
    ${Button({class:'button cadastro', title: 'Cadastrar', onClick: cadastrarUser })}
    ${Button({class:'button voltar', title: 'Voltar', onClick: voltarPg })}
  </form>
  </section>
`;
  return template;
}

export default Cadastro;