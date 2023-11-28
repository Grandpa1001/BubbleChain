import { getDatabase, ref, push, set, onValue, remove } from 'firebase/database';
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword }  from 'firebase/auth';
import { initializeApp } from 'firebase/app';



const firebaseConfig = {
    apiKey: "AIzaSyA1cAzOLgoCs0PHDDaSNCeI64Jb7hjxq5M",
    authDomain: "bubblechain4004.firebaseapp.com",
    //databaseURL: "https://andtoday-33de3-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "bubblechain4004",
    storageBucket: "bubblechain4004.appspot.com",
    messagingSenderId: "1011233617012",
    appId: "1:1011233617012:web:ff58475006b97a2d3f4d21"
  };

  const app = initializeApp(firebaseConfig);
    export const auth = getAuth(app);
  
function logOut(){
  signOut(auth).then(() => {
    // Sign-out successful.
    console.log("poprawne wylogowanie");
  }).catch((error) => {
    // An error happened.
  });
}

function createAccount(email, password, errorCallback){
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
      console.log("Zarejestrowano "+user.email)
      errorCallback(null); 
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error.code)
      if (errorCode=== 'auth/invalid-email'){
        errorCallback("Nieprawidłowy adres mail!")
      }if(errorCode=== 'auth/missing-password') {
        errorCallback("Wprowadź hasło!")
      }if(errorCode=== 'auth/email-already-in-use') {
        errorCallback("Email istnieje w bazie. Zaloguj się za jego pomocą!")
      } else {
        errorCallback(errorMessage); 
        console.log(errorCode);
      }
  });
}

function loginAccount(email, password, errorCallback){
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
      console.log("Zalogowano "+user.email)
      errorCallback(null); 
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode=== 'auth/invalid-email'){
        errorCallback("Nieprawidłowy adres mail!")
      }if(errorCode=== 'auth/missing-password') {
        errorCallback("Wprowadź hasło!")
      }if(errorCode=== 'auth/wrong-password') {
        errorCallback("Błędne hasło!")
      } else {
        errorCallback(errorMessage); 
        console.log(errorCode);
      }
      // ..
    });
  }

// Referencja do bazy danych
const database = getDatabase();
const recordsRef = ref(database, 'dziennik'); // Zastąp 'nazwaKolekcji' nazwą właściwej kolekcji w bazie danych

// Metoda do dodawania rekordu do bazy danych    Na TEN MOMENT BRAK FUNCJONALNOSCI
export function addRecordToFirebase(header, description, date) {
  // Pobierz aktualnie zalogowanego użytkownika
  const user = auth.currentUser;
  if (!user) {
    console.error('Użytkownik nie jest zalogowany. Nie można dodać rekordu.');
    return;
  }

  const newRecordRef = push(recordsRef);
  const recordId = newRecordRef.key; // Pobranie unikalnego identyfikatora rekordu

  const newRecord = {
    id: recordId, // Przypisanie unikalnego identyfikatora do obiektu newRecord
    header: header,
    description: description,
    date: date,
    ownerId: user.uid, 
  };

  set(newRecordRef, newRecord)
    .then(() => {
      console.log('Rekord został pomyślnie dodany do bazy danych.');
    })
    .catch((error) => {
      console.error('Wystąpił błąd podczas dodawania rekordu do bazy danych:', error);
    });
}

export function getRecordsFromFirebase(callback) {
  const user = auth.currentUser;
  if (!user) {
    console.error('Użytkownik nie jest zalogowany. Nie można pobrać rekordów.');
    return;
  }
  const recordsRef = ref(database, 'dziennik');
  onValue(recordsRef, (snapshot) => {
    const records = snapshot.val();
    if(records === null){

    }else{
      const userRecords = Object.values(records).filter((record) => record.ownerId === user.uid);
      callback(userRecords);
  }
  }, (error) => {
    console.log('The read failed: ' + error.name);
  });
}

export function deleteRecordFromFirebase(recordId) {
  const database = getDatabase();
  const recordRef = ref(database, `dziennik/${recordId}`);
  remove(recordRef)
    .then(() => {
      console.log('Rekord został pomyślnie usunięty z bazy danych.');
    })
    .catch((error) => {
      console.error('Wystąpił błąd podczas usuwania rekordu z bazy danych:', error);
    });
}


export {createAccount, loginAccount, logOut};