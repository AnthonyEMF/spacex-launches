import { type SpaceXAPIResponse, type Doc } from "../types/launches-response";
import { API_URL } from "../api/spacex-api";

// Endpoint para obtener los últimos lanzamientos
export const getLatestLaunches = async () => {
  const res = await fetch(`${API_URL}/launches/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: {},
      options: {
        sort: {
          date_unix: "asc",
        },
        limit: 12,
      },
    }),
  });

  const { docs: launches } = await res.json() as SpaceXAPIResponse;
  return launches;
};

// Endpoint para obtener un lanzamiento
export const getLaunchById = async ({ id }: { id: string }) => {
  const res = await fetch(`${API_URL}/launches/${id}`);

  const launch = await res.json() as Doc;
  return launch;
};
