'use client';

import {verifySession} from "@/app/lib/session";
import {useEffect, useState} from "react";

export default function TelevisionView() {
	const [userId, setUserId] = useState<string>('');

	useEffect(() => { fetchUserId() }, []);

	async function fetchUserId() {
		let content = await verifySession();
		setUserId(content.userId);
	}

	return (
		<div className="w-full h-screen flex flex-col">
			<div className="flex flex-row justify-center bg-blue-500 py-2">
				<h1 className="font-bold text-black">{userId}</h1>
			</div>
		</div>
	);
}
