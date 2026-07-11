import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SessionTimeout = () => {

  const navigate = useNavigate();

  useEffect(() => {

    let timer;

    const resetTimer = () => {

      clearTimeout(timer);

      timer = setTimeout(() => {

        localStorage.clear();

        alert("Session expired. Please login again.");

        navigate("/");

      }, 30 * 60 * 1000);

    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);
    window.addEventListener("click", resetTimer);

    resetTimer();

    return () => {

      clearTimeout(timer);

      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
      window.removeEventListener("click", resetTimer);

    };

  }, [navigate]);

  return null;
};

export default SessionTimeout;