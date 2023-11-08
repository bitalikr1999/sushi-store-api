import { Inject, Injectable } from '@nestjs/common'
import {
	IAddUserReferralPayload,
	IUsersReferralsRepository,
	IUsersReferralsService,
	IUsersRepository,
	USERS_REFERRAL_REPOSITORY,
	USERS_REPOSITORY,
} from '../typing'

@Injectable()
export class UsersReferralsService implements IUsersReferralsService {
	@Inject(USERS_REFERRAL_REPOSITORY)
	private readonly usersReferralRepository: IUsersReferralsRepository

	@Inject(USERS_REPOSITORY)
	private readonly usersRepository: IUsersRepository

	public async add(payload: IAddUserReferralPayload): Promise<void> {
		const checkExist = await this.usersReferralRepository.findOneBy({
			invitedId: payload.invitedId,
			userId: payload.userId,
		})

		if (checkExist) return

		await this.usersReferralRepository.insert({
			invitedId: payload.invitedId,
			userId: payload.userId,
			bonusesToAccured: 100,
			isBonusesAccured: false,
		})
	}

	public async activate(invitedUserId: number): Promise<void> {
		const referral = await this.usersReferralRepository.findOneBy({
			invitedId: invitedUserId,
		})

		if (referral.isBonusesAccured) return

		const user = await this.usersRepository.findOneBy({ id: referral.userId })

		await this.usersReferralRepository.update(referral.id, { isBonusesAccured: true })
		await this.usersRepository.update(user.id, {
			bonus: Number(user.bonus) + Number(referral.bonusesToAccured),
		})
	}
}
