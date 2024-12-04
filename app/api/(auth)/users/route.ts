import connect from "@/lib/db";
import User from "@/lib/models/users";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connect();

    const users = await User.find();

    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new NextResponse("Database connection failed", { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    await connect();

    const { name, email, password } = await req.json();

    const user = new User({ name, email, password });
    await user.save();

    return new NextResponse(
      JSON.stringify({ message: "User created successfully", user }),
      { status: 201 }
    );
  } catch (error) {
    return new NextResponse("Database connection failed", { status: 500 });
  }
};

export const DELETE = async (req: Request) => {
  try {
    await connect();
    const { id } = await req.json();
    await User.findByIdAndDelete(id);
    return new NextResponse("User deleted successfully", { status: 200 });
  } catch (error) {
    return new NextResponse("Database connection failed", { status: 500 });
  }
};
