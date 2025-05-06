interface ICodePrintProps {
	code: string
}

export default function CodePrint(props: ICodePrintProps) {
	return (
		<div className="border-4 p-2 text-center">
			<p>Allez voter pour votre pays préféré sur <strong className="text-xl">eurovisiondrag.ca</strong></p>
			<img src={"qr.png"} alt="eurovisiondrag.ca" />
			<div>Votre code:</div>
			<div className="text-4xl font-bold">{props.code}</div>
		</div>
	);
}
