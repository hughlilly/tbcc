import { useLoaderData, Link } from "@remix-run/react";
import { checkStatus, checkEnvVars } from "~/utils/errorHandling";
import { siteTitle } from "~/root";

export function meta({ data }: any): { title: string } {
  return {
    title: `${data.attributes.title} | Tournaments | ${siteTitle}`,
  };
}

export async function loader({ params }: any) {
  checkEnvVars();

  const res = await fetch(
    `${process.env.STRAPI_URL_BASE}/api/tournaments` +
      `?populate=*&filters[slug]=${params.tournamentId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  // Handle HTTP response code < 200 or >= 300
  checkStatus(res);

  const data = await res.json();

  // Did Strapi return an error object in its response?
  if (data.error) {
    console.log("Error", data.error);
    throw new Response("Error getting data from Strapi", { status: 500 });
  }

  // Did Strapi return an empty list?
  if (!data.data || data.data.length === 0) {
    throw new Response("Not Found", { status: 404 });
  }

  const tournament = data.data[0];

  // For a tournament with no photos, replace API returned null with an empty array
  tournament.attributes.photos.data = tournament.attributes.photos.data ?? [];

  // Handle image URL being returned as just a path with no scheme and host.
  // When storing media on the filesystem (Strapi's default), media URLs are
  // returned as only a URL path. When storing media using Cloudinary, as we do
  // in production, media URLs are returned as full URLs.
  for (const photo of tournament.attributes.photos.data) {
    if (!photo.attributes.formats.thumbnail.url.startsWith("http")) {
      photo.attributes.formats.thumbnail.url =
        process.env.STRAPI_URL_BASE + photo.attributes.formats.thumbnail.url;
    }
  }
  return tournament;
}

export default function TournamentsRoute() {
  const tournament = useLoaderData();

  return (
    <div>
      <Link to="/tournaments">← back to list</Link>
      <hgroup>
        <h2>{tournament.attributes.title}</h2>
        <h3>at {tournament.attributes.startTime}</h3>
      </hgroup>

      <p>{tournament.attributes.desc}</p>
      <div className="grid">
        {tournament.attributes.photos.data.map((photo: any) => (
          <div key={photo.attributes.hash}>
            <img
              src={photo.attributes.formats.thumbnail.url}
              alt={tournament.attributes.title + " photo"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
