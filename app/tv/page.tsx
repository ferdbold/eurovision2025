'use client'

import {useEffect, useState} from "react";
import Pusher from 'pusher-js';
import {loginAdmin} from "@/app/lib/auth";
import Login from "@/app/admin/adminLogin";

export default function TelevisionView() {
	const [message, setMessage] = useState<string>('');
	const [auth, setAuth] = useState<boolean>(false);

	async function login(formData: FormData)
	{
		let valid = await loginAdmin(formData);
		setAuth(valid);
	}

	useEffect(() => {
		if (!auth)
			return;

		let pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
			cluster: 'us2'
		});

		let channel = pusher.subscribe('tv');
		channel.bind('show-scoreboard', () => {
			setMessage('scoreboard');
		});

		channel.bind('show-performance', (data: any) => {
			setMessage(`performance ${data.id}`);
		});
	}, [auth]);

	if (!auth)
		return <Login onSubmit={login}></Login>

	return (
		<div className="w-full h-screen flex flex-col items-center justify-center">
			<h1>Vue télé</h1>
			<div>{message}</div>
		</div>
	)
}
