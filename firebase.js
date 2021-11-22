
import * as firebase from "firebase/compat";
import fb, { initializeApp } from "firebase/app";

import { getStorage, ref, uploadBytes, updateMetadata, getDownloadURL } from "firebase/storage";
import {
    getFirestore,
    setDoc,
    doc,
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc
  } from "firebase/firestore";
import { FaLink } from "react-icons/fa";


const firebaseConfig = {
    apiKey: "AIzaSyCA9FNCN9kHGS9fUTCah67d_zdukeS40Cc",
    authDomain: "mobile64-lecture13-835e2.firebaseapp.com",
    projectId: "mobile64-lecture13-835e2",
    storageBucket: "mobile64-lecture13-835e2.appspot.com",
    messagingSenderId: "718341432032",
    appId: "1:718341432032:web:02e38819f466b236c1e685",
    measurementId: "G-R6DNP3CB47"
  };

firebase.initializeApp(firebaseConfig);


export default firebase;

const storage = getStorage();

const firestore = getFirestore();

export const db = getFirestore();


export async function addUser(email, password, username) {
  try {
    if (email == "" && password == "" && username === "") {
      console.log("no data");
    } else {
      const docRef = await addDoc(collection(firestore, "signup"), {
        email,
        password,
        username
      });
      console.log("Document written with ID: ", docRef.id);
    }
  } catch (err) {
    console.log("Error addStudents ", err);
  }
}

export async function getStudents(email, password) {
    let found = false;
    const querySnapshot = await getDocs(collection(firestore, "signup"));
    await querySnapshot.forEach((doc) => {
      // console.log(doc._document.data.value.mapValue.fields.email.stringValue);
      // console.log(doc._document.data.value.mapValue.fields.password.stringValue);
      if(email === doc._document.data.value.mapValue.fields.email.stringValue && password === doc._document.data.value.mapValue.fields.password.stringValue){
          found = false
          console.log("Success login")
      }
    }
    );
    if(found){
      return true
    }else{
      return false
    }
    // console.log(dataList)
  }

  export async function addQA(main, text) {
    try {
      if (!main && !text) {
        console.log("no data");
      } else {
        const docRef = await addDoc(collection(firestore, "Q&A"), {
          main,
          text,
        });
        console.log("Document written with ID: ", docRef.id);
      }
    } catch (err) {
      console.log("Error addStudents ", err);
    }
  }

  async function createFileStorage(data){
    try{
      await addDoc(collection(firestore, "pdfStorage"), {
        subject: data.subject || "no",
        description: data.description || "no",
        locationFile: data.locationFile || "no"
      })
    }
    catch(err){
      console.log(err)
    }

  }

  // export async function updateComment(uid, studentID, name, gpa) {
  //   try {
  //     const docRef = doc(db, "students", uid);
  //     // Set the "capital" field of the city 'DC'
  //     await updateDoc(docRef, {
  //       studentID,
  //       name,
  //       gpa
  //     });
  //     console.log('update success')
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

export async function addfile(blob, title) {
  const getUniqueName = `${new Date().getTime()}.pdf`
  const storageRef = ref(storage, getUniqueName);
  const data = {
    subject: title.subject,
    description: title.description,
    locationFile: getUniqueName
  }
  try {
    uploadBytes(storageRef, blob).then(() => {
      createFileStorage(data)
    });
    } catch (err) {
      console.log("Error add PDF ", err);
    }
    // const forestRef = ref(storage, file.name);

// Create file metadata to update
  // const newMetadata = {
  //   cacheControl: 'public,max-age=300',
  //   contentType: 'files/pdf'
  // };

// Update metadata properties
// updateMetadata(forestRef, newMetadata)
//   .then((metadata) => {
//     console.log(metadata)
//     // Updated metadata for 'images/forest.jpg' is returned in the Promise
//   }).catch((error) => {
//     console.log(error)
//     // Uh-oh, an error occurred!
//   });
  }

export function readPDF(pdfName){

  getDownloadURL(ref(storage, pdfName))
  return new Promise((resolve, reject) => {
    getDownloadURL(ref(storage, pdfName))
    .then((url) => {
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = (event) => {
        const blob = xhr.response;
      };
      xhr.open('GET', url);
      xhr.send();      
      // Or inserted into an <img> element
      resolve(url)
    })
    .catch(() => {
      reject(false)
    });
  })
  }
