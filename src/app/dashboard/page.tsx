'use client';

import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Settings } from 'lucide-react';
import PageHeader from "@/components/shared/PageHeader";
import { navItemsList } from "@/components/layout/Sidebar";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types";

// flatten nested children into one array
const flattenNavItems = (items: NavItem[]): NavItem[] => {
  return items.flatMap((item) => {
    if (item.children && item.children.length > 0) {
      return item.children;
    }
    return item;
  });
};

export default function DashboardPage() {
  // flatten all nav items from Sidebar config
  const allNavItems = flattenNavItems(navItemsList);

  // only include items that are not titles and have valid href
  const accessibleNavItems = allNavItems.filter(
    (item) => !item.isTitle && item.href && item.href !== "/dashboard"
  );

  return (
    <div className="min-h-screen">
      <PageHeader title="Dashboard Overview" description="Navigate to key sections quickly." />

      <Card className="mb-8 shadow-lg border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl font-semibold">Quick Access</CardTitle>
          <CardDescription>Navigate to main sections</CardDescription>
        </CardHeader>
        <CardContent>
          {accessibleNavItems.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {accessibleNavItems.map((item) => {
                const Icon = item.icon || Settings;
                return (
                  <Link
                    key={item.href}
                    href={item.href!}
                    className={cn(
                        "group flex flex-col items-center justify-center p-4 rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all duration-200",
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
