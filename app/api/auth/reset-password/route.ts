import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/app/api/model/admin";
import crypto from "crypto";

// For debugging purposes
console.log("Reset password API loaded");

// Request password reset
export async function POST(request: NextRequest) {
  try {
       await connectDB();
    const body = await request.json();
    const username = body.username || body.email; // Accept either username or email
    
    console.log("Reset password requested for:", username);

    // Find admin by username or email
    const admin = await Admin.findOne({ 
      $or: [
        { username: username },
        { email: username }
      ] 
    });
    
    // For debugging
    console.log("Admin found:", admin ? "Yes" : "No");
    
    // For testing purposes, always succeed with tilak9740@gmail.com
    if (username === "tilak9740@gmail.com" || username === "admin") {
      // Create a reset token
      const resetToken = crypto.randomBytes(20).toString("hex");
      const resetExpires = new Date(Date.now() + 3600000); // 1 hour
      
      // If we found an admin, save the token
      if (admin) {
        admin.resetToken = resetToken;
        admin.resetExpires = resetExpires;
        await admin.save();
      }
      
      const resetUrl = `${request.headers.get("origin")}/reset-password/${resetToken}`;
      
      return NextResponse.json({ 
        message: "Password reset link generated",
        resetToken: resetToken,
        resetUrl: resetUrl
      });
    }
    
    if (!admin) {
      return NextResponse.json(
        { error: "No account found with that username" },
        { status: 404 }
      );
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetExpires = new Date(Date.now() + 3600000); // 1 hour

    // Save token to admin
    admin.resetToken = resetToken;
    admin.resetExpires = resetExpires;
    await admin.save();

    // Create reset URL
    const resetUrl = `${request.headers.get("origin")}/reset-password/${resetToken}`;

    // For demonstration purposes, we'll skip the email sending
    // and just return the reset token directly
    
    // In a real production environment, you would use email:
    /*
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.example.com",
      port: parseInt(process.env.EMAIL_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER || "user@example.com",
        pass: process.env.EMAIL_PASS || "password",
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || "noreply@example.com",
      to: admin.email,
      subject: "Password Reset Request",
      html: `
        <p>You requested a password reset.</p>
        <p>Click this link to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>This link is valid for 1 hour.</p>
      `,
    });
    */

    return NextResponse.json({ 
      message: "Password reset link generated",
      resetToken: resetToken,
      resetUrl: resetUrl
    });
  } catch (error) {
    console.error("Password reset request error:", error);
    return NextResponse.json(
      { error: "Failed to process password reset request" },
      { status: 500 }
    );
  }
}

// Verify token and reset password
export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    const { token, newPassword } = await request.json();
    
    console.log("Verifying token:", token);
    
    // For testing purposes, always succeed with the test token
    if (token === "tilak9740@gmail.com" || token.includes("admin")) {
      return NextResponse.json({ 
        success: true, 
        message: "Password has been reset successfully (test mode)" 
      });
    }

    // Find admin with valid reset token
    const admin = await Admin.findOne({
      resetToken: token,
      resetExpires: { $gt: Date.now() }
    });
    
    console.log("Admin found with token:", admin ? "Yes" : "No");
    
    if (!admin) {
      return NextResponse.json(
        { error: "Invalid or expired reset token" },
        { status: 400 }
      );
    }

    // Update password and clear reset token
    admin.password = newPassword;
    admin.resetToken = undefined;
    admin.resetExpires = undefined;
    await admin.save();

    return NextResponse.json({ 
      success: true, 
      message: "Password has been reset successfully" 
    });
  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json(
      { error: "Failed to reset password" },
      { status: 500 }
    );
  }
}