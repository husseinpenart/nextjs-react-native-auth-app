import Image from "next/image";
import Link from "next/link";
import Security from "./components/home/models/Security";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-center text-3xl text-slate-800">
        NextJs ThreeD Authentication
      </h1>
      <Security />
      <Link
        href={"/pages/user"}
        className="p-5 border-2 border-slate-900 rounded-lg font-bold hover:shadow-lg  hover:delay-200 hover:transition-all"
      >
        Register/Login
      </Link>
    </main>
  );
}
