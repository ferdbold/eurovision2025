'use client'

import {useEffect, useState} from "react";
import Pusher from 'pusher-js';

export default function TelevisionView() {
	const [message, setMessage] = useState<string>('');

	useEffect(() => {
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
	}, []);

	return (
		<div className="w-full h-screen flex flex-col items-center justify-center">
			<h1>Vue télé</h1>
			<div>{message}</div>
		</div>
	)
}
