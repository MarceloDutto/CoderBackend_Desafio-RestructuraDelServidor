const goToCartButton = document.querySelector(".goToCartButton");
const btn_addToCart = document.querySelectorAll(".cartButton");

const cartId = goToCartButton.getAttribute("id");
goToCartButton.setAttribute("href", `/cart/${cartId}`);

btn_addToCart.forEach(btn => {
    btn.addEventListener('click', e => {
        e.preventDefault();
        const eventId = btn.getAttribute("id");
        addToCart(eventId);
    })
});

const addToCart = async (pid) => {
    try {
        const url = `/api/carts/${cartId}/product/${pid}`;
        const headers = {
            'Content-Type': 'application/json'
        }
        const method = 'POST';
        
        await fetch(
            url, {
                headers,
                method
            });
    } catch (error) {
        console.log(error);
    }
} 