'use client';

import {Button} from "@/app/ui/button";
import {signup} from "@/app/lib/auth";
import {useSearchParams} from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();

  return (
    <div className="w-full p-4 h-screen flex flex-col items-center justify-center gap-4">
      {searchParams.has('error') && <div className="w-full px-4 py-2 rounded bg-red-900 border border-red-500">{searchParams.get('error')}</div>}
      <Login />
    </div>
  );
}

let Login = function() {
  return (
    <div className="rounded-lg border border-white/25 p-4">
      <form action={signup} className="flex flex-col gap-2">
        <div>
          <label htmlFor="code">Votre code d'accès: </label>
          <input type="text" id="code" name="code" placeholder="XXXX" />
        </div>

        <Button type="submit">Commencer</Button>
      </form>
    </div>
  )
}
