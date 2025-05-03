'use client'

import {useSearchParams} from "next/navigation";
import {Suspense} from "react";
import {Button} from "@/app/ui/button";
import {signup} from "@/app/lib/auth";
import Logo from "@/app/ui/logo";

export default function Home() {
  return (
    <Suspense>
      <div className="w-full h-screen bg-radial-[at_50%_100%] from-purple-800 from-5% to-rose-700">
        <Login />
      </div>
    </Suspense>
  );
}

let Login = function() {
  const searchParams = useSearchParams();

  return <div className="flex flex-col h-full items-center justify-center gap-4">
    <Logo/>
    {searchParams.has('error') && <div className="px-4 py-2 rounded bg-red-900 border border-red-500">{searchParams.get('error')}</div>}
    <div className="rounded-lg border border-white/25 p-4 mx-4">
      <form action={signup} className="flex flex-col gap-2">
        <div className="flex flex-col items-center py-2">
          <label className="font-bold text-center text-xl" htmlFor="code">Entrez le code d'accès que vous avez reçu à l'entrée: </label>
          <input className="font-bold text-4xl text-center uppercase" type="text" id="code" name="code" placeholder="XXXX" size={8} maxLength={4} />
        </div>

        <Button type="submit">Showtime!</Button>
      </form>
    </div>
  </div>;
}
