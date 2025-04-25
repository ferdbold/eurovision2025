'use client';

import {useSortable} from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';
import {Bars3Icon} from "@heroicons/react/24/solid";
import {IDragPerformer} from "@/app/types";

interface IDragEntryProps {
	position: number
	performer: IDragPerformer
}

export default function DragEntry(props: IDragEntryProps) {
	const {attributes, listeners, setNodeRef, transform, transition} = useSortable({
		id: props.performer.id,
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
				<div className="text-6xl text-center w-16 font-fancy font-bold">{props.position}</div>
				<img src={props.performer.image_url} alt={props.performer.name} className="max-w-16"/>
				<div className="grow leading-5">
					<div className="text-3xl font-fancy font-bold">{props.performer.name}</div>
					<div>{props.performer.song}</div>
					<div><strong>{props.performer.country}</strong>, {props.performer.year}</div>
				</div>
				<Bars3Icon className="size-6"/>
			</div>
		</div>
	);
}
