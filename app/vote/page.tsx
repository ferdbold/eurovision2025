'use client';

import {useEffect, useState} from "react";
import {verifySession} from "@/app/lib/session";
import DragEntry from "@/app/vote/dragEntry";
import {DndContext, DragEndEvent} from "@dnd-kit/core";
import {restrictToVerticalAxis} from '@dnd-kit/modifiers';
import {arrayMove, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {IDragPerformer} from "@/app/types";

export default function TelevisionView() {
	const [userId, setUserId] = useState<string>('');
	const [performers, setPerformers] = useState<IDragPerformer[]>([
		{
			id: 1,
			name: "Kitty",
			song: "Song Name",
			year: 1998,
			country: "France",
			image_url: "performers/kitty.png"
		},
		{
			id: 2,
			name: "Kelly Day",
			song: "Song Name",
			year: 1998,
			country: "France",
			image_url: "performers/kelly.png"
		},
		{
			id: 3,
			name: "Coco Nutz",
			song: "Song Name",
			year: 1998,
			country: "France",
			image_url: "performers/coco.png"
		}
	]);

	useEffect(() => { fetchUserId() }, []);

	async function fetchUserId() {
		let content = await verifySession();
		setUserId(content.userId);
	}

	return (
		<div className="w-full h-screen flex flex-col">
			<div className="flex flex-row justify-center bg-blue-500 py-2">
				<h1 className="font-bold text-black">{userId}</h1>
			</div>

			<div className="flex flex-col gap-2 mt-2">
				<DndContext onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis]}>
					<SortableContext items={performers} strategy={verticalListSortingStrategy}>
						{performers.map((p, i) => <DragEntry key={p.id} position={i+1} performer={p}></DragEntry> )}
					</SortableContext>
				</DndContext>
			</div>
		</div>
	);

	function handleDragEnd(event: DragEndEvent) {
		const {active, over} = event;

		if (over === null)
			return;

		if (active.id !== over.id) {
			setPerformers((items) => {
				const oldIndex = items.findIndex(p => p.id === active.id);
				const newIndex = items.findIndex(p => p.id === over.id)
				return arrayMove(items, oldIndex, newIndex);
			});
		}
	}
}
