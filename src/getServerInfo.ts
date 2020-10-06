import phin from 'phin'

interface IAssetGameResponse {
  joinScriptUrl: string
}

/**
 * Returns the IP and Port of a Roblox game server
 * @param placeId
 * @param jobId
 * @param cookie
 */
const InternalGetServerData = async (
  placeId: number | string,
  jobId: string,
  cookie: string
): Promise<[string, string]> => {
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

  if (initialRequest.statusCode !== 200 && initialRequest.body) {
    const joinScriptUrl = initialRequest.body.joinScriptUrl
    if (!joinScriptUrl) throw 'No joinScriptUrl'

    const gameDataResponse = await phin(joinScriptUrl)
    const gameData = JSON.parse(gameDataResponse.body.toString().replace(/--.*\r\n/, ''))

    return [gameData.MachineAddress, gameData.serverPort]
  } else {
    throw new Error('Initial request failed')
  }
}

export = InternalGetServerData
