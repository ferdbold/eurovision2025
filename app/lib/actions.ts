'use server'

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

export async function showScoreboard() {
	const pusher = getPusher();
	pusher.trigger('tv', 'show-scoreboard', {});
}

export async function showPerformance(id: number) {
	const pusher = getPusher();
	pusher.trigger('tv', 'show-performance', {id: id});
}
