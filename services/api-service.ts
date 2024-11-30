import { getToken } from "@/actions/actions";

const apiService = {
  get: async function (url?: string): Promise<any> {
    const baseUrl = process.env.NEXT_PUBLIC_DJANGO_BASE_URL || "";
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

  post: async function (data: any, url?: string, base?: boolean): Promise<any> {
    const token = await getToken();

    const baseUrl = base
      ? process.env.NEXT_PUBLIC_DJANGO_BASE_URL || ""
      : process.env.NEXT_PUBLIC_API_HOST || "";
    const path = url ? `${baseUrl}${url}` : baseUrl;

    console.log("post", path, data);

    return new Promise((resolve, reject) => {
      fetch(path, {
        method: "POST",
        body: data,
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

export default apiService;
