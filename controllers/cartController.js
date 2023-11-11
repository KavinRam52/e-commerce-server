import Cart from '../models/cart.js';



// add to cart
export const addtoCart = async (req, res) => {
    // console.log(req.body);
    const { userId, productId, quantity } = req.body;
    // console.log(userId, productId, quantity);
    if (!userId || !productId || !quantity) {
        return res.status(400).json({ error: "Missing required data" });
    }

    try {
        // find the user has cart or if not create a new cart
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        const existingItem = cart.items.find((item) => item.productId === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }

        const updatedCart = await cart.save();

        res.status(200).json({ success: true, message: "Product added to the cart successfully", updatedCart: updatedCart });
    } catch (error) {
        res.status(500).json({ success: false, error: "Somthing went wrong!" });
    }
};




// get user cart


export const getCart = async (req, res) => {
    const { userId } = req.params;
    try {
        const cart = await Cart.findOne({ userId }).populate("items.productId");
        res.status(200).json({ success: true, message: "Cart items Found", cart: cart });

    } catch (error) {
        res.status(500).json({ success: false, error: "Somthing went wrong!" });
    }

};








export const updateCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        let cart = await Cart.findOne({ userId });

        if (cart) {
            // cart exists for user
            let itemIndex = cart.items.findIndex(p => p.productId == productId);

            if (itemIndex > -1) {
                // product exists in the cart, update the quantity
                let productItem = cart.items[itemIndex];
                productItem.quantity = quantity;
                cart.items[itemIndex] = productItem;
            } else {
                // product does not exist in cart, add new item
                cart.items.push({ productId, quantity });
            }
            cart = await cart.save();
            return res.status(201).send(cart);
        } else {
            // no cart for user, create new cart
            const newCart = await Cart.create({
                userId,
                items: [{ productId, quantity }]
            });

            return res.status(201).send(newCart);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
};


// delete single item

export const deleteCart = async (req, res) => {
    const itemId = req.params.itemId;


    try {
        const cart = await Cart.findOneAndUpdate(
            { "items._id": itemId },
            { $pull: { items: { _id: itemId } } },
            { new: true }
        ).populate("items.productId");

        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: "An error occurred" });
    }
};








export const deleteCartForUser = async (req, res) => {
    const userId = req.params.userId;

    try {
        const userCart = await Cart.findOne({ userId });

        if (!userCart) {
            return res.status(404).json({ error: "Cart not found" });
        }

        // Assuming 'items' is an array in your Cart model
        userCart.items = [];
        await userCart.save();

        res.json({ message: "Cart emptied successfully" });
    } catch (error) {
        res
            .status(500)
            .json({ error: "An error occurred while emptying the cart" });
    }
};

