import Transformer from '../../app/services/Transformer';

describe('Transformer test suite', () => {
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
});
