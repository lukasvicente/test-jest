import Cart from './Cart';

describe('Cart', () => {
    let cart;
    let product = {
        title: 'Adidas runnin shoes - men',
        price: 35388,
    };

    let product2 = {
        title: 'Adidas runnin shoes - women',
        price: 41872,
    };

    beforeEach(() => {
        cart = new Cart();
    })

    describe('getTotal()', () => {
 
        it('should return 0 when getTotal() is executed in a newly created', () => {
            expect(cart.getTotal().getAmount()).toEqual(0);
        });

        it('should multiply quantityand price and receive total amount', () => {
            
            const item = {
                product: {
                    title: 'Adidas runnin shoes - me',
                    price: 35388,
                },
            quantity:2
            }

            cart.add(item);
            expect(cart.getTotal().getAmount()).toEqual(70776)
        });

        it('should ensure no more than on product exists at a time', () => {
            
            cart.add({
                product,
                quantity: 2
            });

            cart.add({
                product,
                quantity: 2
            });
            expect(cart.getTotal().getAmount()).toEqual(70776)
        });

        it('should update total when a product gets included and then remove', () => {
            cart.add({
                product,
                quantity: 2
            });

            cart.add({
                product : product2,
                quantity: 1
            });
            
            cart.remove(product)
            expect(cart.getTotal().getAmount()).toEqual(41872)
        });
    });

    describe('checkout()', () => {

        it('should should return an object the total and the list of itms', () => {
            cart.add({
                product,
                quantity: 2
            });

            cart.add({
                product : product2,
                quantity: 3
            });
            
             
            expect(cart.checkout()).toMatchInlineSnapshot(`
Object {
  "items": Array [
    Object {
      "product": Object {
        "price": 35388,
        "title": "Adidas runnin shoes - men",
      },
      "quantity": 2,
    },
    Object {
      "product": Object {
        "price": 41872,
        "title": "Adidas runnin shoes - women",
      },
      "quantity": 3,
    },
  ],
  "total": 196392,
}
`);
        });

        it('should reset the cart when checkout() is called ', () => {
            
            cart.add({
                product: product2,
                quantity: 3,
            });

            cart.checkout();

            expect(cart.getTotal().getAmount()).toEqual(0) 
        });

        it('should return an object with the total ', () => {
            
            cart.add({
                product,
                quantity: 5,
            });

            cart.add({
                product: product2,
                quantity: 3,
            });

 
            expect(cart.sumary()).toMatchSnapshot();
            expect(cart.getTotal().getAmount()).toBeGreaterThan(0) 
        });
        

        it('should include formatted amount in the sumary', () => {
             
            cart.add({
                product,
                quantity: 5,
            });

            cart.add({
                product: product2,
                quantity: 3,
            });
            
             
            expect(cart.sumary().formatted).toEqual('R$3,025.56');
 
        });
    });

    describe('special conditions', () => {
        it('should apply parcentage discount', () => {
            const condition = {
                percentage: 30,
                minimum:2,
            }

            cart.add({
                product,
                condition, 
                quantity: 3,
            })

            expect(cart.getTotal().getAmount()).toEqual(74315);
            
        });

        it('should not apply parcentage discount quantity is below', () => {
            const condition = {
                percentage: 30,
                minimum:2,
            }

            cart.add({
                product,
                condition, 
                quantity: 2,
            })

            expect(cart.getTotal().getAmount()).toEqual(70776);
            
        });

        it('should apply quantity  for even quantities', () => {
            
            const condition = {
                quantity: 2,
            }

            cart.add({
                product,
                condition, 
                quantity: 4,
            })

            expect(cart.getTotal().getAmount()).toEqual(70776);

        });

        it('should not apply quantity discount for even quantities', () => {
            
            const condition = {
                quantity: 2,
            }

            cart.add({
                product,
                condition, 
                quantity: 1,
            })

            expect(cart.getTotal().getAmount()).toEqual(35388);

        });

        it('should apply quantity discount for odd quantities', () => {
            const condition = {
                quantity: 2,
            }

            cart.add({
                product,
                condition, 
                quantity: 5,
            })

            expect(cart.getTotal().getAmount()).toEqual(106164);

      
        });

        it('should receive two or more conditions and determine/apply the best discount. first case', () => {
            const condition1 = {
                percentage: 30,
                minimum:2,
            }

            const condition2 = {
                quantity: 2
            }

            cart.add({
                product,
                condition : [condition1, condition2], 
                quantity: 5,
            })

            expect(cart.getTotal().getAmount()).toEqual(106164);
        });

        
        it('should receive two or more conditions and determine/apply the best discount. second case', () => {
            const condition1 = {
                percentage: 80,
                minimum:2,
            }

            const condition2 = {
                quantity: 2
            }

            cart.add({
                product,
                condition : [condition1, condition2], 
                quantity: 5,
            })

            expect(cart.getTotal().getAmount()).toEqual(35388);
        });
    });
});