'use client'

import {JSX, Suspense, useEffect, useState} from "react";
import {loginAdmin} from "@/app/lib/auth";
import Login from "@/app/admin/adminLogin";
import CodePrint from "@/app/print/codePrint";
import {getCodes} from "@/app/lib/actions";

export default function TelevisionView() {
	const [auth, setAuth] = useState<boolean>(false);
	const [codes, setCodes] = useState<string[]>([]);

	async function login(formData: FormData)
	{
		let valid = await loginAdmin(formData);
		setAuth(valid);
	}

	useEffect(() => {
		if (!auth)
			return;

		getCodes().then(resp => {
			setCodes(resp);
		});
	}, [auth]);

	if (!auth)
		return (
			<Suspense>
				<Login onSubmit={login}></Login>
			</Suspense>
		);

	return <CodePrintGrid codes={codes} />;
}

interface ICodePrintGrid {
	codes: string[]
}

function CodePrintGrid(props: ICodePrintGrid) {
	return (
		<div className="w-[8.5in] bg-white text-black">
			<div className="w-full grid grid-cols-4 border-collapse">
				{props.codes.map(code =>
					<CodePrint key={code} code={code} />
				)}
			</div>
		</div>
	)
}
