const product = [
    {
        id: 0,
        image: 'bowl.jpg',
        title: 'Bowl',
        price: 120,
    },
    {
        id: 1,
        image: 'briej.jpg',
        title: 'Brief',
        price: 60,
    },
    {
        id: 2,
        image: 'calvin-klein.jpg',
        title: 'Panty',
        price: 230,
    },
    {
        id: 3,
        image: 'shoes.jpg',
        title: 'Shoes',
        price: 100,
    },
    {
        id: 4,
        image: 'are.jpg',
        title: 'Avocado',
        price: 100,
    },
    {
        id: 5,
        image: 't.jpg',
        title: 'Polo shirt',
        price: 100,
    },
    
];
const categories = [...new Set(product.map((item)=>
    {return item}))]
    let i=0;
document.getElementById('root').innerHTML = categories.map((item)=>
{
    var {image, title, price} = item;
    return(
        `<div class='box'>
            <div class='img-box'>
                <img class='images' src=${image}></img>
            </div>
        <div class='bottom'>
        <p>${title}</p>
        <h2>$ ${price}.00</h2>`+
        "<button onclick='addtocart("+(i++)+")'>Add to cart</button>"+
        `</div>
        </div>`
    )
}).join('')

var cart =[];

function addtocart(a){
    cart.push({...categories[a]});
    displaycart();
}
function delElement(a){
    cart.splice(a, 1);
    displaycart();
}

function checkout() {
        if (cart.length === 0) {
            alert("Your cart is empty. Add some items before checking out!");
        } else {
            // You can customize the checkout logic here
            let confirmation = confirm("Do you want to proceed with the checkout?");
            
            if (confirmation) {
                alert("Checkout successful! Thank you for shopping!");
                // You may want to perform additional actions here, like clearing the cart
                cart = [];
                displaycart(); // Update the cart display
            } else {
                alert("Checkout canceled. Continue shopping!");
            }
        }
    }


    function searchProducts() {
                const searchInput = document.getElementById('searchInput').value.toLowerCase();
                const filteredProducts = product.filter(item => {
                    return item.title.toLowerCase().includes(searchInput);
                });
                document.getElementById('root').innerHTML = filteredProducts.map((item) => {
                    return (
                        `<div class='box'>
                            <div class='img-box'>
                                <img class='images' src=${item.image}></img>
                            </div>
                            <div class='bottom'>
                                <p>${item.title}</p>
                                <h2>$ ${item.price}.00</h2>
                                <button onclick='addtocart(${item.id})'>cart</button>
                            </div>
                        </div>`
                    );
                }).join('');
            }


            function displaycart() {
                let cartCount = {};
                let total = 0;
            
                // Count occurrences of each product in the cart
                cart.forEach(item => {
                    if (!cartCount[item.id]) {
                        cartCount[item.id] = { ...item, quantity: 0 };
                    }
                    cartCount[item.id].quantity += 1;
                    total += item.price;
                });
            
                // Display the cart content with quantities
                document.getElementById("count").innerHTML = Object.keys(cartCount).length;
            
                if (cart.length === 0) {
                    document.getElementById('cartItem').innerHTML = "Your cart is empty";
                    document.getElementById("total").innerHTML = "$ 0.00";
                } else {
                    document.getElementById("cartItem").innerHTML = Object.values(cartCount).map(item => {
                        return (
                            `<div class='cart-item'>
                                <div class='row-img'>
                                    <img class='rowimg' src=${item.image}>
                                </div>
                                <p style='font-size:12px;'>${item.title} (Qty: ${item.quantity})</p>
                                <h2 style='font-size: 15px;'>$ ${item.price * item.quantity}.00</h2>
                                <div>
                                    <button class='delete-btn' onclick='delElement(${item.id})'>Delete</button>
                                </div>
                            </div>`
                        );
                    }).join('');
            
                    document.getElementById("total").innerHTML = "$ " + total.toFixed(2);
                }
            }
            function delElement(id) {
                const index = cart.findIndex(item => item.id === id);
            
                if (index !== -1) {
                    // If the item is in the cart
                    if (cart[index].quantity > 1) {
                        // If the quantity is greater than 1, decrease the quantity
                        cart[index].quantity -= 1;
                    } else {
                        // If the quantity is 1, remove the item from the cart
                        cart.splice(index, 1);
                    }
            
                    // Update the cart display
                    displaycart();
                }
            }
            
            
    
    document.getElementById('root').innerHTML = categories.map((item, index) => {
    var { image, title, price } = item;
    return (
      `<div class='box'>
        <div class='img-box'>
          <img class='images' src=${image}></img>
        </div>
        <div class='bottom'>
          <p>${title}</p>
          <h2>$ ${price}.00</h2>
          <button onclick='addtocart(${index})'>cart</button>
        </div>
      </div>`
    );
  }).join('');
