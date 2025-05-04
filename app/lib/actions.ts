'use server'

import {kv} from "@vercel/kv";
import Performances from "@/app/lib/performances";
import Points from "@/app/lib/points";

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

export async function getScores() {
	const allVotes = await kv.hgetall('voters');
	if (allVotes === null)
		return [];

	let result = {};
	for (const p of Performances) {
		// @ts-ignore
		result[p.id] = 0;
	}

	Object.keys(allVotes).forEach((key, index) => {
		// TODO: Verify how votes are counted
		// @ts-ignore
		const votes = allVotes[key].votes;
		for (let i = 0; i < votes.length; i++) {
			// @ts-ignore
			result[votes[i]] += Points[i];
		}
	});

	return result;
}

export async function submitVotes(userId: string, votes: number[]) {
	await kv.hset('voters', { [`${userId}`]: { votes: votes } });
}
