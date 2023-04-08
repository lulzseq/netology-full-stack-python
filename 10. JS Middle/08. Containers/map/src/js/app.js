export default class ErrorRepository {
  constructor() {
    this.members = new Map([[1, 'Error 1']]);
  }

  transalate(code) {
    if (this.members.has(code)) {
      return this.members.get(code);
    }
    return 'Unknown error';
  }
}
