'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useAuth as useAuthentication } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, CheckCircle2, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import apiService from '@/lib/apiService';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function LoginPage() {
  const { login, loading: authLoading, isAuthenticated } = useAuthentication();
  const router = useRouter();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const forgotForm = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      console.error('Login page onSubmit catch:', error);
    }
  };

  const onForgotPasswordSubmit: SubmitHandler<ForgotPasswordFormValues> = async (data) => {
    setForgotLoading(true);
    setForgotSuccess(false);
    try {
      const res = await apiService<{ success: boolean; message: string }>('/auth-user/forgot-password', {
        method: 'POST',
        body: JSON.stringify(data),
         headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.success) {
        setForgotSuccess(true);
        toast({
          title: 'Email Sent',
          description: res.message || 'If an account exists, a reset link has been sent.',
        });
      } else {
        throw new Error(res.message || 'Something went wrong.');
      }
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.message || 'Failed to request password reset.',
        variant: 'destructive',
      });
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-6">
      <Card className="w-full max-w-md shadow-xl border border-slate-200 bg-card text-card-foreground">
        <CardHeader className="text-center border-0">
          <div className="flex h-16 items-center px-4 sm:px-6 justify-center">
            <Link href="/dashboard" className="flex items-center justify-center w-full">
              <Image
                src="/Main_logoW 1.png"
                alt="OneChat AI Logo"
                width={100} height={50}
                className="object-contain"
                style={{ height: 'auto' }}
              />
            </Link>
          </div>
          <CardTitle className="text-3xl font-headline font-bold tracking-tight text-slate-800">
            {isForgotPassword ? 'Reset Password' : 'Inspire Techno Solution'}
          </CardTitle>
          <CardDescription className="text-slate-500">
            {isForgotPassword 
              ? 'Enter your email address and we will send you a recovery link' 
              : 'Sign in to access your dashboard'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isForgotPassword ? (
            forgotSuccess ? (
              <div className="flex flex-col items-center justify-center py-6 text-center space-y-5 animate-in fade-in zoom-in duration-300">
                <div className="h-16 w-16 bg-emerald-100 border border-emerald-200 text-emerald-600 rounded-full flex items-center justify-center shadow-inner">
                  <CheckCircle2 className="h-10 w-10 animate-bounce" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-800">Recovery Link Dispatched</h3>
                  <p className="text-sm text-slate-500 max-w-sm">
                    If an account is associated with that email, we have sent a secure link to reset your password. Please check your inbox.
                  </p>
                </div>
                <Button 
                  onClick={() => {
                    setIsForgotPassword(false);
                    setForgotSuccess(false);
                    forgotForm.reset();
                  }} 
                  className="w-full mt-4 bg-primary hover:bg-primary/95 text-primary-foreground font-semibold py-6 transition-all duration-200 shadow-md"
                >
                  Back to Sign In
                </Button>
              </div>
            ) : (
              <Form {...forgotForm} key="forgot-form">
                <form onSubmit={forgotForm.handleSubmit(onForgotPasswordSubmit)} className="space-y-6">
                  <FormField
                    control={forgotForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-slate-700">Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="you@example.com" 
                            className="bg-background border-slate-200 focus:border-primary text-foreground"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="text-red-600 text-sm mt-1" />
                      </FormItem>
                    )}
                  />
                  <div className="space-y-3">
                    <Button 
                      type="submit" 
                      className="w-full font-semibold flex items-center justify-center gap-2 py-6 shadow-sm"
                      disabled={forgotLoading}
                    >
                      {forgotLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending Link...
                        </>
                      ) : (
                        'Send Reset Link'
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => {
                        setIsForgotPassword(false);
                        forgotForm.reset();
                      }}
                      className="w-full text-slate-500 hover:text-slate-800 text-sm font-semibold hover:bg-slate-50"
                    >
                      Back to Sign In
                    </Button>
                  </div>
                </form>
              </Form>
            )
          ) : (
            <Form {...form} key="login-form">
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-slate-700">Email Address</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="you@example.com" 
                          className="bg-background border-slate-200 focus:border-primary text-foreground"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-red-600 text-sm mt-1" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-sm font-semibold text-slate-700">Password</FormLabel>
                        <button
                          type="button"
                          onClick={() => {
                            setIsForgotPassword(true);
                            setForgotSuccess(false);
                            forgotForm.reset();
                          }}
                          className="text-xs font-semibold text-primary hover:underline hover:text-primary/80 cursor-pointer transition-colors duration-200"
                        >
                          Forgot password?
                        </button>
                      </div>
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
                            className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-600 text-sm mt-1" />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full font-semibold py-6 shadow-sm" 
                  disabled={authLoading || form.formState.isSubmitting}
                >
                  {authLoading || form.formState.isSubmitting ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Powered by Inspire Techno Solution
      </p>
    </div>
  );
}
