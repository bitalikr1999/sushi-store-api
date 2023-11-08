export enum Events {
	OnErrorJoinUser = 'OnErrorJoinUser',
	StopSessions = 'StopSessions',
	OnUserConnect = 'OnUserConnect',
	OnUserDisconnect = 'OnUserDisconnect',
	OnUserDeleted = 'OnUserDeleted',
	OnChatMessageView = 'OnChatMessageView',
	OnReadChat = 'OnReadChat',
}

export interface IEventsPayloads {
	[Events.StopSessions]: {
		userId: number
		sessionsIds?: number[]
	}

	[Events.OnUserConnect]: {
		userId: number
	}

	[Events.OnUserDisconnect]: {
		userId: number
	}

	[Events.OnUserDeleted]: {
		userId: number
	}

	[Events.OnChatMessageView]: {
		userId: number
		messageIds: number[]
	}

	[Events.OnReadChat]: {
		userId: number
		chatId: number
	}
}
