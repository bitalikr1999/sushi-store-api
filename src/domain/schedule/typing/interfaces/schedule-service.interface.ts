export interface IScheduleService {
	put(payload: IPutShiftPayload): Promise<void>
}

export interface IPutShiftPayload {
	date: string

	start: number
	end: number

	isClosed: boolean
}
