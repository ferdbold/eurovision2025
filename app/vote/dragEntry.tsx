'use client';

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
				 style={style} {...listeners} {...attributes}>
			<div className="flex flex-row gap-2 items-center m-1 pr-4 bg-gradient-to-r from-pink-600 to-blue-950 rounded-lg">
				<div className="text-6xl text-center w-16 font-fancy font-bold select-none">{props.position}</div>
				<div className="grow leading-5 select-none">
					<div className="text-3xl leading-7 font-fancy font-bold">{props.performance.performer}</div>
					<div><strong>{props.performance.song}</strong>, <em>{props.performance.artist}</em></div>
					<div><strong>{props.performance.country}</strong>, {props.performance.year}</div>
				</div>
				{props.performance.image_urls.map(url => <img src={url} alt={props.performance.performer} className="max-w-16" />)}
				<Bars3Icon className="size-6"/>
			</div>
		</div>
	);
}
