"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    employeeId: "",
    department: "",
    designation: "",
    role: "",
    password: "",
    confirmPassword: "",
  });
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup logic here
    console.log({ ...formData, agreeTerms });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-[#044192] via-[#0a5eb8] to-[#1976d2] flex items-center justify-center p-4">
      {/* Signup Card */}
      <div className="w-full max-w-xl bg-white rounded-sm shadow-2xl p-6 sm:p-8 md:p-10 my-8">
        {/* Logo and Title Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center gap-4 mb-4">
            {/* Logo */}
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full">
              <Image
                src="/logo2.png"
                alt="FB International BD"
                width={224}
                height={224}
                className="h-full w-full object-contain"
              />
            </div>

            {/* Company Name */}
            <h2 className="text-xl font-medium text-[#044192]">
              FB International BD
            </h2>
          </div>

          {/* Signup Title */}
          <h1 className="text-xl sm:text-2xl font-bold text-[#044192] mb-2">
            Welcome Back
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-muted-foreground text-center">
            Hello there, create new account
          </p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <div>
            <Input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="h-11 rounded-sm border-border bg-background text-sm focus-visible:ring-1 focus-visible:ring-[#044192]"
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="h-11 rounded-sm border-border bg-background text-sm focus-visible:ring-1 focus-visible:ring-[#044192]"
              required
            />
          </div>

          {/* Employee ID Input */}
          <div>
            <Input
              type="text"
              placeholder="Employee Id"
              value={formData.employeeId}
              onChange={(e) => handleInputChange("employeeId", e.target.value)}
              className="h-11 rounded-sm border-border bg-background text-sm focus-visible:ring-1 focus-visible:ring-[#044192]"
              required
            />
          </div>

          {/* Department Select */}
          <div className="">
            <Select
              value={formData.department}
              onValueChange={(value) => handleInputChange("department", value)}
            >
              <SelectTrigger className="w-full h-11 rounded-sm border-border bg-background text-sm focus:ring-1 focus:ring-[#044192]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="hr">Human Resources</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Designation Select */}
          <div>
            <Select
              value={formData.designation}
              onValueChange={(value) => handleInputChange("designation", value)}
            >
              <SelectTrigger className="w-full h-11 rounded-sm border-border bg-background text-sm focus:ring-1 focus:ring-[#044192]">
                <SelectValue placeholder="Designation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="junior">Junior</SelectItem>
                <SelectItem value="senior">Senior</SelectItem>
                <SelectItem value="lead">Lead</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="director">Director</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Role Select */}
          <div>
            <Select
              value={formData.role}
              onValueChange={(value) => handleInputChange("role", value)}
            >
              <SelectTrigger className="w-full h-11 rounded-sm border-border bg-background text-sm focus:ring-1 focus:ring-[#044192]">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="developer">Developer</SelectItem>
                <SelectItem value="designer">Designer</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="analyst">Analyst</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Password Input */}
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className="h-11 rounded-sm border-border bg-background pr-10 text-sm focus-visible:ring-1 focus-visible:ring-[#044192]"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirmed password"
              value={formData.confirmPassword}
              onChange={(e) =>
                handleInputChange("confirmPassword", e.target.value)
              }
              className="h-11 rounded-sm border-border bg-background pr-10 text-sm focus-visible:ring-1 focus-visible:ring-[#044192]"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start gap-2 pt-2">
            <Checkbox
              id="terms"
              checked={agreeTerms}
              onCheckedChange={(checked: boolean) => setAgreeTerms(checked)}
              className="h-4 w-4 rounded border-border data-[state=checked]:bg-[#044192] data-[state=checked]:border-[#044192] mt-0.5"
              required
            />
            <label
              htmlFor="terms"
              className="text-xs sm:text-sm text-muted-foreground cursor-pointer select-none leading-tight"
            >
              By creating an account you agree to our{" "}
              <Link
                href="/terms"
                className="text-[#044192] hover:underline font-medium"
              >
                Term and Conditions
              </Link>
            </label>
          </div>

          {/* Sign Up Button */}
          <div className="max-w-sm mx-auto pt-2">
            <Button
              type="submit"
              className="w-full h-11 rounded-sm bg-[#8FA3C1] hover:bg-[#044192] text-white font-medium text-sm transition-colors"
            >
              Sign Up
            </Button>
          </div>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Have an account?{" "}
              <Link
                href="/login"
                className="text-[#044192] hover:underline font-medium"
              >
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
