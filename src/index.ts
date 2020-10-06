import InternalGetServerInfo from './getServerInfo'

import ISettings from './types/ISettings'

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
  if (_settings.cookie) throw new Error('No cookie has been set')
  return InternalGetServerInfo(placeId, jobId, _settings.cookie!)
}
