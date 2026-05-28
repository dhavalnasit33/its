'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Settings, Users, Calendar, BarChart3, TrendingUp } from 'lucide-react';
import PageHeader from "@/components/shared/PageHeader";
import { navItemsList } from "@/components/layout/Sidebar";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types";
import apiService from '@/lib/apiService';
import { Skeleton } from '@/components/ui/skeleton';

// flatten nested children into one array
const flattenNavItems = (items: NavItem[]): NavItem[] => {
  return items.flatMap((item) => {
    if (item.children && item.children.length > 0) {
      return item.children;
    }
    return item;
  });
};

// Smooth 60fps counter animation using requestAnimationFrame
const AnimatedCounter = ({ value, duration = 1200 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (value === 0) {
      setCount(0);
      return;
    }

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(value);
      }
    };
    
    const animationFrame = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [value, duration]);

  return <>{count.toLocaleString()}</>;
};

interface StatsData {
  daily: number;
  weekly: number;
  monthly: number;
  yearly: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // flatten all nav items from Sidebar config
  const allNavItems = flattenNavItems(navItemsList);

  // only include items that are not titles and have valid href
  const accessibleNavItems = allNavItems.filter(
    (item) => !item.isTitle && item.href && item.href !== "/dashboard"
  );

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await apiService<{
          success: boolean;
          data: {
            daily: { count: number }[];
            weekly: { count: number }[];
            monthly: { count: number }[];
            yearly: { count: number }[];
          };
        }>('/enquiries/stats/group');

        if (res.success && res.data) {
          setStats({
            daily: res.data.daily[0]?.count ?? 0,
            weekly: res.data.weekly[0]?.count ?? 0,
            monthly: res.data.monthly[0]?.count ?? 0,
            yearly: res.data.yearly[0]?.count ?? 0,
          });
        }
      } catch (error) {
        console.error("Error loading stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen pb-8">
      <PageHeader title="Dashboard Overview" description="Navigate to key sections quickly." />

      {/* Enquiry Stats Group Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Daily Card */}
        {isLoading ? (
          <Card className="border border-slate-200 shadow-sm border-l-4 border-l-sky-500 bg-white">
            <CardContent className="p-5 flex flex-col justify-between h-[120px]">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-12" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ) : (
          <Link href="/dashboard/enquiries" className="block">
            <Card className="border border-slate-200 shadow-sm hover:shadow-[0_8px_30px_rgba(14,165,233,0.15)] hover:border-sky-300 transition-all duration-300 border-l-4 border-l-sky-500 bg-white group cursor-pointer hover:-translate-y-0.5">
              <CardContent className="p-5 flex flex-col justify-between h-[120px]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Today's Enquiries</span>
                  <Users className="h-5 w-5 text-sky-500 group-hover:scale-110 transition-transform duration-200" />
                </div>
                <div>
                  <span className="text-3xl font-extrabold text-slate-800 tracking-tight">
                    <AnimatedCounter value={stats?.daily ?? 0} />
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-400">Received since midnight</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        )}

        {/* Weekly Card */}
        {isLoading ? (
          <Card className="border border-slate-200 shadow-sm border-l-4 border-l-amber-500 bg-white">
            <CardContent className="p-5 flex flex-col justify-between h-[120px]">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-12" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ) : (
          <Link href="/dashboard/enquiries" className="block">
            <Card className="border border-slate-200 shadow-sm hover:shadow-[0_8px_30px_rgba(245,158,11,0.15)] hover:border-amber-300 transition-all duration-300 border-l-4 border-l-amber-500 bg-white group cursor-pointer hover:-translate-y-0.5">
              <CardContent className="p-5 flex flex-col justify-between h-[120px]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Weekly Enquiries</span>
                  <Calendar className="h-5 w-5 text-amber-500 group-hover:scale-110 transition-transform duration-200" />
                </div>
                <div>
                  <span className="text-3xl font-extrabold text-slate-800 tracking-tight">
                    <AnimatedCounter value={stats?.weekly ?? 0} />
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-400">Received this week</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        )}

        {/* Monthly Card */}
        {isLoading ? (
          <Card className="border border-slate-200 shadow-sm border-l-4 border-l-indigo-500 bg-white">
            <CardContent className="p-5 flex flex-col justify-between h-[120px]">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-12" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ) : (
          <Link href="/dashboard/enquiries" className="block">
            <Card className="border border-slate-200 shadow-sm hover:shadow-[0_8px_30px_rgba(99,102,241,0.15)] hover:border-indigo-300 transition-all duration-300 border-l-4 border-l-indigo-500 bg-white group cursor-pointer hover:-translate-y-0.5">
              <CardContent className="p-5 flex flex-col justify-between h-[120px]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Monthly Enquiries</span>
                  <BarChart3 className="h-5 w-5 text-indigo-500 group-hover:scale-110 transition-transform duration-200" />
                </div>
                <div>
                  <span className="text-3xl font-extrabold text-slate-800 tracking-tight">
                    <AnimatedCounter value={stats?.monthly ?? 0} />
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-400">Received this month</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        )}

        {/* Yearly Card */}
        {isLoading ? (
          <Card className="border border-slate-200 shadow-sm border-l-4 border-l-emerald-500 bg-white">
            <CardContent className="p-5 flex flex-col justify-between h-[120px]">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-12" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ) : (
          <Link href="/dashboard/enquiries" className="block">
            <Card className="border border-slate-200 shadow-sm hover:shadow-[0_8px_30px_rgba(16,185,129,0.15)] hover:border-emerald-300 transition-all duration-300 border-l-4 border-l-emerald-500 bg-white group cursor-pointer hover:-translate-y-0.5">
              <CardContent className="p-5 flex flex-col justify-between h-[120px]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase">Yearly Enquiries</span>
                  <TrendingUp className="h-5 w-5 text-emerald-500 group-hover:scale-110 transition-transform duration-200" />
                </div>
                <div>
                  <span className="text-3xl font-extrabold text-slate-800 tracking-tight">
                    <AnimatedCounter value={stats?.yearly ?? 0} />
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-400">Received this year</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        )}
      </div>

      <Card className="shadow-lg border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl font-semibold">Quick Access</CardTitle>
          <CardDescription>Navigate to main sections</CardDescription>
        </CardHeader>
        <CardContent>
          {accessibleNavItems.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
              {accessibleNavItems.map((item) => {
                const Icon = item.icon || Settings;
                return (
                  <Link
                    key={item.href}
                    href={item.href!}
                    className={cn(
                        "group flex flex-col items-center justify-center p-4 rounded-lg border border-gray-300 bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-200",
                        "hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      )}
                  >
                    <Icon className="h-8 w-8 mb-2 text-muted-foreground group-hover:text-primary transition-colors"/>
                    <span className="text-sm font-medium text-center">
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-4">
              No sections accessible or configured.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
