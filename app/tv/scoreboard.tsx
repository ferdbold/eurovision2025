import Performances from "@/app/lib/performances";
import Logo from "@/app/ui/logo";
import {IPerformance} from "@/app/types";

interface IScoreboardProps {

}

export default function Scoreboard(props: IScoreboardProps) {
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
