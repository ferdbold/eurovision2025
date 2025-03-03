'use server'

import { kv } from '@vercel/kv';
import { redirect } from "next/navigation";

import {createSession, deleteSession} from "@/app/lib/session";

export async function signup(formData: FormData) {
	let name = formData.get('name')?.toString() || 'Conchita';

	const exists = await kv.hexists('voters', name);
	if (exists === 0)
		await kv.hset('voters', { [`${name}`]: { votes: [] } });

	await createSession(name);
	redirect('/vote');
}

export async function logout() {
	await deleteSession();
	redirect('/login');
}
