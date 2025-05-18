import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { toast } from "react-toastify";
import { sendPasswordResetEmail } from "firebase/auth/cordova";


export const AuthContext = createContext(null);

const Authprovider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser), setLoading(false);

    });
    return () => unsubscribe();
  }, []);

// connexion
const Signup = async (email, password, firstName) => {
  try {
    // Créer l'utilisateur
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // Mise à jour du profil avec displayName
    await updateProfile(userCredential.user, {
      displayName: firstName, // Met à jour le displayName avec le prénom
    });

    return userCredential.user;
  } catch (error) {
    console.error("Erreur d'inscription :", error.message);
  }
};
// deconnexion
const Logout= async() =>{
    setLoading(true);
    try {
        await signOut(auth);
      toast.success("deconnexion reussie");
    } catch (error) {
      const { code } = error;
      if(code){
      toast.error("echec de deconnexion ");
      }
    }finally {
        setLoading(false);
      }
}
//   inscription
const Login =  (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // resetpassword
  const Resetpassword = (email)=>{
    return sendPasswordResetEmail(auth, email)
  }

  const id = {
    user,
    loading,
    Signup,
    Login,
    Logout,
    Resetpassword
  };
  return <AuthContext.Provider value={id}>{children}</AuthContext.Provider>;
};

export default Authprovider
