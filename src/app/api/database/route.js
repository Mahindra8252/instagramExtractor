import { NextResponse } from "next/server";
import UserService from "../../../lib/UserService";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');
    
    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }


    const userData = await UserService.getUserData(username);
    
    if (userData) {
      return NextResponse.json({
        success: true,
        fromCache: true,
        data: userData
      });
    } else {
      return NextResponse.json({
        success: false,
        fromCache: false,
        message: "User not found in database"
      });
    }
    
  } catch (error) {
    console.error(" Database GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch user data from database" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { username, userData } = await request.json();
    
    if (!username || !userData) {
      return NextResponse.json(
        { error: "Username and userData are required" },
        { status: 400 }
      );
    }

    // Save user data to database
    const savedUser = await UserService.saveUserData(username, userData);
    
    return NextResponse.json({
      success: true,
      message: "User data saved successfully",
      user: {
        username: savedUser.username,
        createdAt: savedUser.createdAt,
        updatedAt: savedUser.updatedAt
      }
    });
    
  } catch (error) {
    console.error("❌ Database POST error:", error);
    return NextResponse.json(
      { error: "Failed to save user data to database" },
      { status: 500 }
    );
  }
}