import { useState, SyntheticEvent } from "react";
import { useContext } from "react";

import { auth } from "@/utils/firebase";
import {
  signInWithEmailAndPassword as _,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";
import useLogout from "@/hooks/useLogout";
import { AuthContext } from "@/contexts/AuthContext";

type Fields = {
  email: string;
  password: string;
};

const initialState = {
  email: "",
  password: "",
} as Fields;

const SignUpWithEmail: React.FC = () => {
  const { logout } = useLogout();
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthContextProvider");
  }
  const { dispatch } = authContext;

  const [fields, setFields] = useState<Fields>(initialState);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setFields((prevFields) => ({ ...prevFields, [name]: value }));
  };

  const onSubmitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();

    const { email, password } = fields;

    if (!email || !password) {
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (!result) {
        throw new Error("Could not complete signup");
      }

      const user = result.user;
      dispatch({ type: "LOGIN", payload: user });

      setFields(initialState);
    } catch (error) {
      throw new Error("Could not complete signup");
    }
  };

  const onGoogleLoginHandler = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const idToken = await result.user.getIdToken();

    await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // important to include cookies
      body: JSON.stringify({ idToken }),
    });
  };

  const onGitHubLoginHandler = () => {
    const provider = new GithubAuthProvider();
    signInWithPopup(auth, provider)
      .then((res) => {
        const { user = {} } = res;
        console.log({ user, res });
      })
      .catch((error) => console.error({ error }));
  };

  const onLogout = async () => {
    await logout();

    await fetch("http://localhost:4000/api/logout", {
      method: "POST",
      credentials: "include", // Include cookie for backend to clear it
    });

    dispatch({ type: "LOGOUT", payload: null });

    // TODO: navigate("/login"); // or reset your app state
  };

  return (
    <section className="login-form">
      <h3>Log into your account</h3>
      <form className="form">
        <div className="form-controls">
          <label htmlFor="email">Email</label>
          <input
            value={fields.email}
            type="email"
            name="email"
            onChange={onChangeHandler}
          />
        </div>
        <div className="form-controls">
          <label htmlFor="password">Password</label>
          <input
            value={fields.password}
            type="password"
            name="password"
            onChange={onChangeHandler}
          />
        </div>

        <div>
          <button onClick={onSubmitHandler}>Login</button>
        </div>
      </form>

      <button type="button" onClick={onGoogleLoginHandler}>
        Login With Google
      </button>

      <button type="button" onClick={onGitHubLoginHandler}>
        Login With Github
      </button>

      <button className="btn" onClick={onLogout}>
        Log Out
      </button>
    </section>
  );
};

export default SignUpWithEmail;
