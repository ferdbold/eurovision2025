import {useSearchParams} from "next/navigation";
import {Button} from "@/app/ui/button";

interface ILoginProps {
	onSubmit: (formData: FormData) => void;
}

export default function Login(props: ILoginProps) {
	const searchParams = useSearchParams();

	return (
		<div className="flex flex-col h-screen items-center justify-center gap-4">
			{searchParams.has('error') && <div className="px-4 py-2 rounded bg-red-900 border border-red-500">{searchParams.get('error')}</div>}
			<div className="rounded-lg border border-white/25 p-4">
				<form action={props.onSubmit}>
					<div className="flex flex-col items-center py-2">
						<label htmlFor="password">Mot de passe</label>
						<input className="font-bold text-4xl text-center uppercase" type="password" id="password" name="password" size={4} maxLength={4} placeholder={"XXXX"} />
					</div>
					<Button type="submit">Soumettre</Button>
				</form>
			</div>
		</div>
	)
}
