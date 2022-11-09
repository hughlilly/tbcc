import { Link, useLoaderData } from "@remix-run/react";
import { checkStatus, checkEnvVars } from "~/utils/errorHandling";

export async function loader () {
  checkEnvVars();

  const res = await fetch(`${process.env.STRAPI_URL_BASE}/api/tournaments?populate=*`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${process.env.STRAPI_API_TOKEN}`,
      "Content-Type": "application/json"
    }
  });

  // Handle HTTP response code < 200 or >= 300
  checkStatus(res);

  const data = await res.json();

  // Did Strapi return an error object in its response?
  if (data.error) {
    console.log('Error', data.error)
    throw new Response("Error getting data from Strapi", { status: 500 })
  }

  return data.data;
}

export default function Tournaments() {
  const tournaments = useLoaderData();

  return (
    <ul>
      {tournaments.map((tournament: any) => (
        <li key={tournament.id}>
              <Link to={tournament.attributes.slug}>{tournament.attributes.title}</Link>
          <span className="italic"> ({tournament.attributes.location.data.attributes.name}, {tournament.attributes.location.data.attributes.address})</span>
          <div className="small">{tournament.attributes.desc}</div>
        </li>
      ))}
    </ul>
  );
}
