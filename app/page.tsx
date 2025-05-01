'use client'

import {useSearchParams} from "next/navigation";
import {Suspense} from "react";
import {Button} from "@/app/ui/button";
import {signup} from "@/app/lib/auth";

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
    <header>
      <h1 className="font-fancy text-4xl text-center leading-none">En attendant</h1>
      <div className="flex items-center gap-2">
        <h1 className="font-fancy text-4xl text-center">l'</h1>
        <img src={"eurovision-logo.png"} alt="Logo Eurovision" className="size-96 h-auto mx-auto -my-10" />
      </div>
    </header>
    {searchParams.has('error') && <div className="px-4 py-2 rounded bg-red-900 border border-red-500">{searchParams.get('error')}</div>}
    <div className="rounded-lg border border-white/25 p-4">
      <form action={signup} className="flex flex-col gap-2">
        <div className="flex flex-col items-center py-2">
          <label htmlFor="code">Entrez le code d'accès que vous avez reçu à l'entrée: </label>
          <input className="font-bold text-4xl text-center uppercase" type="text" id="code" name="code" placeholder="XXXX" size={4} maxLength={4} />
        </div>

        <Button type="submit">Commencer</Button>
      </form>
    </div>
  </div>;
}
