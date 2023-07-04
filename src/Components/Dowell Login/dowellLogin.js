import axios from "axios";
import { useStateValue } from "./../../Context/StateProvider";
import React from "react";

const dowellLoginUrl =
  "https://100014.pythonanywhere.com/?redirect_url=" +
  window.location.origin +
  "/100045-SecureRepository";

const getUserInfoOther = async (session_id, dispatch) => {
  const session = {
    session_id: session_id,
  };
  const res = await axios({
    method: "post",
    url: "https://100093.pythonanywhere.com/api/userinfo/",
    data: session,
  });
  sessionStorage.setItem("userInfo", JSON.stringify(res.data));
   dispatch({
     type: "SET_USER",
     user: res.data,
   }); // Update user info in context
};

const getUserInfo = async (session_id, dispatch) => {
  const session = {
    session_id: session_id,
  };

  const res = await axios({
    method: "post",
    url: "https://100014.pythonanywhere.com/api/userinfo/",
    data: session,
  });
  sessionStorage.setItem("userInfo", JSON.stringify(res.data));
   dispatch({
     type: "SET_USER",
     user: res.data,
   }); // Update user info in context
};

export default function useDowellLogin() {
  const [state, dispatch] = useStateValue();

  const queryParams = new URLSearchParams(window.location.search);
  const searchParams = queryParams.get("session_id");
  const searchParams2 = queryParams.get("id");

  const localSession = sessionStorage.getItem("session_id")
    ? sessionStorage.getItem("session_id")
    : null;
  const localId = sessionStorage.getItem("id")
    ? sessionStorage.getItem("id")
    : null;

  React.useEffect(() => {
    const session_id = searchParams;
    const id = searchParams2;

    if (session_id) {
      sessionStorage.setItem("session_id", session_id);
      if (id || localId) {
        sessionStorage.setItem("id", id);
        getUserInfoOther(session_id, dispatch);
      } else {
        getUserInfo(session_id, dispatch);
      }
    }
    if (!localSession && !session_id) {
      window.location.replace(dowellLoginUrl);
    }
  }, []);
}
