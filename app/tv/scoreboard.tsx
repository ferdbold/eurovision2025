import Performances from "@/app/lib/performances";
import Logo from "@/app/ui/logo";
import {IPerformance} from "@/app/types";
import {useEffect, useState} from "react";
import {getScores} from "@/app/lib/actions";

interface IScoreboardProps {
	code: string
}

interface IScore {
	id: number,
	score: number,
}

const AcademyVotes: IScore[][]  = [
	// None
	[
		{ id: 1, score: 0 },
		{ id: 2, score: 0 },
		{ id: 3, score: 0 },
		{ id: 4, score: 0 },
		{ id: 5, score: 0 },
		{ id: 6, score: 0 },
		{ id: 7, score: 0 },
		{ id: 8, score: 0 },
		{ id: 9, score: 0 },
		{ id: 10, score: 0 },
	],
	// Academy 1
	[
		{ id: 1, score: 3 },
		{ id: 2, score: 6 },
		{ id: 3, score: 1 },
		{ id: 4, score: 5 },
		{ id: 5, score: 8 },
		{ id: 6, score: 7 },
		{ id: 7, score: 2 },
		{ id: 8, score: 10 },
		{ id: 9, score: 12 },
		{ id: 10, score: 4 },
	],
	// Academy 1+2
	[
		{ id: 1, score: 9 },
		{ id: 2, score: 11 },
		{ id: 3, score: 13 },
		{ id: 4, score: 12 },
		{ id: 5, score: 11 },
		{ id: 6, score: 9 },
		{ id: 7, score: 10 },
		{ id: 8, score: 20 },
		{ id: 9, score: 13 },
		{ id: 10, score: 8 },
	],
	// Academy 1+2+3
	[
		{ id: 1, score: 17 },
		{ id: 2, score: 15 },
		{ id: 3, score: 20 },
		{ id: 4, score: 14 },
		{ id: 5, score: 21 },
		{ id: 6, score: 14 },
		{ id: 7, score: 11 },
		{ id: 8, score: 23 },
		{ id: 9, score: 25 },
		{ id: 10, score: 14 },
	],
	// Academy 1+2+3+4
	[
		{ id: 1, score: 26 },
		{ id: 2, score: 26 },
		{ id: 3, score: 26 },
		{ id: 4, score: 26 },
		{ id: 5, score: 26 },
		{ id: 6, score: 26 },
		{ id: 7, score: 26 },
		{ id: 8, score: 26 },
		{ id: 9, score: 26 },
		{ id: 10, score: 26 },
	]
];

export default function Scoreboard(props: IScoreboardProps) {
	const [PublicScores, setPublicScores] = useState<IScore[]>([]);

	useEffect(() => {
		getScores().then((rawScores) => {
			let newScores: IScore[] = [];
			Object.keys(rawScores).forEach((key, index) => {
				// @ts-ignore
				newScores.push({ id: parseInt(key), score: rawScores[key] });
			});

			newScores = newScores.sort((a, b) => b.score - a.score);
			setPublicScores(newScores);
		});
	}, []);

	let scoresToShow: IScore[];
	if (props.code === 'academy4')
		scoresToShow = AcademyVotes[4];
	else if (props.code === 'academy3')
		scoresToShow = AcademyVotes[3];
	else if (props.code === 'academy2')
		scoresToShow = AcademyVotes[2];
	else if (props.code === 'academy1')
		scoresToShow = AcademyVotes[1];
	else if (props.code === 'public')
	{
		console.log("Public scores:");
		console.log(PublicScores);
		scoresToShow = AcademyVotes[4].map<IScore>(e => {
			const publicScore = PublicScores.find(p => p.id === e.id);
			console.log(publicScore);
			return {
				id: e.id,
				score: e.score + (publicScore?.score ?? 0)
			}
		});
	}
	else
		scoresToShow = AcademyVotes[0];

	scoresToShow = scoresToShow.sort((a, b) => b.score - a.score);
	console.log("Scores to show:");
	console.log(scoresToShow);

	return (
		<div className="w-screen h-screen flex flex-col justify-center bg-radial-[at_50%_100%] from-purple-800 from-5% to-rose-700 animate-fade">
			<header className="flex flex-col items-center py-4">
				<Logo className="animate-fade-down animate-delay-500" />
			</header>
			<div className="w-150 mx-auto flex flex-col gap-4">
				{scoresToShow.map((s, i) => {
					const perf = Performances.find(p => p.id === s.id);
					if (perf === undefined)
						return null;

					return <ScoreboardEntry key={`scoreboard-${i}`} className={`animate-fade-down animate-delay-[${400 + (56 * i)}ms]`} performance={perf} position={i+1} score={s.score} />
				})}
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
		<div className={`${props.className ?? ''} flex flex-row text-black text-4xl uppercase pr-2`}>
			<img className="size-20 -my-3 -mr-10 z-10" src={props.performance.flag_url} alt={props.performance.country} />
			<div className="bg-rose-400 pl-12 pr-4 py-2 w-30 text-white text-right font-bold">{`${props.position}`.padStart(2, '0')}</div>
			<div className="flex-1 font-bold pl-4 py-2 bg-white">{props.performance.country}</div>
			<div className="py-2 pr-4 font-bold text-rose-600 bg-white">{props.score}</div>
		</div>
	)
}
