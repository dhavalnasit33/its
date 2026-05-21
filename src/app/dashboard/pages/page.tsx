
'use client';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, MoreHorizontal, PlusCircle, Search, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import PageHeader from '@/components/shared/PageHeader';
import apiService from '@/lib/apiService';
import { useToast } from '@/hooks/use-toast';
import BulkDeletepageDialog from '@/components/dashboard/pages/BulkDeletePageDialog';
import DeletePageDialog from '@/components/dashboard/pages/DeletePageDialog';

interface PageItem {
    _id: string;
    page_title: string;
    page_description?: string;
    slug: string;
    image?: string;
    seo?: {
        title?: string;
        keyphrase?: string;
        seoDescription?: string;
        featureImage?: string;
    };
    createdAt: string;
}

export default function PagesListPage() {
    const router = useRouter();
    const { toast } = useToast();

    const [isLoading, setIsLoading] = useState(false);
    const [items, setItems] = useState<PageItem[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [pagination, setPagination] = useState({ current: 1, pages: 1, total: 0 });
    const [limit] = useState(10);

    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
    const [selectedItem, setSelectedItem] = useState<PageItem | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [bulkDeleteDialogOpen, setBulkDeleteDialogOpen] = useState(false);

    const isAllSelected = items.length > 0 && selectedIds.length === items.length;
    const isIndeterminate = selectedIds.length > 0 && selectedIds.length < items.length;

    const fetchItems = async (page = 1, search = searchQuery) => {
        setIsLoading(true);
        try {
            const query = new URLSearchParams({
                page: String(page),
                limit: String(limit),
                ...(search ? { search } : {}),
            });

            const res = await apiService<{
                success: boolean;
                data: PageItem[];
                pagination: { current: number; pages: number; total: number };
            }>(`/page?${query.toString()}`, { method: "GET" });

            if (res.success) {
                setItems(res.data);
                if (res.pagination) setPagination(res.pagination);
            } else {
                setItems([]);
            }
        } catch (err) {
            console.error(err);
            setItems([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { fetchItems(1); setSelectedIds([]); }, []);

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") fetchItems(1, searchQuery);
    };

    const handleCheckboxChange = (id: string) =>
        setSelectedIds((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);

    const handleSelectAll = () =>
        setSelectedIds(selectedIds.length === items.length ? [] : items.map((i) => i._id));

    const handleDeleteDialogOpen = (item: PageItem) => { setSelectedItem(item); setDeleteDialogOpen(true); };
    const handleDeleteDialogChange = (open: boolean) => { if (!open) setSelectedItem(null); setDeleteDialogOpen(open); };

    const handleDeleteSuccess = () => {
        setDeleteDialogOpen(false);
        setSelectedIds((prev) => prev.filter((id) => id !== selectedItem?._id));
        fetchItems(pagination.current);
    };

    const handleBulkDeleteSuccess = () => {
        setSelectedIds([]);
        setBulkDeleteDialogOpen(false);
        fetchItems(pagination.current);
    };

    const formatDate = (dateStr: string) =>
        new Date(dateStr).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

    const truncate = (str: string | undefined, n = 40) =>
        !str ? "—" : str.length > n ? str.slice(0, n) + "…" : str;

    return (
        <>
            <PageHeader
                title="Pages"
                description="Manage all pages"
                actionButtons={
                    <div className="flex items-center gap-2">
                        {selectedIds.length > 0 && (
                            <Button variant="destructive" onClick={() => setBulkDeleteDialogOpen(true)}>
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Selected ({selectedIds.length})
                            </Button>
                        )}
                        <Button onClick={() => router.push("/dashboard/pages/create")}>
                            <PlusCircle className="mr-2 h-4 w-4" /> Add New
                        </Button>
                    </div>
                }
            />

            <div className="relative w-full max-w-sm mb-4">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                    className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearch}
                    placeholder="Search pages… (press Enter)"
                    type="search"
                />
            </div>

            <div className="rounded-md border shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-gray-100">
                            <TableHead className="w-10">
                                <input
                                    type="checkbox"
                                    checked={isAllSelected}
                                    ref={(el) => { if (el) el.indeterminate = isIndeterminate; }}
                                    onChange={handleSelectAll}
                                    className="cursor-pointer w-4 h-4"
                                />
                            </TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Slug</TableHead>
                            <TableHead>SEO Title</TableHead>
                            <TableHead>Meta Desc.</TableHead>
                            <TableHead>Keyphrase</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {isLoading
                            ? Array.from({ length: 5 }).map((_, i) => (
                                <TableRow key={i}>
                                    {Array.from({ length: 8 }).map((__, j) => (
                                        <TableCell key={j}><Skeleton className="h-5 w-24" /></TableCell>
                                    ))}
                                </TableRow>
                            ))
                            : items.length > 0
                                ? items.map((item) => (
                                    <TableRow
                                        key={item._id}
                                        className={`border hover:bg-gray-100 ${selectedIds.includes(item._id) ? "bg-gray-200" : ""}`}
                                    >
                                        <TableCell>
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.includes(item._id)}
                                                onChange={() => handleCheckboxChange(item._id)}
                                                className="cursor-pointer w-4 h-4"
                                            />
                                        </TableCell>

                                        <TableCell className="font-medium">{item.page_title}</TableCell>
                                        <TableCell >{item.slug}</TableCell>
                                        <TableCell>{truncate(item.seo?.title)}</TableCell>
                                        <TableCell>{truncate(item.seo?.seoDescription)}</TableCell>
                                        <TableCell>{item.seo?.keyphrase || "—"}</TableCell>
                                        <TableCell>{formatDate(item.createdAt)}</TableCell>

                                        <TableCell className="text-right">
                                            <DropdownMenu
                                                open={dropdownOpen === item._id}
                                                onOpenChange={(open) => setDropdownOpen(open ? item._id : null)}
                                            >
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem
                                                        onClick={() => {
                                                            router.push(`/dashboard/pages/${item._id}/edit`);
                                                            setDropdownOpen(null);
                                                        }}
                                                    >
                                                        <Edit className="mr-2 h-4 w-4" /> Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => { handleDeleteDialogOpen(item); setDropdownOpen(null); }}
                                                        className="text-destructive focus:text-destructive focus:bg-destructive/10"
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                                : (
                                    <TableRow>
                                        <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                                            No pages found.
                                        </TableCell>
                                    </TableRow>
                                )}
                    </TableBody>
                </Table>
            </div>

            {pagination.pages > 1 && (
                <div className="flex items-center justify-between mt-6 px-2">
                    <p className="text-sm text-muted-foreground">
                        Showing page {pagination.current} of {pagination.pages}
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

            {selectedItem && (
                <DeletePageDialog
                    isOpen={deleteDialogOpen}
                    onOpenChange={handleDeleteDialogChange}
                    item={selectedItem}
                    onSuccess={handleDeleteSuccess}
                />
            )}

            <BulkDeletepageDialog
                isOpen={bulkDeleteDialogOpen}
                onOpenChange={setBulkDeleteDialogOpen}
                selectedIds={selectedIds}
                onSuccess={handleBulkDeleteSuccess}
            />
        </>
    );
}