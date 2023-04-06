import React, { useState } from "react";
import axios from "axios";

const useGetResponse = () => {
  const data = JSON.parse(sessionStorage.getItem("userInfo"));
  const [status, setStatus] = useState(null);
  const [webHookLink, setWebHookLink] = useState(null);
  async function getResponse(repoName, repoUrl) {
    console.log(repoName, repoUrl);
    const requestHeaders = {
      repository_name: repoName,
      repository_url: repoUrl,
      org_name: data.portfolio_info.org_name,
      company_id: data.portfolio_info.org_id,
      data_type: data.portfolio_info.data_type,
      created_by: data.userinfo.username,
    };

    const res = await axios({
      method: "post",
      url: "http://100045.pythonanywhere.com/backup/repositoryClone/",
      data: requestHeaders,
    });
    setStatus(res.data.status);
    setWebHookLink(res.data.webhook_link);
  }

  return [getResponse, status, webHookLink];
};

export default useGetResponse;
