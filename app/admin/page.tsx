'use client'

import {showHome, showIntro, showScoreboard} from "@/app/lib/actions";
import React, {Suspense, useState} from "react";
import {loginAdmin} from "@/app/lib/auth";
import Login from "@/app/admin/adminLogin";
import {Button} from "@/app/ui/button";

export default function AdminView() {
	const [auth, setAuth] = useState<boolean>(false);

	async function login(formData: FormData)
	{
		let valid = await loginAdmin(formData);
		setAuth(valid);
	}

	if (!auth)
		return (
			<Suspense>
				<Login onSubmit={login}></Login>
			</Suspense>
		);

	return (
		<div className="w-full p-8 flex flex-col justify-center gap-8">
			<Button onClick={showHome}>Accueil</Button>
			<div className="flex flex-row w-full items-stretch justify-stretch gap-2">
				<div className="flex w-full flex-col gap-2 items-stretch">
					<Button onClick={() => showIntro(1)}>Intro Belgique Mimi</Button>
					<Button onClick={() => showIntro(2)}>Intro Luxembourg Kitty </Button>
					<Button onClick={() => showIntro(3)}>Intro Islande Coco</Button>
					<Button onClick={() => showIntro(4)}>Intro Danemark Monrose</Button>
					<Button onClick={() => showIntro(5)}>Intro Ukraine Ella & Coco</Button>
				</div>
				<div className="flex w-full flex-col gap-2 items-stretch">
					<Button onClick={() => showIntro(6)}>Intro Chypre Mimi</Button>
					<Button onClick={() => showIntro(7)}>Intro Suède Kitty</Button>
					<Button onClick={() => showIntro(8)}>Intro Suisse Ella</Button>
					<Button onClick={() => showIntro(9)}>Intro France Monrose</Button>
					<Button onClick={() => showIntro(10)}>Intro Autriche Kelly</Button>
				</div>
			</div>
			<div className="flex flex-col w-full gap-2">
				<Button onClick={() => showScoreboard('')}>Afficher classement</Button>
				<div className="flex flex-row w-full items-stretch justify-stretch gap-2">
					<div className="flex w-full flex-col gap-2 items-stretch">
						<Button onClick={() => showScoreboard('academy1')}>Académie #1</Button>
						<Button onClick={() => showScoreboard('academy3')}>Académie #3</Button>
					</div>
					<div className="flex w-full flex-col gap-2 items-stretch">
						<Button onClick={() => showScoreboard('academy2')}>Académie #2</Button>
						<Button onClick={() => showScoreboard('academy4')}>Académie #4</Button>
					</div>
				</div>
				<Button onClick={() => showScoreboard('public')}>Vote du public</Button>
			</div>
		</div>
	);
}
