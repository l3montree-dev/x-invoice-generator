import Transformer from '../../app/services/Transformer';
import { Invoice } from '../../app/lib/x-invoice/types';

describe('Transformer test suite', () => {
  describe('Transformer#object2Invoice', () => {
    it('should create a simple object, when providing a key without a dot', () => {
      expect(Transformer.object2Invoice({ TestKey: 'foo' })).toEqual({
        TestKey: 'foo',
      });
    });
    it('should create a nested object, when a dot is provided in the key', () => {
      expect(Transformer.object2Invoice({ 'Foo.Bar': 'foo' })).toEqual({
        Foo: {
          Bar: 'foo',
        },
      });
    });
    it('should not overwrite existing keys', () => {
      expect(
        Transformer.object2Invoice({
          'Foo.Bar.CompanyID': 'foo',
          'Foo.Bar.ID': 'bar',
        })
      ).toEqual({
        Foo: {
          Bar: {
            CompanyID: 'foo',
            ID: 'bar',
          },
        },
      });
    });
    it('should not overwrite existing keys (nested objects)', () => {
      expect(
        Transformer.object2Invoice({
          'Foo.Bar.CompanyID.ID': 'foo',
          'Foo.Bar.ID': 'bar',
        })
      ).toEqual({
        Foo: {
          Bar: {
            CompanyID: { ID: 'foo' },
            ID: 'bar',
          },
        },
      });
    });
    it('should handle attributes correctly', () => {
      expect(
        Transformer.object2Invoice({
          'Foo@attr': 'foo',
          Foo: 'bar',
        })
      ).toEqual({
        Foo: {
          content: 'bar',
          attributes: {
            attr: 'foo',
          },
        },
      });
    });
    it('should handle attributes correctly - no matter the order', () => {
      expect(
        Transformer.object2Invoice({
          Foo: 'bar',
          'Foo@attr': 'foo',
        })
      ).toEqual({
        Foo: {
          content: 'bar',
          attributes: {
            attr: 'foo',
          },
        },
      });
    });
    it('should calculate the correct totals of an invoice line when object is transformed to Invoice', () => {
      // the correct LineExtensionAmount is 20.
      const testData = {
        InvoiceLine: [
          {
            'Price.PriceAmount': 10,
            'Item.ClassifiedTaxCategory.Percent': 19,
            InvoicedQuantity: 2,
          },
        ],
      };
      const result = Transformer.object2Invoice(testData);
      expect(result.InvoiceLine[0].LineExtensionAmount).toEqual(20);
    });
  });

  describe('Transformer#invoice2Object', () => {
    it('should not alter a one level deep object', () => {
      expect(
        Transformer.invoice2Object(({ test: 'foo' } as unknown) as Invoice)
      ).toEqual({ test: 'foo' });
    });
    it('should not flat a two level deep object', () => {
      expect(
        Transformer.invoice2Object(({
          test: { foo: 'bar' },
        } as unknown) as Invoice)
      ).toEqual({ 'test.foo': 'bar' });
    });
    it('should handle attributes correctly', () => {
      expect(
        Transformer.invoice2Object(({
          test: { content: 'bar', attributes: { foo: 'test' } },
        } as unknown) as Invoice)
      ).toEqual({ test: 'bar', 'test@foo': 'test' });
    });
    it('should handle three deep nested objects correctly (circle complete)', () => {
      expect(
        Transformer.invoice2Object(({
          test: { foo: { bar: 'f' } },
        } as unknown) as Invoice)
      ).toEqual({ 'test.foo.bar': 'f' });
    });
    it('should handle a two level deep complex objects correctly', () => {
      expect(
        Transformer.invoice2Object(({
          test: { foo: 'bar', bar: 'test' },
        } as unknown) as Invoice)
      ).toEqual({ 'test.foo': 'bar', 'test.bar': 'test' });
    });
    it('should not change the behaviour, when seeing an array', () => {
      expect(
        Transformer.invoice2Object(({
          test: { foo: [{ item1: { nested2: 'bar' } }], bar: 'test' },
        } as unknown) as Invoice)
      ).toEqual({
        'test.foo': [{ 'item1.nested2': 'bar' }],
        'test.bar': 'test',
      });
    });
  });
});
