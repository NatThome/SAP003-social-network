import Login from './pages/home.js';
import Cadastro from './pages/cadastro.js';
import Feed from './pages/feed.js';

const pages = {
  home: Login(),
  cadastro: Cadastro(),
  feed: Feed(),
};

function init() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      if (location.hash.substring(1)) {
        document.querySelector('main').innerHTML = pages[location.hash.substring(1)];
        window.mostraPost()
      } else {
        document.querySelector('main').innerHTML = pages.home
      }
    } else {
      if( window.location.hash === '#home'){
        document.querySelector('main').innerHTML = pages.home
      }else if ( window.location.hash === '#cadastro'){
        document.querySelector('main').innerHTML = pages.cadastro
      } else {
        window.location.hash = '#home'; 
      }
    }
  });
}

window.addEventListener('load', init);
window.addEventListener('hashchange', init , false);

