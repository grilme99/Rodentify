import InternalCheckJobId from './checkJobId'
import InternalGetServerInfo from './getServerInfo'

interface ISettings {
	cookie?: string
}

let _settings: ISettings = {
	cookie: undefined
}

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
 * Gets the real IP address and port of a Roblox game server running the
 * specified place and job ID. To use this method the place ID must belong
 * to a place that is *completely* public (not friends only/paid access) and
 * the server not full. This is because it is essentially initialling a join
 * request to the game and that game must be assessable to the account cookie
 * that was set.
 *
 * ```typescript
 * const [serverAddress, serverPort] = await GetServerInfo(123456789, '4136c54c-07e6-11eb-adc1-0242ac120002')
 * ```
 */
export const GetServerInfo = async (placeId: number | string, jobId: string) => {
	if (!_settings.cookie) throw new Error('No cookie has been set')
	return InternalGetServerInfo(placeId, jobId, _settings.cookie)
}

/**
 * **Warning:** *This method is slow and is suspectable to hitting rate
 * limits because it has to loop through the server list until it finds
 * the job ID. You should only use this as a fallback for the
 * `IsServerAlive` method.*
 *
 * Returns server list data for a specific job ID or *undefined* if the
 * server is no longer running.
 *
 * This **shouldn't** be used for authentication and should instead be used
 * when you have already authenticated a server and need to make sure that
 * is is still running (for example, in later requests to your API).
 *
 * ```typescript
 * const serverData = await CheckJobId(123456789, '4136c54c-07e6-11eb-adc1-0242ac120002')
 * if (!serverData) return res.sendStatus(401)
 * ```
 */
export const CheckJobId = async (placeID: number | string, jobId: string) => InternalCheckJobId(placeID, jobId)
