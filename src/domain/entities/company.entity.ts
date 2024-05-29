export class Company {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly address: string,
    readonly city: string,
    readonly country: string,
    readonly email: string,
    readonly phone: string,
    readonly website: string,
  ) {}
}
