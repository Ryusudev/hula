
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Login function
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      document.getElementById("message").style.color = "green";
      document.getElementById("message").innerText = "Login successful!";
    })
    .catch((error) => {
      document.getElementById("message").innerText = error.message;
    });
}
