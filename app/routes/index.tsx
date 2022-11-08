import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <main className=" p-20 ">
      <Link to="/tournaments" className=" hover:underline ">🏸 Tournaments</Link>
    </main>
  );
}
