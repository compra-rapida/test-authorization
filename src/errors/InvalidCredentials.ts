export class InvalidCredentials extends Error {
  public readonly statusCode = 401;

  constructor() {
    super('Invalid credentials.');
    this.name = 'InvalidCredentials';
  }
}
