import {IPerformance} from "@/app/types";
import React from "react";
import Logo from "@/app/ui/logo";

interface IPerformanceIntroProps {
	performance: IPerformance;
}

export default function PerformanceIntro(props: IPerformanceIntroProps) {
	return (
		<div key={props.performance.id} className="w-screen h-screen relative bg-radial-[at_50%_100%] from-rose-700 from-5% to-purple-700/25 animate-fade">
			<div className="relative flex h-full items-center justify-center animate-fade animate-delay-2500 animate-reverse">
				<Logo className="animate-ping animate-once animate-ease-in-out animate-reverse animate-duration-[800ms] scale-200" />
			</div>
			<p className="absolute top-16 left-16 font-fancy text-8xl animate-fade-right animate-ease-out">#{props.performance.id}</p>
			<div className="absolute right-0 bottom-0 flex flex-row h-full">
				{props.performance.full_drag_urls.map((image_url, i) => {
					return <img className="max-w-200 -mr-72 last:mr-0 animate-fade-left animate-ease-out animate-delay-3000" key={`drag-${image_url}`} src={image_url} alt={props.performance.performer}/>
				})}
			</div>
			<div className="absolute w-full bottom-0 animate-fade-left animate-ease-out animate-delay-2000">
				<p className="text-shadow-lg text-shadow-black text-[120px] font-fancy mr-16 -mb-13 text-right">{props.performance.performer}</p>
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
