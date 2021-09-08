const { sum } = require('./calculator');

it('should sum 2 and 2 result must be 4', () => {
    expect(sum(2,2) ).toBe(4);
});

it('should sum 2 and 2 even if one them is a string 4', () => {
    expect(sum('2','2') ).toBe(4);
});

it('should throw an error provided to the method', () => {
    expect(() => {
        sum('','2');
    }).toThrowError();

    expect(() => {
        sum([2,2]);
    }).toThrowError();

    expect(() => {
        sum({ });
    }).toThrowError();

    expect(() => {
        sum();
    }).toThrowError();
});