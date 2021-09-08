const { queryString } = require('./queryString');

describe('Object to query string', () => {
    
    it('should create a valid query string when an object', () => {
        const obj = {
            name: 'Lucas',
            profession: 'developer',
        };

        expect(queryString(obj)).toBe(
            'name=Lucas&profession=developer'
        );
    });
});