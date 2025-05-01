'use client'

import {showPerformance, showScoreboard} from "@/app/lib/actions";
import {useState} from "react";
import {loginAdmin} from "@/app/lib/auth";
import Login from "@/app/admin/adminLogin";

export default function AdminView() {
	const [auth, setAuth] = useState<boolean>(false);

	async function login(formData: FormData)
	{
		let valid = await loginAdmin(formData);
		setAuth(valid);
	}

	if (!auth)
		return <Login onSubmit={login}></Login>

	return (
		<div className="w-full h-screen flex flex-col items-center justify-center">
			<h1>Vue admin</h1>
			<button onClick={showScoreboard}>Show scoreboard</button>
			<button onClick={() => showPerformance(1)}>Show performance #1</button>
		</div>
	);
}
