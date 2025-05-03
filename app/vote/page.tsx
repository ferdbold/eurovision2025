'use client'

import {useEffect, useState} from "react";
import {verifySession} from "@/app/lib/session";
import DragEntry from "@/app/vote/dragEntry";
import {DndContext, DragEndEvent, MouseSensor, TouchSensor, useSensor, useSensors} from "@dnd-kit/core";
import {restrictToVerticalAxis} from '@dnd-kit/modifiers';
import {arrayMove, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {IPerformance} from "@/app/types";
import Performances from "@/app/lib/performances";
import {getVotes, submitVotes} from "@/app/lib/actions";

export default function TelevisionView() {
	const [userId, setUserId] = useState<string>('');
	const [performers, setPerformers] = useState<IPerformance[]>([]);

	const sensors = useSensors(
		useSensor(MouseSensor),
		useSensor(TouchSensor),
	);

	useEffect(() => { fetchUserId() }, []);

	// Restore votes upon getting userId
	useEffect(() => {
		if (!userId)
			return;

		console.log(`Restoring votes for user ${userId}...`);
		getVotes(userId).then(votes => {
			console.log(votes);
			if (!votes)
				return;

			const source = Performances;
			let performers:IPerformance[] = [];
			for (let i = 0; i < votes.length; i++)
			{
				let match = source.find(s => s.id === votes[i]);
				if (match === undefined)
					continue;

				performers.push(match);
			}
			console.log("Setting initial performers...");
			setPerformers(performers);
		});
	}, [userId]);

	// Submit votes on every reorder
	useEffect(() => {
		if (performers === null || performers.length === 0)
			return;

		const ids = performers.map(p => p.id);
		console.log("Submitting votes...");
		submitVotes(userId, ids);
	}, [performers]);

	async function fetchUserId() {
		let content = await verifySession();
		setUserId(content.userId);
	}

	return (
		<div className="w-full h-screen flex flex-col">
			<div className="flex justify-between items-center px-8 mt-4">
				<h1 className="text-xl font-fancy">En attendant<br />
				l'<img className="inline-block -my-4 size-32 h-auto" src={"eurovision-logo.png"} alt={"Logo Eurovision"} /></h1>
				<div className="text-2xl font-bold text-black text-white">{userId}</div>
			</div>
			<p className="my-2 mx-8 text-xl font-bold text-center uppercase bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-blue-400">Réorganisez les queens pour former votre top 10!</p>

			<div className="flex flex-col gap-2 pb-8">
				<DndContext onDragEnd={handleDragEnd} sensors={sensors} modifiers={[restrictToVerticalAxis]}>
					<SortableContext items={performers} strategy={verticalListSortingStrategy}>
						{performers.map((p, i) => <DragEntry key={p.id} position={i+1} performance={p}></DragEntry> )}
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
