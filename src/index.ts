import { _GetJoinTicket, _GetServerData } from './getServerInfo'

interface ISettings {
	cookie?: string
}

namespace Rodentify {
	let _settings: ISettings = { cookie: undefined }

	/**
	 * Sets the cookie that should be used by default in all requests. If this is
	 * not set and the request does not overwrite the cookie then an error will
	 * be thrown.
	 * @param newCookie
	 */
	export const SetCookie = (newCookie: string) => (_settings.cookie = newCookie)

	/** Gets the cookie currently in use by Rodentify. */
	export const GetCookie = () => _settings.cookie

	/**
	 * Gets the real IP address of a Roblox game server running the
	 * specified place and job ID. To use this method the place ID must belong
	 * to a place that is *completely* public (not friends only/paid access) and
	 * the server not full. This is because it is essentially initialling a join
	 * request to the game and that game must be assessable to the account cookie
	 * that was set.
	 *
	 * @example
	 * ```typescript
	 * const serverAddress = await GetServerAddress(123456789, '4136c54c-07e6-11eb-adc1-0242ac120002')
	 * ```
	 */
	export async function GetServerAddress(placeId: number | string, jobId: string) {
		if (!_settings.cookie) throw new Error('No cookie has been set')
		const serverData = await GetServerData(placeId, jobId)
		return serverData.MachineAddress
	}

	/**
	 * Gets various information about a game server including session information,
	 * and server port and address. To use this method the place ID must belong
	 * to a place that is *completely* public (not friends only/paid access) and
	 * the server not full. This is because it is essentially initialling a join
	 * request to the game and that game must be assessable to the account cookie
	 * that was set.
	 *
	 * @example
	 * ```typescript
	 * const serverData = await GetServerData(123456789, '4136c54c-07e6-11eb-adc1-0242ac120002')
	 * const countryCode = serverData.CountryCode
	 * ```
	 */
	export async function GetServerData(placeId: number | string, jobId: string) {
		if (!_settings.cookie) throw new Error('No cookie has been set')
		return _GetServerData(placeId, jobId, _settings.cookie)
	}

	/**
	 * Checks if a Roblox server is still alive (joinable) and returns a boolean
	 *
	 * @example
	 * ```typescript
	 * const isServerRunning = await IsServerAlive(123456789, '4136c54c-07e6-11eb-adc1-0242ac120002')
	 * if (!isServerRunning) return res.sendStatus(401)
	 * ```
	 */
	export async function IsServerAlive(placeId: number | string, jobId: string) {
		if (!_settings.cookie) throw new Error('No cookie has been set')

		try {
			const joinTicket = await _GetJoinTicket(placeId, jobId, _settings.cookie)
			return joinTicket !== undefined
		} catch (e) {
			return false
		}
	}
}

export = Rodentify
