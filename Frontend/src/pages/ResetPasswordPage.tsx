import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast"; // Fixed import based on common shadcn patterns
import axios from "axios";

const ResetPasswordPage: React.FC = () => {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // 1️⃣ Extract ONLY the UUID from the URL on component mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenFromUrl = params.get("token");

    if (tokenFromUrl) {
      // If the tokenFromUrl accidentally contains the whole URL (due to double encoding)
      // we clean it to get only the last part
      const cleanToken = tokenFromUrl.includes("token=") 
        ? tokenFromUrl.split("token=").pop() 
        : tokenFromUrl;

      setToken(cleanToken || "");
      console.log("Token initialized:", cleanToken);
    } else {
      toast({
        title: "Invalid link",
        description: "No token found in the reset link. Please request a new one.",
        variant: "destructive",
      });
    }
  }, [toast]);

  // 2️⃣ Handle password reset
  const handleResetPassword = async () => {
    // Basic Validations
    if (!token) {
      toast({ title: "Error", description: "Missing reset token.", variant: "destructive" });
      return;
    }
    if (!newPassword || !confirmPassword) {
      toast({ title: "Error", description: "Please fill both password fields", variant: "destructive" });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast({ title: "Error", description: "Passwords do not match", variant: "destructive" });
      return;
    }
    if (newPassword.length < 6) {
      toast({ title: "Error", description: "Password must be at least 6 characters", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      // Sending token as Query Param and newPassword in JSON Body
      const response = await axios.put(
        `import.meta.env.VITE_API_BASE_URL/api/auth/reset-password?token=${token}`,
        { newPassword }
      );

      toast({ 
        title: "Success", 
        description: response.data.message || "Password reset successfully!" 
      });

      // Redirect to login after success
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);

    } catch (err: any) {
      console.error("Reset Error:", err);
      toast({
        title: "Reset Failed",
        description: err.response?.data?.error || "Invalid or expired token. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="p-8 bg-white rounded-xl shadow-md w-full max-w-sm border border-gray-100">
        <h2 className="text-2xl font-bold mb-2 text-center text-gray-800">New Password</h2>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Please enter your new secure password below.
        </p>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">New Password</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Confirm Password</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1"
            />
          </div>

          <Button 
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white" 
            onClick={handleResetPassword} 
            disabled={loading || !token}
          >
            {loading ? "Updating..." : "Reset Password"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;