'use client'

import {useSortable} from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';
import {Bars3Icon} from "@heroicons/react/24/solid";
import {IPerformance} from "@/app/types";

interface IDragEntryProps {
	position: number
	performance: IPerformance
}

export default function DragEntry(props: IDragEntryProps) {
	const {attributes, listeners, setNodeRef, transform, transition} = useSortable({
		id: props.performance.id,
	});
	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<div ref={setNodeRef}
				 className="mx-2 gap-2 rounded-xl bg-gradient-to-r from-pink-400 to-blue-800"
				 style={style}>
			<div className="flex flex-row items-stretch gap-1">
				<div className="select-none flex flex-row grow gap-0 items-center relative m-1 pr-2 py-2 bg-gradient-to-r from-pink-600 to-blue-950 rounded-lg rounded-tr-none rounded-br-none">
					<div className="text-5xl text-center w-16 font-fancy font-bold select-none z-1 text-black text-shadow-[1px_0_1px_white,-1px_0_1px_white,0_1px_1px_white,0_-1px_1px_white]">{props.position}</div>
					<div className="grow leading-5 z-10">
						<div className="text-3xl leading-7 font-fancy font-bold">{props.performance.performer}</div>
						<div><strong>{props.performance.song}</strong></div>
						<div><em>{props.performance.artist}</em></div>
						<div><strong>{props.performance.country}</strong>, {props.performance.year}</div>
					</div>
					<div className="absolute">
						<img src={props.performance.flag_url} alt={props.performance.country} className="-ml-3 max-w-24" />
					</div>
					<div className="absolute flex w-full h-full justify-end opacity-70">
						{props.performance.image_urls.map((url, i) =>
							<img key={`performer-img-${i}`} src={url} alt={props.performance.performer} className="max-w-32 -mr-12 last:mr-0" />
						)}
					</div>
				</div>
				<div className="flex items-center" {...listeners} {...attributes}>
					<Bars3Icon className="size-6 mr-2" />
				</div>
			</div>
		</div>
	);
}
