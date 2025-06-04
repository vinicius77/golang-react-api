import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "@/contexts/auth-context";

const useNavigateUser = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const user = authContext?.state?.user;

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);
};

export default useNavigateUser;
