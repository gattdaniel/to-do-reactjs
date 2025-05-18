import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Button from "../components/button";

export default function Resetpassword(){
     const { Resetpassword } = useContext(AuthContext);
      const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();
      const [loading, setLoading]= useState(false)

const Onsubmit=async(data)=>{
if(loading)return
setLoading(true)
try{
    await Resetpassword(data.email)
    toast.success("Email de réinitialisation envoyé !")
}catch(error){
    console.error(error);
    toast.error("erreur lors de loading'envois de l'email")
}
reset()
}
    return(
        <>
        <div className="flex lg:flex-row flex-col lg:gap-0 gap-10 min-h-screen items-center lg:justify-normal justify-center p-10 max-w-6xl mx-auto">
                <div className="lg:w-5/12 w-full lg:block flex flex-col">
                  <h1 className="text-3xl mt-3 lg:text-left text-center">
                    entrez votre adresse email afin de reinitialiser votre password!!
                  </h1>
                </div>
                <div className="lg:w-7/12 w-full flex lg:justify-end">
                  <div className="element lg:w-[400px] w-full">
                    {/* Login */}
                    <form onSubmit={handleSubmit(Onsubmit)}>
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
                      <Button large onClick={() => handleSubmit()}>
                        Se connecter
                      </Button>
                    </form>
                    </div>
        </div>
      </div>
        </>
    )
}