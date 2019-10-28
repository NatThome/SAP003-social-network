import Button from '../components/button.js';
import Input from '../components/input.js';

function pgCadastro() {
  window.location.hash = '#cadastro';
}

function enviarLogin() {
  const email = document.querySelector('.email-input').value;
  const password = document.querySelector('.senha-input').value;

  firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
    window.location.href = '#feed';
  })
    .catch((error) => {
      const errorCode = error.code;
      // const errorMessage = error.message;
      alert(errorCode);
    });
}

function googleSignIn(){
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function (result) {
    const token = result.credential.accessToken;
    const user = result.user;
    window.location.href = '#feed';
  }).catch(function (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    const credential = error.credential;
  });
}

function Login() {
  const template = `
  <header>
    <img src="imagens/funny-banner.png" class="logo">
  </header>
  <section class="geral">
  <h1 class = "name-page"> Funny Motivation</h1>
  <h3 class = "bem-vindx"> Sejam Bem-vindas</h3>
  
  <form class="form">
  ${Input({
    class:"input email-input",
    id: 'email-input',
    placeholder: ' E-mail',
    type: 'text',
  })}
  ${Input({
    class:"input senha-input",
    id: 'senha-input',
    placeholder: ' Senha',
    type: 'password',
  })}</form>
    <div class="btn btn-enviar">

  ${Button({
    class: 'button',
    id: 'enviar',
    title: 'Login',
    onClick: enviarLogin,
  })}</div>
    <div class="btn btn-google">
    <h5 class="ou-entre"> Ou entre com </h5>
  ${Button({
    id:'google',
    title:'<i class="fab fa-google"></i>',
    onClick: googleSignIn, 
  })}</div>
    <div class="btn btn-cadastrar">
  ${Button({
    class: 'button',
    id: 'cadastrar',
    title: 'Cadastre-se',
    onClick: pgCadastro,
  })}</div> </section>
`;

  return template;
}

export default Login;

