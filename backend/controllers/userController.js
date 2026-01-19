import User from "../models/User.js";
import Purchase from "../models/Purchase.js";

export const updateProfile = async (req, res) => {
  try {
    const { name, phone, address } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name ?? user.name;
    user.phone = phone ?? user.phone;
    user.address = address ?? user.address;

    await user.save();

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update profile" });
  }
};

export const getMyPlans = async (req, res) => {
  try {
    // FIX: Changed req.user._id to req.user.id to match your middleware
    const userId = req.user.id; 

    const purchases = await Purchase.find({ user: userId })
      .populate("plan")
      .sort({ createdAt: -1 });

    const today = new Date();

    for (let purchase of purchases) {
      if (purchase.endDate < today && purchase.status === "active") {
        purchase.status = "expired";
        await purchase.save();
      }
    }

    res.json({
      success: true,
      plans: purchases
    });
  } catch (error) {
    console.error("My plans error:", error);
    res.status(500).json({ message: "Failed to fetch plans" });
  }
};