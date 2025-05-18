import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Button from "../components/button";
import { AuthContext } from "../context/AuthContext";

export default function Signup() {
  const { user, Login } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);

  const onSubmit = async (data) => {
    if (loading) return;
    setLoading(true);

    try {
      await Login(data.email, data.password);
      setLoading(false);
      toast.success("connexion réussie !");
    } catch (error) {
      const { code } = error;
      if (code == "auth/user-not-found") {
        toast.error("cet email est introuvable");
      } else if (code === "auth/wrong-password") {
        toast.error("Mot de passe incorrect");
      } else if (code == "auth/email-already-in-use") {
        toast.error("Cet email est déjà utilisé");
      } else if (code == "auth/invalid-email") {
        toast.error("L'email est invalide.");
      } else {
        console.log(error);
        toast.error("echec de connexion");
        setLoading(false);
      }
      reset();
    }
  };
  return (
    <>
      <div className="flex lg:flex-row flex-col lg:gap-0 gap-10 min-h-screen items-center lg:justify-normal justify-center p-10 max-w-6xl mx-auto">
        <div className="lg:w-5/12 w-full lg:block flex flex-col">
          <h1 className="text-3xl mt-3 lg:text-left text-center text-white">
            Organisez votre journée,
            <hr className="bordure : border-0" /> une tâche à la fois.
            Connectez-vous pour créer,
          </h1>
        </div>
        <div className="lg:w-7/12 w-full flex lg:justify-end">
          <div className="elements lg:w-[400px] w-full">
            {/* Login */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="email"
                placeholder="Adresse e-mail"
                className="input"
                {...register("email", {
                  required: "Email requis",
                  message: "adresse mail non valide!",
                })}
              />
              {errors.email && (
                <p className="text-red-500 mb-5">{errors.email.message}</p>
              )}
              <input
                type="password"
                placeholder="Mot de passe"
                className="input"
                {...register("password", {
                  required: "password requis",
                  minLength: { value: 8, message: "minimun 8 caracteres" },
                })}
              />
              {errors.password && (
                <p className="text-red-500 mb-5">{errors.password.message}</p>
              )}
              <Button large onClick={() => handleSubmit()}>
                Se connecter
              </Button>
            </form>

            {/* Pass */}
            <div className="flex justify-center mt-5">
              <div className="text-blue-facebook hover:text-blue-500 duration-150 cursor-pointer">
                <Link to="/Resetpassword">Mot de passe oublié ?</Link>
              </div>
            </div>

            {/* Separator */}
            <hr className="my-5" />

            {/* Sign */}
            <div className="flex justify-center">
              <Link to="/signup">
                <Button green>Créer un nouveau compte</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
