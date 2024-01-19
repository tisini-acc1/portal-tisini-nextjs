import getSession from "./teams";

const BASE_URL = process.env.NEXT_PUBLIC_DJANGO_BASE_URL;

export const getAllStaffs = async (id: string) => {
  const session = await getSession();
  const url = BASE_URL + `/users/teams/${id}/staffs/`;

  const res = await fetch(url, {
    method: "GET",
    headers: { Authorization: `JWT ${session?.accessToken}` },
  });

  if (!res.ok) throw new Error("Failed to fetch staffs data");

  return res.json();
};
