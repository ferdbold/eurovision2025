'use client';

import {useEffect, useState} from "react";
import {verifySession} from "@/app/lib/session";
import DragEntry from "@/app/vote/dragEntry";
import {DndContext, DragEndEvent, MouseSensor, TouchSensor, useSensor, useSensors} from "@dnd-kit/core";
import {restrictToVerticalAxis} from '@dnd-kit/modifiers';
import {arrayMove, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {IPerformance} from "@/app/types";

export default function TelevisionView() {
	const [userId, setUserId] = useState<string>('');
	const [performers, setPerformers] = useState<IPerformance[]>([
		{
			id: 1,
			performer: "Mimi Fatale",
			artist: "Dami Im",
			song: "Sound of Silence",
			country: "Australie",
			year: 2016,
			image_urls: ["performers/mimi-sm.png"]
		},
		{
			id: 2,
			performer: "Kitty Catcher",
			artist: "France Gall",
			song: "Poupée de cire",
			country: "Luxembourg",
			year: 1965,
			image_urls: ["performers/kitty-sm.png"]
		},
		{
			id: 3,
			performer: "Coco Nutz",
			artist: "Hera Björk",
			song: "Je ne sais quoi",
			country: "Islande",
			year: 2010,
			image_urls: ["performers/coco-sm.png"]
		},
		{
			id: 4,
			performer: "Lady Monrose",
			artist: "DQ",
			song: "Drama Queen",
			country: "Danemark",
			year: 2007,
			image_urls: ["performers/ladymonrose-sm.png"]
		},
		{
			id: 5,
			performer: "Ella & Coco",
			artist: "Lasha Tumbai",
			song: "Dancing",
			country: "Ukraine",
			year: 2007,
			image_urls: ["performers/coco-sm.png", "performers/ella-sm.png"],
		},
		{
			id: 6,
			performer: "Mimi Fatale",
			artist: "Elena Tsagrinou",
			song: "El Diablo",
			country: "Chypre",
			year: 2021,
			image_urls: ["performers/mimi-sm.png"]
		},
		{
			id: 7,
			performer: "Kitty Catcher",
			artist: "Laureen",
			song: "Tattoo",
			country: "Suède",
			year: 2023,
			image_urls: ["performers/kitty-sm.png"]
		},
		{
			id: 8,
			performer: "Ella Vale",
			artist: "Céline Dion",
			song: "Ne partez pas sans moi",
			country: "Suisse",
			year: 1988,
			image_urls: ["performers/ella-sm.png"]
		},
		{
			id: 9,
			performer: "Lady Monrose",
			artist: "La Zarra",
			song: "Évidemment",
			country: "France",
			year: 2023,
			image_urls: ["performers/ladymonrose-sm.png"]
		},
		{
			id: 10,
			performer: "Kelly D",
			artist: "Conchita Wurst",
			song: "Rise Like a Phoenix",
			country: "Autriche",
			year: 2014,
			image_urls: ["performers/kelly-sm.png"]
		},
	]);

	const sensors = useSensors(
		useSensor(MouseSensor),
		useSensor(TouchSensor),
	);

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

			<div className="flex flex-col gap-2 mt-2 mr-8">
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
