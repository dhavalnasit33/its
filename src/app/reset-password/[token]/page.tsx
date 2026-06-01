'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useRouter, useParams } from 'next/navigation';
import { Eye, EyeOff, CheckCircle2, Loader2, KeyRound, AlertCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import apiService from '@/lib/apiService';

const resetPasswordSchema = z.object({
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string().min(6, { message: 'Confirm password must be at least 6 characters' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const router = useRouter();
  const { token } = useParams();
  const { toast } = useToast();
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit: SubmitHandler<ResetPasswordFormValues> = async (data) => {
    if (!token) {
      toast({
        title: 'Invalid Link',
        description: 'Missing password reset token in URL.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await apiService<{ success: boolean; message: string }>(`/auth-user/reset-password/${token}`, {
        method: 'POST',
        body: JSON.stringify({ password: data.password }),
         headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.success) {
        setIsSuccess(true);
        toast({
          title: 'Success',
          description: res.message || 'Password reset successfully. You can now log in.',
        });
      } else {
        throw new Error(res.message || 'Failed to reset password.');
      }
    } catch (err: any) {
      setIsExpired(true);
      toast({
        title: 'Link Expired',
        description: err.message || 'Your password reset token has expired or is invalid. Please request a new recovery link.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-6">
      <Card className="w-full max-w-md shadow-xl border border-slate-200 bg-card text-card-foreground">
        <CardHeader className="text-center border-0 space-y-2">
          <div className="flex h-16 items-center px-4 sm:px-6 justify-center">
            <Link href="/login" className="flex items-center justify-center">
              <Image
                src="/Main_logoW 1.png"
                alt="OneChat AI Logo"
                width={100}
                height={50}
                className="object-contain"
                style={{ height: 'auto' }}
              />
            </Link>
          </div>
          <CardTitle className="text-3xl font-headline font-bold tracking-tight text-slate-800">Secure Account Recovery</CardTitle>
          <CardDescription className="text-slate-500">
            Set a new password for your Inspire Techno Solution account
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-6 text-center space-y-5 animate-in fade-in zoom-in duration-300">
              <div className="h-16 w-16 bg-emerald-100 border border-emerald-200 text-emerald-600 rounded-full flex items-center justify-center shadow-inner">
                <CheckCircle2 className="h-10 w-10 animate-bounce" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-800">Password Reset Completed</h3>
                <p className="text-sm text-slate-500 max-w-sm">
                  Your new password has been successfully configured. You can now use it to sign in to the administrative panel.
                </p>
              </div>
              <Button
                onClick={() => router.push('/login')}
                className="w-full mt-4 bg-primary hover:bg-primary/95 text-primary-foreground font-semibold py-6 transition-all duration-200 shadow-md"
              >
                Proceed to Sign In
              </Button>
            </div>
          ) : isExpired ? (
            <div className="flex flex-col items-center justify-center py-6 text-center space-y-5 animate-in fade-in zoom-in duration-300">
              <div className="h-16 w-16 bg-red-100 border border-red-200 text-red-600 rounded-full flex items-center justify-center shadow-inner">
                <AlertCircle className="h-10 w-10 text-red-600 animate-pulse" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-800">Link Expired or Invalid</h3>
                <p className="text-sm text-slate-500 max-w-sm">
                  This recovery link is invalid or has expired. Password reset links expire automatically after 15 minutes for your security. Please request a new recovery link.
                </p>
              </div>
              <Button
                onClick={() => router.push('/login')}
                className="w-full mt-4 bg-red-600 hover:bg-red-500 text-white font-semibold py-6 transition-all duration-200 shadow-md animate-pulse"
              >
                Back to Login Screen
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-semibold text-slate-700">New Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            className="bg-background border-slate-200 focus:border-primary text-foreground pr-10"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs mt-1" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-sm font-semibold text-slate-700">Confirm New Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            className="bg-background border-slate-200 focus:border-primary text-foreground pr-10"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            <span className="sr-only">{showConfirmPassword ? 'Hide password' : 'Show password'}</span>
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs mt-1" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full font-semibold flex items-center justify-center gap-2 py-6 mt-6 transition-all duration-200 shadow-sm"
                  disabled={isSubmitting || form.formState.isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Updating Password...
                    </>
                  ) : (
                    <>
                      <KeyRound className="h-4 w-4" />
                      Reset Password
                    </>
                  )}
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
      <div className="mt-8 text-center space-y-2">
        <Link href="/login" className="text-sm font-medium text-slate-500 hover:underline hover:text-slate-800">
          Back to Sign In
        </Link>
        <p className="text-xs text-slate-400">
          Powered by Inspire Techno Solution
        </p>
      </div>
    </div>
  );
}
