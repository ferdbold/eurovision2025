interface ILogoProps {
	className?: string;
}

export default function Logo(props: ILogoProps) {
	return <div className={props.className}>
		<h1 className="font-fancy text-4xl text-center leading-none">En attendant</h1>
		<div className="flex items-center gap-2">
			<h1 className="font-fancy text-4xl text-center">l'</h1>
			<img src={"eurovision-logo.png"} alt="Logo Eurovision" className="size-72 h-auto mx-auto -my-8"/>
		</div>
	</div>;
}
