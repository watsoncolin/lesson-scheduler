export class RegistrationCreatedEvent {
  constructor(
    public readonly userId: string,
    public readonly scheduleId: string,
    public readonly studentId: string,
  ) {}
}
