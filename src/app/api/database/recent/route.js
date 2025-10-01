import { NextResponse } from "next/server";
import User from "../../../../models/User";
import connectDB from "../../../../lib/database/connectDB";

export async function GET(request) {
  try {
    await connectDB();
    
    const recentUsers = await User.find({})
      .sort({ updatedAt: -1 }) 
      .limit(4) 
      .lean();
    
    return NextResponse.json({
      success: true,
      users: recentUsers
    });
    
  } catch (error) {
    console.error("Error fetching recent users:", error);
    return NextResponse.json(
      { 
        success: false,
        error: "Failed to fetch recent users",
        users: []
      },
      { status: 500 }
    );
  }
}