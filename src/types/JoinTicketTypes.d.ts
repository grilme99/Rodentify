export interface ISessionId {
	SessionId: string
	GameId: string
	PlaceId: number
	ClientIpAddress: string
	PlatformTypeId: number
	SessionStarted: string
	BrowserTrackerId: number
	PartyId?: string
	Age: number
	Latitude: number
	Longitude: number
	CountryId: number
	PolicyCountryId?: string
	LanguageId: number
	BlockedPlayerIds: Array<number>
	JoinType: string
	PlaySessionFlags: number
	MatchmakingDecisionId?: string
	UserScoreObfuscated?: string
	UserScorePublicKey: number
}

export interface IServerConnection {
	Address: string
	Port: number
}

export interface IJoinScript {
	ClientPort: number,
	MachineAddress: string,
	ServerPort: number,
	ServerConnections: Array<IServerConnection>,
	DirectServerReturn: boolean,
	PingUrl: string,
	PingInterval: number,
	UserName: string,
	DisplayName: string,
	SeleniumTestMode: false,
	UserId: number,
	RobloxLocale: string,
	GameLocale: string,
	SuperSafeChat: boolean,
	FlexibileChatEnabled: boolean,
	CharacterAppearance: string,
	ClientTicket: string,
	GameId: string,
	PlaceId: number,
	BaseUrl: string,
	ChatStyle: string,
	CreatorId: number,
	CreatorTypeEnum: string,
	MembershipType: string,
	AccountAge: number,
	CookieStoreFirstTimePlayKey: string,
	CookieStoreFiveMinutePlayKey: string,
	CookieStoreEnabled: boolean,
	IsUnknownOrUnder13: boolean,
	GameChatType: string,
	SessionId: string, //ISessionId, but a string...
	AnalyticsSessionId: string,
	DataCenterId: number,
	UniverseId: number,
	FollowUserId: number,
	characterAppearanceId: number,
	CountryCode: string,
	RandomSeed1: string,
	ClientPublicKeyData: string,
	RccVersion: string,
	ChannelName: string
}

export interface IAssetGameResponse {
	jobId: string,
	status: number,
	joinScriptUrl: string,
	authenticationUrl: string,
	authenticationTicket: string,
	message: string | null,
	joinScript: IJoinScript
}
