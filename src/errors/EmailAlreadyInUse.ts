export class EmailAlreadyInUse extends Error {
  statusCode = 409;
  constructor() {
    super('This email is already in use.');
    this.name = 'EmailAlreadyInUse';
  }
}