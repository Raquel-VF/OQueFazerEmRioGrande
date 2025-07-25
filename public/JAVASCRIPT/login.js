import { 
  getAuth, 
  signInWithPopup, 
  signInWithRedirect, 
  getRedirectResult, 
  GoogleAuthProvider, 
  FacebookAuthProvider 
} from "firebase/auth";

const auth = getAuth();
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// Google
document.querySelector('.google').addEventListener('click', async () => {
  const provider = new GoogleAuthProvider();
  try {
    if (isMobile) {
      await signInWithRedirect(auth, provider);
    } else {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      alert(`Bem-vinda, ${user.displayName}`);
      window.location.href = 'HTML/home.html';
    }
  } catch (error) {
    console.error(error);
    alert('Erro no login com Google');
  }
});

// Facebook
document.querySelector('.facebook').addEventListener('click', async () => {
  const provider = new FacebookAuthProvider();
  try {
    if (isMobile) {
      await signInWithRedirect(auth, provider);
    } else {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      alert(`Bem-vinda, ${user.displayName}`);
      window.location.href = './HTML/home.html';
    }
  } catch (error) {
    console.error(error);
    alert('Erro no login com Facebook');
  }
});

// Recuperar usuário depois de redirect
getRedirectResult(auth)
  .then((result) => {
    if (result && result.user) {
      alert(`Bem-vinda, ${result.user.displayName}`);
      window.location.href = 'HTML/home.html';
    }
  })
  .catch((error) => {
    console.error(error);
  });
