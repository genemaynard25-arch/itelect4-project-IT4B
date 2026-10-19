import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import { registerUser, loginUser } from "../api/client";
import useAuthStore from "../store/authStore";
import { registerSchema, type RegisterFormValues } from "../schemas/authSchema";

function RegisterPage() {
  const navigate = useNavigate();
  const setSession = useAuthStore((s) => s.setSession);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({ resolver: zodResolver(registerSchema) });

  const signUp = useMutation({
    // Two requests, in order. /api/auth/register creates the user and
    // answers with it, but it issues no token -- login is the only
    // route in that API that signs one. Without the second call you
    // would land on the login page to type the same password again.
    mutationFn: async (values: RegisterFormValues) => {
      await registerUser(values);
      return loginUser({ email: values.email, password: values.password });
    },
    onSuccess: (reply) => {
      setSession(reply.token, reply.user.name);
      navigate("/submissions");
    },
  });

  return (
    <form onSubmit={handleSubmit((values) => signUp.mutate(values))}>
      <h1>Register</h1>

      <input placeholder="Name" {...register("name")} />
      {errors.name && <p>{errors.name.message}</p>}

      <input placeholder="Email" {...register("email")} />
      {errors.email && <p>{errors.email.message}</p>}

      <input type="password" placeholder="Password" {...register("password")} />
      {errors.password && <p>{errors.password.message}</p>}

      {signUp.isError && <p>{signUp.error.message}</p>}

      <button type="submit" disabled={signUp.isPending}>
        {signUp.isPending ? "Creating account..." : "Register"}
      </button>

      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </form>
  );
}

export default RegisterPage;