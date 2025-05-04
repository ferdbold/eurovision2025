import Performances from "@/app/lib/performances";
import Logo from "@/app/ui/logo";
import {IPerformance} from "@/app/types";
import {useEffect, useState} from "react";
import {getScores} from "@/app/lib/actions";

interface IScore {
	id: string,
	score: number,
}

export default function Scoreboard() {
	const performances = Performances;
	const [scores, setScores] = useState<IScore[]>([]);

	useEffect(() => {
		getScores().then((rawScores) => {
			let newScores: IScore[] = [];
			Object.keys(rawScores).forEach((key, index) => {
				// @ts-ignore
				newScores.push({ id: key, score: rawScores[key] });
			});

			newScores = newScores.sort((a, b) => b.score - a.score);
			setScores(newScores);
		});
	}, []);

	return (
		<div className="w-screen h-screen flex flex-col justify-center bg-radial-[at_50%_100%] from-purple-800 from-5% to-rose-700 animate-fade">
			<header className="flex flex-col items-center py-4">
				<Logo className="animate-fade-down animate-delay-500" />
			</header>
			<div className="w-128 mx-auto flex flex-col gap-4">
				{performances.map((p, i) =>
					<ScoreboardEntry key={`scoreboard-${i}`} className={`animate-fade-down animate-delay-[${400 + (56 * i)}ms]`} performance={p} position={i+1} score={0}></ScoreboardEntry>
				)}
			</div>
		</div>
	);
}

interface IScoreboardEntryProps {
	className?: string;
	performance: IPerformance
	position: number
	score: number
}

function ScoreboardEntry(props: IScoreboardEntryProps) {
	return (
		<div className={`${props.className ?? ''} flex flex-row text-black text-2xl uppercase pr-2`}>
			<img className="size-18 -my-3 -mr-8 z-10" src={props.performance.flag_url} alt={props.performance.country} />
			<div className="bg-rose-400 pl-8 pr-2 py-2 w-20 text-white text-right font-bold">{`${props.position}`.padStart(2, '0')}</div>
			<div className="flex-1 font-bold pl-2 py-2 bg-white">{props.performance.country}</div>
			<div className="py-2 pr-2 font-bold text-rose-600 bg-white">{props.score}</div>
		</div>
	)
}
