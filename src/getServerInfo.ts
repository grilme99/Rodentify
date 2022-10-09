import phin from 'phin'
import { IAssetGameResponse, IJoinScript } from './types/JoinTicketTypes'

export async function _GetJoinTicket(placeId: number | string, jobId: string, cookie: string) {
	if (!placeId) throw new Error('Expected a placeId')
	if (!jobId) throw new Error('Expected a jobId')
	if (!cookie) throw new Error('Expected a cookie')

	const initialRequest = await phin<IAssetGameResponse>({
		url: "https://gamejoin.roblox.com/v1/join-game-instance",
		method: "post",
		headers: {
			'User-Agent': 'Roblox',
			Referer: `https://www.roblox.com/games/${placeId}/`,
			Origin: 'https://www.roblox.com',
			Cookie: `.ROBLOSECURITY=${cookie}; path=/; domain=.roblox.com;`
		},
		data: {
			placeId: placeId,
			isTeleport: false,
			gameId: jobId,
			gameJoinAttemptId: jobId
		},
		parse: 'json'
	})

	if (initialRequest.statusCode === 200 && initialRequest.body) {
		const body = initialRequest.body
		console.log(body)

		if (!body.jobId || !body.joinScript) throw 'No joinScript or jobId'
		
		return body.joinScript
	} else {
		throw new Error('Initial request failed')
	}
}

export async function _GetServerData(placeId: number | string, jobId: string, cookie: string) {
	if (!placeId) throw new Error('Expected a placeId')
	if (!jobId) throw new Error('Expected a jobId')
	if (!cookie) throw new Error('Expected a cookie')

	const gameData: IJoinScript = await _GetJoinTicket(placeId, jobId, cookie)
	return gameData
}
