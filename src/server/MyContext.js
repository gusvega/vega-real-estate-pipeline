// import { createContext, useState, useContext, useEffect } from 'react';
// import { db } from './firebase';
// import {
//    getFirestore,
//    collection,
//    addDoc,
//    setDoc,
//    getDoc,
//    doc,
// } from "firebase/firestore";
// import jwt from "jsonwebtoken";
// import Cookies from "js-cookie";

// const MyContext = createContext();

// const MyContextProvider = ({ children }) => {

//    let decodedToken = ''

//    const userCookie = Cookies.get("gusvega_cookie");
//    if (userCookie) {
//       const token = userCookie;
//       decodedToken = jwt.decode(token);
//       // router.push("/home");
//    } else {
//       console.log("Cookie not found");
//    }

//    const usersCollectionRef = collection(db, "users");
//    // const documentRef = doc(usersCollectionRef, decodedToken.user_id);
//    const documentRef = doc(usersCollectionRef, 'IqK239IW3VYxSRJMD2G0LTvTgQF2');


//    const [data, setData] = useState();

//    useEffect(() => {

//       getDoc(documentRef)
//       .then((docSnapshot) => {
//          if (docSnapshot.exists()) {
//             const firebaseData = docSnapshot.data();
//             console.log("Document data:", firebaseData);

//             setData(firebaseData)
//             console.log('Data', data)
//          } else {
//             console.log("No such document!");
//             setData(null);
//          }
//       })
//       .catch((error) => {
//          console.error("Error getting document:", error);
//          setData(null);
//       })


      

//    }, []);

//    const updateData = (newData) => {
//       setData(newData);
//    };

//    useEffect(() => {

//    }, []);

//    return (
//       <MyContext.Provider value={{ data, updateData }}>
//          {children}
//       </MyContext.Provider>
//    );
// };

// const useMyContext = () => useContext(MyContext);

// export { MyContextProvider, useMyContext };