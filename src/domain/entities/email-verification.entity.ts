export class EmailVerification {
  constructor(
    readonly id: number,
    readonly email: string,
    readonly code: number,
    readonly createdAt: Date,
  ) {}
}
