import Button from '../components/button.js';
import textArea from '../components/textarea.js';

function voltarPg() {
  firebase.auth().signOut().then(function() {
    window.location.href = '#home';
  }).catch(function(error) {
    console.log(error);
  });
}

function delet(){
  const id = event.target.dataset.id;
  firebase.firestore().collection('posts').doc(id).delete();
  //event.target.parentElement.remove();
  document.querySelector(`li[data-id='${id}']`).remove();
}

function sendPost() {
  const publi = document.querySelector('.area-publicacao').value;
  const id = firebase.auth().currentUser.uid;
  
  const post = {
    publi,
  };

  firebase.firestore().collection('posts').add({ post, user: id })
    // .then((docRef) => {
    //   document.querySelector('ul').insertAdjacentHTML('afterbegin', `
    //     <li data-id='${docRef.id}'> 
    //     ${text}
    //     ${Button({class:'button', id: 'deletar', title: 'Deletar', onClick: delet })}
    //     </li>
    //   `)
    // })

    window.show()
}


function show (){
  const allPosts = firebase.firestore().collection('posts');
 
  allPosts.get().then(snap => {
    let postsLayout = '';
    snap.forEach((doc) => {  
      postsLayout += `
        <li data-id='${doc.id}'>
          ${doc.data().post.publi}
          ${Button({ dataId: doc.id, title: 'Deletar', onClick: delet })}
        </li>
      `;
    });
    document.getElementById('paloma').innerHTML = postsLayout;
  }); 
}


function Feed() {

  const temp = `
  <h2> Feed</h2> 
  ${textArea ({rows: '3',cols: '30', wrap: 'hard',class: 'area-publicacao', id: 'area-publicacao' })}
  ${Button ({class:'button', id:'publicacao', title: 'Publicar', onClick:sendPost })}
  ${Button ({class:'button', id: 'voltar', title: 'voltar', onClick: voltarPg })}
  <ul id='paloma'></ul>
`;
  return temp;
}

window.show = show;

export default Feed;



// function loadData() {
//   const postColections = firebase.firestore().collection('posts');
//   const postList = document.getElementById('area-publicacao');
//   postList.innerHTML = 'carregando...';
//   postColections.orderBy('timestamp').get().then((snap) => {
//     postList.innerHTML = '';
//     snap.forEach((post) => {
//       addPost(post);
//       //console.log(post.data());
//     });
//   });
// }

// function addPost(post) {
//   const postList = document.getElementById('posts');
//   const postTemplate = `
//   <li>
//   ${post.data().timestamp.toDate().toLocaleString('pt-BR')}:
//   ${post.data().text}
//   </li>
//   `;

//   postList.innerHTML = postTemplate;
// }
