'use client'

import {Suspense, useEffect, useState} from "react";
import Pusher from 'pusher-js';
import {loginAdmin} from "@/app/lib/auth";
import Login from "@/app/admin/adminLogin";
import Performances from "@/app/lib/performances";
import {IPerformance} from "@/app/types";
import Logo from "@/app/ui/logo";

export default function TelevisionView() {
	const [CurrentPerformance, setCurrentPerformance] = useState<IPerformance|null>(null);
	const [ShowScoreboard, setShowScoreboard] = useState<boolean>(false);
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
			setShowScoreboard(true);
			setCurrentPerformance(null);
		});

		channel.bind('show-performance', (data: any) => {
			const performance = Performances.find(p => p.id === data.id);
			if (performance !== undefined)
			{
				setShowScoreboard(false);
				setCurrentPerformance(performance);
			}
		});
	}, [auth]);

	if (!auth)
		return (
			<Suspense>
				<Login onSubmit={login}></Login>
			</Suspense>
		);

	if (CurrentPerformance !== null)
		return <PerformanceIntro performance={CurrentPerformance} />

	if (ShowScoreboard)
		return <Scoreboard />;

	return <Idle/>;
}


function Idle() {
	return (
		<div className="w-full h-screen bg-radial-[at_50%_100%] from-purple-800 from-5% to-rose-700">
			<div className="w-full h-full grid grid-cols-2 justify-evenly place-items-center">
				<Logo />
				<Logo />
				<Logo />
				<Logo />
			</div>
		</div>
	)
}


interface IPerformanceIntroProps {
	performance: IPerformance;
}

function PerformanceIntro(props: IPerformanceIntroProps) {
	return (
		<div className="w-screen h-screen relative bg-radial-[at_50%_100%] from-rose-700 from-5% to-purple-700/25">
			<p className="absolute top-16 left-16 font-fancy text-8xl">#{props.performance.id}</p>
			<div className="absolute right-0 bottom-0 flex flex-row h-full">
				{props.performance.full_drag_urls.map(image_url => {
					return <img className="max-w-200 -mr-72 last:mr-0" key={`drag-${image_url}`} src={image_url} alt={props.performance.performer}/>
				})}
			</div>
			<div className="absolute w-full bottom-0">
				<p className="text-[120px] font-fancy mr-16 -mb-13 text-right">{props.performance.performer}</p>
				<div className="bg-black/50 p-4">
					<div className="flex flex-row w-full items-center justify-between px-14">
						<div className="flex flex-row items-center gap-2">
							<img className="relative -top-8 size-48 -my-16 -mr-4" src={props.performance.flag_url} alt={props.performance.country} />
							<div className="text-4xl">{props.performance.country}, {props.performance.year}</div>
						</div>
						<div className="text-right">
							<p className="text-4xl font-bold">{props.performance.song}</p>
							<p className="text-2xl">{props.performance.artist}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

interface IScoreboardProps {

}

function Scoreboard(props: IScoreboardProps) {
	const performances = Performances;

	return (
		<div className="w-screen h-screen flex flex-col justify-center bg-radial-[at_50%_100%] from-purple-800 from-5% to-rose-700">
			<header className="flex flex-col items-center py-4">
				<Logo/>
			</header>
			<div className="w-128 mx-auto flex flex-col gap-4">
				{performances.map((p, i) =>
					<ScoreboardEntry key={`scoreboard-${i}`} performance={p} position={i+1} score={99}></ScoreboardEntry>
				)}
			</div>
		</div>
	);
}

interface IScoreboardEntryProps {
	performance: IPerformance
	position: number
	score: number
}

function ScoreboardEntry(props: IScoreboardEntryProps) {
	return (
		<div className="flex flex-row text-black text-2xl uppercase pr-2">
			<img className="size-18 -my-3 -mr-8 z-10" src={props.performance.flag_url} alt={props.performance.country} />
			<div className="bg-rose-400 pl-8 pr-2 py-2 w-20 text-white text-right font-bold">{`${props.position}`.padStart(2, '0')}</div>
			<div className="flex-1 font-bold pl-2 py-2 bg-white">{props.performance.country}</div>
			<div className="py-2 pr-2 font-bold text-rose-600 bg-white">{props.score}</div>
		</div>
	)
}