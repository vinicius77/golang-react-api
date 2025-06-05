import { signOut, getAuth } from "firebase/auth";

type VoidPromise = Promise<void>;

interface LogoutReturn {
  logout: () => VoidPromise;
}

const useLogout = (): LogoutReturn => {
  const auth = getAuth();

  const logout = async (): VoidPromise => {
    try {
      await signOut(auth);
      console.info("LOGGED OUT");
    } catch (_error) {
      throw new Error("Could not log out");
    }
  };

  return { logout };
};

export default useLogout;
