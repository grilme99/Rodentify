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

export interface IJoinTicket {
	ClientPort: number
	MachineAddress: string
	ServerPort: number
	ServerConnections: Array<IServerConnection>
	PingUrl: string
	PingInterval: number
	UserName: string
	DisplayName: string
	SeleniumTestMode: boolean
	UserId: number
	RobloxLocale: string
	GameLocale: string
	SuperSafeChat: boolean
	CharacterAppearance: string
	ClientTicket: string
	GameId: string
	PlaceId: number
	BaseUrl: string
	ChatStyle: string
	CreatorId: number
	CreatorTypeEnum: string
	MembershipType: string
	AccountAge: number
	CookieStoreFirstTimePlayKey: string
	CookieStoreFiveMinutePlayKey: string
	CookieStoreEnabled: boolean
	IsUnknownOrUnder13: boolean
	GameChatType: string
	SessionId: ISessionId
	AnalyticsSessionId: string
	DataCenterId: number
	UniverseId: number
	FollowUserId: number
	characterAppearanceId: number
	CountryCode: string
}
