'use client';

import {useSortable} from "@dnd-kit/sortable";
import {CSS} from '@dnd-kit/utilities';
import {Bars3Icon} from "@heroicons/react/24/solid";
import {IDragPerformer} from "@/app/types";

interface IDragEntryProps {
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
		<div ref={setNodeRef} className="flex flex-row p-1 bg-white text-black" style={style} {...listeners} {...attributes}>
			<div className="grow">{props.performer.name}</div>
			<Bars3Icon className="size-6"/>
		</div>
	);
}
