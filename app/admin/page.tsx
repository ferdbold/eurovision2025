'use client'

import {showPerformance, showScoreboard} from "@/app/lib/actions";

export default function AdminView() {
	return (
		<div className="w-full h-screen flex flex-col items-center justify-center">
			<h1>Vue admin</h1>
			<button onClick={showScoreboard}>Show scoreboard</button>
			<button onClick={() => showPerformance(1)}>Show performance #1</button>
		</div>
	);
}
