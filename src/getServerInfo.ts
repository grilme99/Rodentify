import phin from 'phin'
import { IJoinTicket } from './types/JoinTicketTypes'

interface IAssetGameResponse {
	joinScriptUrl: string
}

export async function _GetJoinTicket(placeId: number | string, jobId: string, cookie: string) {
	if (!placeId) throw new Error('Expected a placeId')
	if (!jobId) throw new Error('Expected a jobId')
	if (!cookie) throw new Error('Expected a cookie')

	const initialRequest = await phin<IAssetGameResponse>({
		url: `https://assetgame.roblox.com/Game/PlaceLauncher.ashx?request=RequestGameJob&placeId=${placeId}&gameId=${jobId}`,
		headers: {
			'User-Agent':
				'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36',
			Referer: `https://www.roblox.com/games/${placeId}/`,
			Origin: 'https://www.roblox.com',
			Cookie: `.ROBLOSECURITY=${cookie}; path=/; domain=.roblox.com;`
		},
		parse: 'json'
	})

	if (initialRequest.statusCode === 200 && initialRequest.body) {
		const joinScriptUrl = initialRequest.body.joinScriptUrl
		if (!joinScriptUrl) throw 'No joinScriptUrl'
		return joinScriptUrl
	} else {
		throw new Error('Initial request failed')
	}
}

export async function _GetServerData(placeId: number | string, jobId: string, cookie: string) {
	if (!placeId) throw new Error('Expected a placeId')
	if (!jobId) throw new Error('Expected a jobId')
	if (!cookie) throw new Error('Expected a cookie')

	const joinScriptUrl = await _GetJoinTicket(placeId, jobId, cookie)

	const gameDataResponse = await phin(joinScriptUrl)
	const gameData: IJoinTicket = JSON.parse(gameDataResponse.body.toString().replace(/--.*\r\n/, ''))

	return gameData
}
