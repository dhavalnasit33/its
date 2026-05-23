'use client';

import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import apiService from "@/lib/apiService";
import ImageUpload from "@/components/ui/imagupload";
import { 
  User as UserIcon, 
  Mail, 
  Lock, 
  Shield, 
  Eye, 
  EyeOff, 
  Save, 
  Key, 
  Calendar, 
  Clock,
  Loader2,
  Camera
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function ProfilePage() {
  const auth = useContext(AuthContext);
  const { toast } = useToast();

  if (!auth) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const { user, fetchCurrentUser } = auth;

  // Active Tab
  const [activeTab, setActiveTab] = useState<'info' | 'security'>('info');

  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  // Password states
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Visibility states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Loading states
  const [isUpdatingInfo, setIsUpdatingInfo] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  // Populate state when user loads
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmail(user.email || "");
      setProfilePicture(user.profile_picture || "");
    }
  }, [user]);

  const handleUpdateInfo = async (e: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      toast({
        title: "Validation Error",
        description: "First name, last name, and email are required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsUpdatingInfo(true);
    try {
      const res = await apiService<{
        success: boolean;
        message: string;
        user: any;
      }>('/auth-user/update', {
        method: 'PUT',
        body: {
          firstName,
          lastName,
          email,
          profile_picture: profilePicture,
        } as any,
      });

      if (res.success) {
        toast({
          title: "Profile Updated",
          description: "Your personal information has been saved successfully.",
        });
        await fetchCurrentUser();
      } else {
        throw new Error(res.message || "Failed to update profile");
      }
    } catch (err: any) {
      toast({
        title: "Update Failed",
        description: err.message || "Failed to save profile changes.",
        variant: "destructive",
      });
    } finally {
      setIsUpdatingInfo(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      toast({
        title: "Validation Error",
        description: "Password field cannot be empty.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Validation Error",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Validation Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    setIsUpdatingPassword(true);
    try {
      const res = await apiService<{
        success: boolean;
        message: string;
      }>('/auth-user/update', {
        method: 'PUT',
        body: {
          password,
        } as any,
      });

      if (res.success) {
        toast({
          title: "Password Changed",
          description: "Your password has been successfully updated.",
        });
        setPassword("");
        setConfirmPassword("");
      } else {
        throw new Error(res.message || "Failed to update password");
      }
    } catch (err: any) {
      toast({
        title: "Update Failed",
        description: err.message || "Failed to change password.",
        variant: "destructive",
      });
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const formatDate = (dateString?: string | Date) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString?: string | Date) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="container mx-auto pb-10 space-y-6">
      <PageHeader
        title="Account Profile"
        description="View and update your administrator account details"
      />

      <div className="grid grid-cols-12 gap-6">
        {/* Left Column: User Summary Card */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <Card className="overflow-hidden border border-gray-100 shadow-lg bg-white/70 backdrop-blur-md rounded-2xl">
            {/* Decorative Header Block */}
            <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700 relative flex items-end justify-center">
              <div className="absolute -bottom-12">
                <Avatar className="h-24 w-24 border-4 border-white shadow-xl bg-gray-100">
                  {profilePicture && <AvatarImage src={profilePicture} className="object-cover" />}
                  <AvatarFallback className="text-3xl font-semibold bg-blue-100 text-blue-800 flex items-center justify-center">
                    {firstName ? firstName[0].toUpperCase() : ""}
                    {lastName ? lastName[0].toUpperCase() : ""}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>

            <CardContent className="pt-16 pb-6 text-center space-y-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {firstName} {lastName}
                </h2>
                <p className="text-sm text-gray-500 flex items-center justify-center gap-1 mt-1">
                  <Mail className="h-3.5 w-3.5" />
                  {email}
                </p>
              </div>

              <div className="flex justify-center gap-2">
                <Badge className="bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                  <Shield className="h-3 w-3" />
                  Administrator
                </Badge>
              </div>

              <div className="border-t border-gray-100 pt-4 mt-4 space-y-2 text-left text-sm text-gray-600">
                <div className="flex justify-between items-center py-1">
                  <span className="flex items-center gap-1.5 text-gray-400">
                    <Calendar className="h-4 w-4" />
                    Member since:
                  </span>
                  <span className="font-medium text-gray-700">
                    {formatDate(user?.createdAt)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="flex items-center gap-1.5 text-gray-400">
                    <Clock className="h-4 w-4" />
                    Last login:
                  </span>
                  <span className="font-medium text-gray-700 text-right">
                    {formatDate(user?.lastLogin)} <br />
                    <span className="text-xs text-gray-400">
                      at {formatTime(user?.lastLogin)}
                    </span>
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Picture Upload Card */}
          <Card className="border border-gray-100 shadow-lg bg-white/70 backdrop-blur-md rounded-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Camera className="h-4 w-4 text-blue-600" />
                Profile Image
              </CardTitle>
              <CardDescription>
                Upload a custom photo for your user profile
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center pb-6">
              <ImageUpload
                value={profilePicture}
                onChange={setProfilePicture}
                className="h-[180px] w-[180px] rounded-full object-cover"
              />
              {profilePicture !== (user?.profile_picture || "") && (
                <Button 
                  onClick={() => handleUpdateInfo(undefined as any)}
                  disabled={isUpdatingInfo}
                  className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center justify-center gap-1.5"
                >
                  {isUpdatingInfo ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  Save New Image
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Tabbed Forms */}
        <div className="col-span-12 lg:col-span-8">
          <div className="bg-white/75 backdrop-blur-md rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {/* custom beautiful tab headers */}
            <div className="flex border-b border-gray-100 bg-gray-50/50 p-2">
              <button
                onClick={() => setActiveTab('info')}
                className={`flex-1 sm:flex-initial py-2.5 px-6 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 ${
                  activeTab === 'info'
                    ? "bg-white text-blue-600 shadow-sm border border-gray-100"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-100/50"
                }`}
              >
                <UserIcon className="h-4 w-4" />
                Personal Info
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`flex-1 sm:flex-initial py-2.5 px-6 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 ${
                  activeTab === 'security'
                    ? "bg-white text-blue-600 shadow-sm border border-gray-100"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-100/50"
                }`}
              >
                <Key className="h-4 w-4" />
                Password & Security
              </button>
            </div>

            <CardContent className="p-6">
              {activeTab === 'info' ? (
                <form onSubmit={handleUpdateInfo} className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>
                    <p className="text-sm text-gray-500">
                      Update your account's public name and contact details.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-sm font-semibold text-gray-700">First Name</Label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="firstName"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="First Name"
                          className="pl-10 h-10 border-gray-200 focus:ring-blue-500 rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm font-semibold text-gray-700">Last Name</Label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="lastName"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Last Name"
                          className="pl-10 h-10 border-gray-200 focus:ring-blue-500 rounded-lg"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold text-gray-700">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@example.com"
                        className="pl-10 h-10 border-gray-200 focus:ring-blue-500 rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4 border-t border-gray-100">
                    <Button
                      type="submit"
                      disabled={isUpdatingInfo}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-2 px-6 rounded-lg h-11 transition-all"
                    >
                      {isUpdatingInfo ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Saving Changes...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4" />
                          Save Details
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleUpdatePassword} className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-gray-900">Change Password</h3>
                    <p className="text-sm text-gray-500">
                      Ensure your account remains highly secure by updating your password.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword" className="text-sm font-semibold text-gray-700">New Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="newPassword"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="pl-10 pr-10 h-10 border-gray-200 focus:ring-blue-500 rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700">Confirm New Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          className="pl-10 pr-10 h-10 border-gray-200 focus:ring-blue-500 rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4 border-t border-gray-100">
                    <Button
                      type="submit"
                      disabled={isUpdatingPassword}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-2 px-6 rounded-lg h-11 transition-all"
                    >
                      {isUpdatingPassword ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Updating Password...
                        </>
                      ) : (
                        <>
                          <Key className="h-4 w-4" />
                          Update Password
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </div>
        </div>
      </div>
    </div>
  );
}
