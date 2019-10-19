import Login from './pages/home.js';
import Cadastro from './pages/cadastro.js';
import Feed from './pages/feed.js';

function init() {
  document.querySelector('main').innerHTML = Login();
}

window.addEventListener('load', init);

const pages = {
  home: Login(),
  cadastro: Cadastro(),
  feed: Feed(),
};

window.addEventListener('hashchange', () => {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      document.querySelector('main').innerHTML = pages[location.hash.substring(1)];
      // User is signed in.
    } else {
        init();
        window.location.hash = '#home'; 
        //arrumar issoooooo
        window.location.hash = '#cadastro';
    }
  });
}, false);

window.addEventListener('load' , () => {
  window.location.hash = '#home';
})