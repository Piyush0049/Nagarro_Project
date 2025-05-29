import { FoodCart } from "../models/cart.model.js";
import { FoodItem } from "../models/item.model.js";
import { FoodOrder } from "../models/order.model.js";
import { FoodUser } from "../models/user.model.js";


export const increaseQuantity = async (req, res) => {
  try {
    const userId = req.id; 
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        message: "Product ID is required",
        success: false,
      });
    }

    const cart = await FoodCart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
        success: false,
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        message: "Product not found in cart",
        success: false,
      });
    }

    cart.items[itemIndex].quantity += 1;

    await cart.save();

    const populatedCart = await cart.populate("items.product");

    return res.status(200).json({
      message: "Quantity increased by 1",
      success: true,
      cart: populatedCart,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};


export const deleteItem = async (req, res) => {
  try {
    const userId = req.id;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        message: "Product ID is required",
        success: false,
      });
    }

    const cart = await FoodCart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
        success: false,
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        message: "Product not found in cart",
        success: false,
      });
    }

    cart.items.splice(itemIndex, 1);

    await cart.save();

    const populatedCart = await cart.populate("items.product");

    return res.status(200).json({
      message: "Item removed from cart",
      success: true,
      cart: populatedCart,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const placeCartOrder = async (req, res) => {
  try {
    const userId = req.id; 

 
    const cart = await FoodCart.findOne({ user: userId }).populate("items.product");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
        success: false,
      });
    }

   
    let totalValue = 0;
    let maxDeliveryTime = 0;

    for (const item of cart.items) {
      const price = item.product.itemPrice || 0;
      const quantity = item.quantity || 1;
      totalValue += price * quantity;

      if (item.product.timeToDeliver > maxDeliveryTime) {
        maxDeliveryTime = item.product.timeToDeliver;
      }
    }
    let user = await FoodUser.findById(userId);
    let div;
    if(user.status === "newbie") div = 20
    else if(user.status === "elite") div = 10
    else if(user.status === "titan") div = 5
    else if(user.status === "legendary") div = 1


    const totalOrderPoints = Math.floor(totalValue / div);


    const orderItems = cart.items.map(i => i.product._id);

    const order = await FoodOrder.create({
      orderItems,
      totalValue,
      totalPoints,
      timeOfOrder: new Date(),
    });

    user.orderHistory.push(order._id);
    user.totalPoints += totalOrderPoints;
    await user.save();

    cart.items = [];
    await cart.save();

    return res.status(201).json({
      message: "Order placed successfully",
      success: true,
      order: {
        id: order._id,
        totalValue,
        totalPoints,
        maxDeliveryTime,
        orderItems,
      },
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const getCartItemQuantities = async (req, res) => {
  try {
    const userId = req.id;

    const cart = await FoodCart.findOne({ user: userId });

    if (!cart || cart.items.length === 0) {
      return res.status(200).json({
        message: "Cart is empty",
        success: true,
        items: [],
      });
    }

    const items = cart.items.map((item) => ({
      productId: item.product,
      quantity: item.quantity,
    }));

    return res.status(200).json({
      message: "Cart item quantities fetched successfully",
      success: true,
      items,
    });
  } catch (error) {
    console.error("Error fetching cart item quantities:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
