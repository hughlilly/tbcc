import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <main className="m-auto">
      <Link to="/tournaments" className=" hover:underline ">
        🏸 Tournaments
      </Link>
    </main>
  );
}
