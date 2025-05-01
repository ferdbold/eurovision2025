'use server'

import { kv } from '@vercel/kv';
import { redirect } from "next/navigation";

import {createSession, deleteSession} from "@/app/lib/session";

export async function signup(formData: FormData) {
	let code = formData.get('code')?.toString().toUpperCase() || '';

	const codeExists = await kv.sismember('codes', code);
	if (codeExists === 0)
		redirect('/?error=Le code est invalide');

	const voterExists = await kv.hexists('voters', code);
	if (voterExists === 0)
		await kv.hset('voters', { [`${code}`]: { votes: [] } });

	await createSession(code);
	redirect('/vote');
}

export async function loginAdmin(formData: FormData) {
	let password = formData.get('password')?.toString().toUpperCase() || '';

	const valid = await kv.get("admin") === password;
	if (!valid)
		redirect('/admin?error=Le code est invalide');

	return true;
}

export async function logout() {
	await deleteSession();
	redirect('/login');
}
