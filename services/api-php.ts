import { getToken } from "@/actions/actions";

const apiPHP = {
  get: async function (url?: string, base?: boolean): Promise<any> {
    const baseUrl = base
      ? process.env.NEXT_PUBLIC_DJANGO_BASE_URL || ""
      : process.env.NEXT_PUBLIC_API_HOST || "";
    console.log("get", url);

    return new Promise((resolve, reject) => {
      fetch(`${baseUrl}${url}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log("Response: ", json);

          resolve(json);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  post: async function (data: any): Promise<any> {
    const token = await getToken();

    const baseUrl = process.env.NEXT_PUBLIC_API_HOST || "";
    const path = baseUrl ? `${baseUrl}?gettoken=${token}` : baseUrl;
    console.log(token);
    console.log("post", path, data);

    return new Promise((resolve, reject) => {
      fetch(path, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log("response: ", json);

          resolve(json);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

export default apiPHP;
