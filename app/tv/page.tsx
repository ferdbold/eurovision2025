'use client'

import {Suspense, useEffect, useState} from "react";
import Pusher from 'pusher-js';
/*import {loginAdmin} from "@/app/lib/auth";
import Login from "@/app/admin/adminLogin";*/
import Performances from "@/app/lib/performances";
import {IPerformance} from "@/app/types";
import Logo from "@/app/ui/logo";
import PerformanceIntro from "@/app/tv/performanceIntro";
import Scoreboard from "@/app/tv/scoreboard";

export default function TelevisionView() {
	const [CurrentPerformance, setCurrentPerformance] = useState<IPerformance|null>(null);
	const [ScoreboardCode, setScoreboardCode] = useState<string|null>(null);
	//const [auth, setAuth] = useState<boolean>(false);

	/*async function login(formData: FormData)
	{
		let valid = await loginAdmin(formData);
		setAuth(valid);
	}*/

	useEffect(() => {
		/*if (!auth)
			return;*/

		let pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
			cluster: 'us2'
		});

		let channel = pusher.subscribe('tv');
		channel.bind('show-home', () => {
			setScoreboardCode(null);
			setCurrentPerformance(null);
		});

		channel.bind('show-scoreboard', (data: any) => {
			setScoreboardCode(data.code);
			setCurrentPerformance(null);
		});

		channel.bind('show-performance', (data: any) => {
			const performance = Performances.find(p => p.id === data.id);
			if (performance !== undefined)
			{
				setScoreboardCode(null);
				setCurrentPerformance(performance);
			}
		});
	}, [/*auth*/]);

	/*if (!auth)
		return (
			<Suspense>
				<Login onSubmit={login}></Login>
			</Suspense>
		);*/

	if (CurrentPerformance !== null)
		return <PerformanceIntro performance={CurrentPerformance} />

	if (ScoreboardCode !== null)
		return <Scoreboard code={ScoreboardCode} />;

	return <Idle/>;
}


function Idle() {
	return (
		<div className="w-full h-screen bg-radial-[at_50%_100%] from-purple-800 from-5% to-rose-700 animate-fade">
			<div className="w-full h-full grid grid-cols-2 justify-evenly place-items-center">
				<Logo className="animate-fade-down animate-delay-200" />
				<Logo className="animate-fade-left animate-delay-600"/>
				<Logo className="animate-fade-right animate-delay-800"/>
				<Logo className="animate-fade-up animate-delay-400" />
			</div>
		</div>
	)
}
