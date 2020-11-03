import XInvoiceNumberTag from '../XInvoiceNumberTag';

describe('XInvoice Generation test suite', () => {
  it('should transform a single XInvoice tag to the correct XML tag representation', () => {
    const tag = new XInvoiceNumberTag(380);
    expect(tag.toXMLTag('StartDate')).toEqual(
      '<cbc:StartDate>380</cbc:StartDate>'
    );
  });
  it('should add all passed attributes to the XML tag', () => {
    const tag = new XInvoiceNumberTag<{ format: string }>(380, {
      attributes: { format: 'YYYY-MM-DD' },
    });
    expect(tag.toXMLTag('StartDate')).toEqual(
      '<cbc:StartDate format="YYYY-MM-DD">380</cbc:StartDate>'
    );
  });
});
