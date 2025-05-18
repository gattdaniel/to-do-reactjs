import { useForm } from "react-hook-form";
import Button from "../components/button";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const { user, Signup } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);

  const handlerclick = async (data) => {
    console.log(data);
    if (loading) return;
    setLoading(true);

    try {
      await Signup(data.email, data.password, data.firstName);
      setLoading(false);
      toast.success("inscription reussi!");
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
        toast.error("echec de connexion");
        setLoading(false);
      }
    }
    reset();
  };
  return (
    <>
      <div className="flex lg:flex-row flex-col lg:gap-0 gap-10 min-h-screen items-center lg:justify-normal justify-center p-10 max-w-6xl mx-auto">
        <div className="elements lg:w-[400px] w-full text-white">
          <div className="text-center  text-2xl  mb-5">
            Transformez vos idées en actions. <hr />
            Gardez le contrôle de votre temps et atteignez vos objectifs plus
            facilement.
          </div>
        </div>
        <div className="lg:w-7/12 w-full flex lg:justify-end">
          <div className="elements lg:w-[400px] w-full">
            {/* Login */}
            <form onSubmit={handleSubmit(handlerclick)}>
              <input
                type="email"
                placeholder="Adresse e-mail"
                className="input"
                {...register("email", {
                  required: true,
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
                  required: true,
                  minLength: { value: 8, message: "minimun 8 caracteres" },
                })}
              />
              {errors.password && (
                <p className="text-red-500 mb-5">{errors.password.message}</p>
              )}
              <input
                type="text"
                placeholder="pseudo"
                className="input"
                {...register("firstName", {
                  required: "champ obligatoire",
                })}
              />
              <Button large disabled={loading}>
                S'inscrire
              </Button>
            </form>

            {/* Pass */}
            <div className="flex justify-center mt-5">
              <div className="text-blue-facebook hover:text-blue-500 duration-150 cursor-pointer">
                <Link to="/">deja un compte ?</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
