import { InvoiceStatusPipe } from './invoice-status.pipe';

describe('InvoiceStatusPipe', () => {
  it('create an instance', () => {
    const pipe = new InvoiceStatusPipe();
    expect(pipe).toBeTruthy();
  });
});
