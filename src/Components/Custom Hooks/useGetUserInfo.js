import { useState, useEffect } from "react";
import axios from "axios";

const useGetUserInfo = () => {
  const [data, setData] = useState(
    JSON.parse(sessionStorage.getItem("userInfo"))
  );
  const queryParams = new URLSearchParams(window.location.search);
  const [sessionId, setSessionId] = useState(queryParams.get("session_id"));
  const [id] = useState(queryParams.get("id"));

  const getUserInfoOther = async (session_id) => {
    const session = {
      session_id: sessionId,
    };

    const res = await axios({
      method: "post",
      url: "https://100093.pythonanywhere.com/api/userinfo/",
      data: session,
    });

    setData(res.data);
  };

  const getUserInfo = async (session_id) => {
    const session = {
      session_id: sessionId,
    };
    const res = await axios({
      method: "post",
      url: "https://100014.pythonanywhere.com/api/userinfo/",
      data: session,
    });

    setData(res.data);
  };

  useEffect(() => {
    getUserInfo();
  }, [sessionId]);

  useEffect(() => {
    getUserInfoOther();
  }, [id]);

  return data;
};

export default useGetUserInfo;
