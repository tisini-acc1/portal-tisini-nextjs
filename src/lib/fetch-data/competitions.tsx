import getSession from "./teams";

const BASE_URL = process.env.NEXT_PUBLIC_DJANGO_BASE_URL;

export const getAllComps = async () => {
  const session = await getSession();
  const url = BASE_URL + "/users/competitions/";

  const res = await fetch(url, {
    method: "GET",
    headers: { Authorization: `JWT ${session?.access_token}` },
  });

  if (!res.ok) throw new Error("Failed to fetch competitions data");

  return res.json();
};

export const getComp = async (compId: string) => {
  const session = await getSession();
  const url = BASE_URL + `/users/competitions/${compId}/`;

  const res = await fetch(url, {
    method: "GET",
    headers: { Authorization: `JWT ${session?.access_token}` },
  });

  if (!res.ok) throw new Error("Failed to fetch competition");

  return res.json();
};
