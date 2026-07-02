'use client';

import { useCallback, useEffect, useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import apiService from "@/lib/apiService";
import { Enquiry } from "@/types";
import {
  Search,
  Trash2,
  Eye,
  Mail,
  Calendar,
  MoreHorizontal,
  AlertCircle,
  Briefcase,
  GraduationCap,
  Sparkles,
  BellRing,
} from "lucide-react";
import ViewEnquiryDialog from "@/components/dashboard/enquiries/ViewEnquiryDialog";
import DeleteEnquiryDialog from "@/components/dashboard/enquiries/DeleteEnquiryDialog";
import BulkDeleteEnquiriesDialog from "@/components/dashboard/enquiries/BulkDeleteEnquiriesDialog";

export default function EnquiriesPage() {
  const { toast } = useToast();
  const [items, setItems] = useState<Enquiry[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Pagination
  const [pagination, setPagination] = useState({
    current: 1,
    pages: 1,
    total: 0,
  });

  // Selected for Details / Status Update
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  // Deletions
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [enquiryToDelete, setEnquiryToDelete] = useState<Enquiry | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);

  // Statistics
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    reviewed: 0,
    contacted: 0,
    closed: 0,
  });
  const [limit] = useState(10);

  // Fetch Items
  const fetchItems = useCallback(async (page: number = 1, search: string = "", type: string = "all", status: string = "all") => {
    setIsLoading(true);
    try {
      const params: Record<string, string> = {
        page: page.toString(),
         limit: limit.toString(),
      };
      if (search) params.search = search;
      if (type && type !== "all") params.type = type;
      if (status && status !== "all") params.status = status;

      const res = await apiService<{
        success: boolean;
        data: Enquiry[];
        pagination: { current: number; pages: number; total: number };
      }>("/enquiries", { method: "GET", params });

      if (res.success) {
        setItems(res.data);
        setPagination(res.pagination);
      } else {
        setItems([]);
      }
    } catch (error: any) {
      console.error("Failed to fetch enquiries:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to load enquiries data.",
        variant: "destructive",
      });
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  // Fetch quick stats by calling without pagination limit or counting dynamically from all data
  const fetchStats = useCallback(async () => {
    try {
      const res = await apiService<{
        success: boolean;
        data: { total: number; pending: number; reviewed: number; contacted: number; closed: number };
      }>("/enquiries/stats", { method: "GET" });

      if (res.success && res.data) {
        setStats(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  }, []);

  // Sync / Trigger fetch on filters or page change
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchItems(pagination.current, searchQuery, filterType, filterStatus);
    }, 300);
    return () => clearTimeout(timer);
  }, [pagination.current, searchQuery, filterType, filterStatus, fetchItems]);

  useEffect(() => {
    fetchStats();
  }, [items, fetchStats]);

  // Reset page when filters change
  useEffect(() => {
    setPagination(prev => ({ ...prev, current: 1 }));
    setSelectedIds([]);
  }, [searchQuery, filterType, filterStatus]);

  const openDetails = (enquiry: Enquiry) => {
    setSelectedEnquiry(enquiry);
    setDetailsOpen(true);
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === items.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(items.map(item => item._id));
    }
  };

  const toggleSelectItem = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // Status Badge Helper
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending":
        return <Badge className="bg-amber-100 hover:bg-amber-100 text-amber-800 border-amber-300 font-medium">Pending</Badge>;
      case "Reviewed":
        return <Badge className="bg-blue-100 hover:bg-blue-100 text-blue-800 border-blue-300 font-medium">Reviewed</Badge>;
      case "Contacted":
        return <Badge className="bg-teal-100 hover:bg-teal-100 text-teal-800 border-teal-300 font-medium">Contacted</Badge>;
      case "Closed":
        return <Badge className="bg-slate-100 hover:bg-slate-100 text-slate-800 border-slate-300 font-medium">Closed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Type Badge Helper
  const getTypeBadge = (type: string) => {
    switch (type) {
      case "Career":
        return (
          <div className="flex items-center gap-1.5 text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full text-xs font-semibold w-fit">
            <GraduationCap className="h-3.5 w-3.5" />
            Career
          </div>
        );
      case "Training":
        return (
          <div className="flex items-center gap-1.5 text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full text-xs font-semibold w-fit">
            <Sparkles className="h-3.5 w-3.5" />
            Training
          </div>
        );
      case "Contact":
        return (
          <div className="flex items-center gap-1.5 text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full text-xs font-semibold w-fit">
            <Mail className="h-3.5 w-3.5" />
            Contact
          </div>
        );
      case "Hire":
        return (
          <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full text-xs font-semibold w-fit">
            <Briefcase className="h-3.5 w-3.5" />
            Hire
          </div>
        );
      case "FooterForm":
        return (
          <div className="flex items-center gap-1.5 text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full text-xs font-semibold w-fit">
            <Mail className="h-3.5 w-3.5" />
            Footer Form
          </div>
        );
      case "PopupForm":
        return (
          <div className="flex items-center gap-1.5 text-cyan-700 bg-cyan-50 border border-cyan-200 px-2 py-0.5 rounded-full text-xs font-semibold w-fit">
            <BellRing className="h-3.5 w-3.5" />
            Popup Form
          </div>
        );
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  return (
    <div className="p-6 w-full space-y-6">
      <PageHeader
        title="Contact List (Enquiries)"
        description="View and manage all Career, Training, Contact, and Hire enquiries submitted from the public website in one unified dashboard."
      />

      <Card>
        <CardContent className="pt-6 space-y-8">
          {/* Analytics Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Card className="bg-gradient-to-br from-indigo-50/70 to-white border-indigo-100 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="p-4 pb-2">
                <span className="text-xs text-indigo-600 font-semibold uppercase tracking-wider">Total Requests</span>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-3xl font-extrabold text-indigo-950">{stats.total}</div>
                <p className="text-[11px] text-muted-foreground mt-1">Combined submissions</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-50/70 to-white border-amber-100 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="p-4 pb-2">
                <span className="text-xs text-amber-600 font-semibold uppercase tracking-wider">Pending</span>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-3xl font-extrabold text-amber-850">{stats.pending}</div>
                <p className="text-[11px] text-muted-foreground mt-1">Awaiting review</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50/70 to-white border-blue-100 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="p-4 pb-2">
                <span className="text-xs text-blue-600 font-semibold uppercase tracking-wider">Reviewed</span>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-3xl font-extrabold text-blue-850">{stats.reviewed}</div>
                <p className="text-[11px] text-muted-foreground mt-1">Marked as reviewed</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-teal-50/70 to-white border-teal-100 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="p-4 pb-2">
                <span className="text-xs text-teal-600 font-semibold uppercase tracking-wider">Contacted</span>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-3xl font-extrabold text-teal-850">{stats.contacted}</div>
                <p className="text-[11px] text-muted-foreground mt-1">Outreached to user</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-50 to-white border-slate-200 shadow-sm hover:shadow-md transition-shadow col-span-2 md:col-span-1">
              <CardHeader className="p-4 pb-2">
                <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Closed</span>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-3xl font-extrabold text-slate-800">{stats.closed}</div>
                <p className="text-[11px] text-muted-foreground mt-1">Resolved requests</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters Toolbar */}
          <div className="bg-white p-4 border rounded-xl shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-1 flex-col sm:flex-row gap-3 w-full">
              {/* Search bar */}
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, phone, or subject..."
                  className="pl-9 h-10 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Type filter */}
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full sm:w-[160px] h-10">
                  <SelectValue placeholder="Filter by Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Contact">Contact Page</SelectItem>
                  <SelectItem value="Career">Career / Applied</SelectItem>
                  <SelectItem value="Training">Training Page</SelectItem>
                  <SelectItem value="Hire">Hire Developer</SelectItem>
                  <SelectItem value="FooterForm">Footer Form</SelectItem>
                  <SelectItem value="PopupForm">Popup Form</SelectItem>
                </SelectContent>
              </Select>

              {/* Status filter */}
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-[160px] h-10">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Reviewed">Reviewed</SelectItem>
                  <SelectItem value="Contacted">Contacted</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bulk Delete / Reset Filters */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-end border-t md:border-none pt-3 md:pt-0">
              {(searchQuery || filterType !== "all" || filterStatus !== "all") && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs"
                  onClick={() => {
                    setSearchQuery("");
                    setFilterType("all");
                    setFilterStatus("all");
                  }}
                >
                  Clear Filters
                </Button>
              )}

              {selectedIds.length > 0 && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setBulkDeleteDialogOpen(true)}
                  className="shadow-sm transition-transform active:scale-95"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Selected ({selectedIds.length})
                </Button>
              )}
            </div>
          </div>

          
          </CardContent>
          
      </Card>
      {/* Main Table */}
          <div className="rounded-md border shadow-sm">
            <Table>
              <TableHeader >
                <TableRow>
                  <TableHead className="w-10">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 accent-primary cursor-pointer"
                      checked={selectedIds.length === items.length && items.length > 0}
                      onChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="w-38">Type</TableHead>
                  <TableHead>Sender Information</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Subject / Request Topic</TableHead>
                  <TableHead className="w-32">Status</TableHead>
                  <TableHead className="w-40">Date Submitted</TableHead>
                  <TableHead className="text-right w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: limit }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-4 w-4" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <Skeleton className="h-5 w-32" />
                          <Skeleton className="h-4 w-40" />
                        </div>
                      </TableCell>
                      <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-48" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                      <TableCell><Skeleton className="h-5 w-28" /></TableCell>
                      <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto rounded-full" /></TableCell>
                    </TableRow>
                  ))
                ) : items.length > 0 ? (
                  items.map((item) => (
                    <TableRow key={item._id} className="hover:bg-slate-50/50 transition-colors">
                      <TableCell>
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 accent-primary cursor-pointer"
                          checked={selectedIds.includes(item._id)}
                          onChange={() => toggleSelectItem(item._id)}
                        />
                      </TableCell>
                      <TableCell>{getTypeBadge(item.type)}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-900">{item.name}</span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                            <Mail className="h-3 w-3 inline" />
                            {item.email}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-slate-700">{item.phone}</TableCell>
                      <TableCell className="max-w-[240px] truncate text-slate-800">
                        {item.type === "Training" ? (
                          <span className="font-medium text-slate-900">
                            Course Pick: {item.selectedCourse || "Not specified"}
                          </span>
                        ) : item.type === "Career" ? (
                          <span className="font-medium text-slate-900">
                            Apply: {item.positionApplied?.name || "General Application"}
                          </span>
                        ) : (
                          item.subject || <span className="text-muted-foreground italic">No Subject</span>
                        )}
                      </TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell className="text-muted-foreground text-xs font-medium">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          {new Date(item.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="hover:bg-slate-100 rounded-full h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40 bg-white border shadow-md">
                            <DropdownMenuItem onClick={() => openDetails(item)} className="cursor-pointer">
                              <Eye className="mr-2 h-4 w-4" /> View details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setEnquiryToDelete(item);
                                setDeleteDialogOpen(true);
                              }}
                              className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
                            >
                              <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center h-32 text-muted-foreground">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <AlertCircle className="h-8 w-8 text-slate-400" />
                        <span>No enquiries found matching your search criteria.</span>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

      {/* Pagination Controls */}
      {pagination.pages > 1 && (
          <div className="flex items-center justify-between mt-6 px-2">
              <p className="text-sm text-muted-foreground">
                  Showing page {pagination.current} of {pagination.pages} ({pagination.total} total enquiries)
              </p>
              <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={pagination.current === 1}
                    onClick={() => setPagination(prev => ({ ...prev, current: prev.current - 1 }))}
                  >
                  Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={pagination.current === pagination.pages}
                    onClick={() => setPagination(prev => ({ ...prev, current: prev.current + 1 }))}
                  >
                  Next
                  </Button>
              </div>
          </div>
            )}

      {/* Details / Action Dialog */}
      {selectedEnquiry && (
        <ViewEnquiryDialog
          isOpen={detailsOpen}
          onOpenChange={setDetailsOpen}
          selectedEnquiry={selectedEnquiry}
          onSuccess={() => {
            fetchItems(pagination.current, searchQuery, filterType, filterStatus);
            fetchStats();
          }}
        />
      )}

      {/* Delete Confirmation Alert */}
      {enquiryToDelete && (
        <DeleteEnquiryDialog
          isOpen={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          enquiryToDelete={enquiryToDelete}
          onSuccess={() => {
            setSelectedIds(prev => prev.filter(id => id !== enquiryToDelete._id));
            fetchItems(pagination.current, searchQuery, filterType, filterStatus);
            fetchStats();
          }}
        />
      )}

      {/* Bulk Delete Alert */}
      <BulkDeleteEnquiriesDialog
        isOpen={bulkDeleteDialogOpen}
        onOpenChange={setBulkDeleteDialogOpen}
        selectedIds={selectedIds}
        onSuccess={() => {
          setSelectedIds([]);
          fetchItems(pagination.current, searchQuery, filterType, filterStatus);
          fetchStats();
        }}
      />
    </div>
  );
}
