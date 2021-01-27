# Rodentify

**Rodentify** is a package, written in Typescript, for identify and authenticating Roblox game servers. It provides methods for getting a servers IP address and checking if a server is currently alive (both given a place and job ID).

## How does it work?
Rodentify works by essentially initializing a join request with Roblox. Doing so means that Roblox returns a lot of useful information about the game server, including its IP address. Having the game servers *real* IP address is important because it means that you can compare it against incoming requests (to a web server) that are *claiming* to be that game server to make sure the request is authentic.

It is important to note that Rodentify does **not** make any account join the game. For that to happen you would have to initalize a UDP connection with the game server, which this does *not* do.

## Limitations
This package comes with some key limitations that you should remain aware of when working with it. Due to the way that this package works, any server that you want to run Rodentify against must meet the following conditions:
- The game must be 100% public.
  - This means that it cannot be paid access and/or group/friends only.
- The server cannot be full.

Because Rodentify works by initializing a join request with the server, that server must actually be joinable by an average account. You can get around the first limitation by giving whatever bot account you may be using permission to join the game. However, this may not work for all circumstances.

You can get around the second limitation by making your game send an initial request to your web server every time a server starts up. Doing this means that your web server can cache the real IP of the game server without having to grab it again in the future. Then, when requests come to your server, simply compare the requests IP address to the cached IP address.

## Example
```typescript
import crypto from 'crypto'
import rodentify from 'rodentify'
import express from 'express'
const app = express()

// Set the cookie here so we don't have to specify it with each function call
rodentify.SetCookie(process.env.ROBLOSECURITY)

// In a production environment, CachedAddresses should be hosted on a database like Redis
// You should also ideally have a cron job that runs frequently which clears out dead servers from the
// cache. You can check if a server is dead with the `Rodentify.IsServerAlive()` method.
interface IServerData {
	serverAddress: string
	secret: string
}
const CachedAddresses = new Map<string, IServerData>() // <jobId, IServerData>

app.post('/auth/handshake', async (req, res) => {
	const placeId = req.header('roblox-id') // This is put in automatically by Roblox
	const jobId = req.header('roblox-job') // This must be entered as a header manually in your Roblox script
	if (!placeId || !jobId) return res.sendStatus(400)
	if (placeId !== '1234') return res.sendStatus(401) // Make sure its from the right game

	// Already authenticated??
	if (CachedAddresses.get(jobId)) return res.sendStatus(400)

	// Get the IP address of the server the request is claiming to be and compare it against the requests IP
	const serverAddress = await rodentify.GetServerAddress(placeId, jobId)
    // I'm 99% this uses headers (which are easily faked) behind the scenes. In production you should be behind
    // something like Cloudflare (or some other proxy) which will usually give you the requests IP in a header you can trust
	const originAddress = req.ip

	if (serverAddress !== originAddress) return res.sendStatus(401)

	// We generate a secret code to prevent IP spoofing. When someone attempts to spoof their IP address
	// they can only send a request and do not get a response. In the scenario where an attacker was somehow
	// able to handshake with the web server before Roblox could they won't be able to get the secret for future
	// requests and so are stopped here. In a much more likely scenario, this also prevents an attacker posing
	// as the game server (via IP spoofing) since they did not get the secret from the handshake.
	const secret = crypto.randomBytes(64).toString('hex')

	CachedAddresses.set(jobId, {
		serverAddress,
		secret,
	})

	res.send(secret)
})

// Authenticating future requests should be easy enough. Simply create a middleware which compares the origin IP
// to the cached game server IP and validates the secret.

app.listen(8080)
```

## Need help?
If you need help with this package then please create an issue on this repo. This allows other people to see a solution to the problem if they encounter it because it will be indexed by search engines. For this reason I would prefer you do not message me privately. Thanks!