'use server'

import {kv} from "@vercel/kv";

function getPusher(): typeof Pusher {
	const Pusher = require("pusher");
	return new Pusher({
		appId: process.env.PUSHER_APP_ID!,
		key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
		secret: process.env.PUSHER_SECRET!,
		cluster: "us2",
		useTLS: true
	});
}

export async function showHome() {
	const pusher = getPusher();
	pusher.trigger('tv', 'show-home', {});
}

export async function showScoreboard() {
	const pusher = getPusher();
	pusher.trigger('tv', 'show-scoreboard', {});
}

export async function showIntro(id: number) {
	const pusher = getPusher();
	pusher.trigger('tv', 'show-performance', {id: id});
}

export async function getVotes(userId: string) {
	const userData = await kv.hget('voters', userId);
	// @ts-ignore
	return userData.votes;
}

export async function submitVotes(userId: string, votes: number[]) {
	await kv.hset('voters', { [`${userId}`]: { votes: votes } });
}
