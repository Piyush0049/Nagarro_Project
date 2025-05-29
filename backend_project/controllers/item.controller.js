import { FoodItem } from "../models/item.model"

export const getItem = async (req, res)=>{
    try{
        await FoodItem.find();
        return res.status(200).json({
            message: "Items fetched successfully",
            success: true,
            data: items
        });
    }catch(e){
        console.error(e);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

// 1. Filter by tags only
export const getItemsByTag = async (req, res) => {
  try {
    let { tags } = req.query;

    if (!tags) {
      return res.status(400).json({
        message: "No tags provided",
        success: false,
      });
    }

    const tagsArray = tags.split(",").map(tag => tag.trim().toLowerCase());

    const items = await FoodItem.find({
      productTag: { $all: tagsArray }, // all tags must be present
    });

    return res.status(200).json({
      message: "Items filtered by tags fetched successfully",
      success: true,
      data: items,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// 2. Filter by category only
export const getItemsByCategory = async (req, res) => {
  try {
    let { categories } = req.query;

    if (!categories) {
      return res.status(400).json({
        message: "No categories provided",
        success: false,
      });
    }

    const categoriesArray = categories.split(",").map(cat => cat.trim().toLowerCase());

    const items = await FoodItem.find({
      category: { $all: categoriesArray }, // all categories must be present
    });

    return res.status(200).json({
      message: "Items filtered by categories fetched successfully",
      success: true,
      data: items,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// 3. Filter by both tags and categories
export const getItemsByTagAndCategory = async (req, res) => {
  try {
    let { tags, categories } = req.query;

    if (!tags || !categories) {
      return res.status(400).json({
        message: "Both tags and categories must be provided",
        success: false,
      });
    }

    const tagsArray = tags.split(",").map(t => t.trim().toLowerCase());
    const categoriesArray = categories.split(",").map(c => c.trim().toLowerCase());

    const items = await FoodItem.find({
      productTag: { $all: tagsArray },
      category: { $all: categoriesArray },
    });

    return res.status(200).json({
      message: "Items filtered by tags and categories fetched successfully",
      success: true,
      data: items,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

