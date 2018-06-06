import { ValidityCheckerPipe } from './validity-checker.pipe';

describe('ValidityCheckerPipe', () => {
  it('create an instance', () => {
    const pipe = new ValidityCheckerPipe();
    expect(pipe).toBeTruthy();
  });
});
