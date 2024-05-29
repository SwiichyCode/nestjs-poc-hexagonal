export class User {
  constructor(
    readonly id: number,
    readonly username: string,
    readonly email: string,
    readonly password: string,
  ) {}
}
