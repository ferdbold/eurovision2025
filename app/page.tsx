import {Button} from "@/app/ui/button";
import {signup} from "@/app/lib/auth";

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <Login />
    </div>
  );
}

let Login = function() {
  return (
    <div className="rounded-lg border border-white/25 p-4">
      <form action={signup} className="flex flex-col gap-2">
        <div>
          <label htmlFor="name">Votre nom: </label>
          <input type="text" id="name" name="name" placeholder="Conchita Wurst" />
        </div>

        <Button type="submit">Commencer</Button>
      </form>
    </div>
  )
}
