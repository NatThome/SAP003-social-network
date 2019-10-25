import Button from '../components/button.js';
import textArea from '../components/textarea.js';

// function edit(){
//   const id = event.target.dataset.id;
//   let texto = 'abobora com pimenta';

//   firebase.firestore().collection('post').doc(id).update({
//     publi:texto
//   });
// }
function logout() {
  firebase.auth().signOut().then(function() {
  }).catch(function(error) {
    console.log(error);
  });
}

function delet(){
  const id = event.target.dataset.id;
  firebase.firestore().collection('posts').doc(id).delete();
  document.querySelector(`li[data-id='${id}']`).remove();
}

function sendPost() {
  const publi = document.querySelector('.area-publicacao').value;
  const id = firebase.auth().currentUser.uid;
  const time = new Date().toLocaleString('pt-BR')
  
  const post = {
    publi,
    id,
    time
  };

  firebase.firestore().collection('posts').add(post)
     
    window.mostraPost()

    document.querySelector('.area-publicacao').value='';
}

function mostraPost(){
  const allPosts = firebase.firestore().collection('posts');
 
  allPosts.orderBy('time', 'desc').get().then(snap => {
    let postsLayout = '';
    snap.forEach((doc) => {  
      postsLayout += `
        <li data-id='${doc.id}' class='post'>
        <p class='time'> ${doc.data().time} </p>
        <p> ${doc.data().publi} </p>
          ${Button ({ dataId:doc.id, title:'Editar'})}
          ${Button({ dataId: doc.id, title: 'Deletar', onClick: delet })}
        </li>
      `;
    });
    document.getElementById('post-layout').innerHTML = postsLayout; 
  }); 
}

function Feed() {

  const temp = `
  <header>
  <h2> Feed</h2> 
  ${Button ({id: 'voltar', title: 'Sair', onClick: logout})}
  </header>
  <form class='areaFeed'>
  ${textArea ({rows: '3',cols: '30', wrap: 'hard',class: 'area-publicacao', id: 'area-publicacao' })}
  ${Button ({class:'button', id:'publicacao', title: 'Publicar', onClick:sendPost })}
  <ul id='post-layout'></ul>
  </form>

`;
  return temp;
}

window.mostraPost = mostraPost;

export default Feed;