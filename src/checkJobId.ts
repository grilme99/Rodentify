import phin from 'phin'

export interface IServerData {
	id: string
	maxPlayers: number
	playing: number
	playerIds: number[]
	fps: number
	ping: number
}

interface IServersResponse {
	previousPageCursor?: string
	nextPageCursor?: string
	data: IServerData[]
}

const findServer = (placeId: string, jobId: string, resolve: Function, cursor?: string) => {
	const maxServers = 100

	let url = `https://games.roblox.com/v1/games/${placeId}/servers/Public?limit=${maxServers}`
	if (cursor) url += `&cursor=${cursor}`

	phin<IServersResponse>({
		url: url,
		parse: 'json'
	})
		.then(r => {
			if (r.statusCode !== 200) throw new Error('Error sending request')
			const body = r.body

			for (const server of body.data) {
				if (server.id !== jobId) continue
				return resolve(server)
			}

			// No server could be matched
			if (body.nextPageCursor) return findServer(placeId, jobId, resolve, body.nextPageCursor)
			resolve(undefined)
		})
		.catch(err => {
			throw err
		})
}

/**
 * Returns server list data for a specific jobId
 */
const InternalCheckJobId = (placeId: number | string, jobId: string): Promise<IServerData | undefined> => {
	return new Promise((resolve, reject) => {
		if (!placeId) reject(new Error('Expected a placeId'))
		if (!jobId) reject(new Error('Expected a jobId'))

		try {
			findServer(placeId.toString(), jobId, resolve)
		} catch (e) {
			reject(e)
		}
	})
}

export default InternalCheckJobId
