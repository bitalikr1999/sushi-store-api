export interface IUsersReferralsService {
	add(payload: IAddUserReferralPayload): Promise<void>
	activate(invitedUserId: number): Promise<void>
}

export interface IAddUserReferralPayload {
	userId: number
	invitedId: number
}
