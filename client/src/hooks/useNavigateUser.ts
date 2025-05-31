import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "@/contexts/AuthContext";

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
