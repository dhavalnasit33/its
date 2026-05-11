"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import apiService from "@/lib/apiService";
import Image from "next/image";
import Link from "next/link";
import { OurServicesMain, SingleResponse } from "@/types";
import PageHeader from "@/components/shared/PageHeader";
import { Badge } from "@/components/ui/badge";
import CreateOurServicesMainDialog from "@/components/dashboard/service-main-page/CreateOurServicesMainDialog";
import EditOurServicesMainDialog from "@/components/dashboard/service-main-page/EditOurServicesMainDialog";

const LinkedPointDisplay = ({
    points,
}: {
    points: OurServicesMain["heroSections"][0]["points"];
}) => (
    <div className="grid grid-cols-1 lg:grid-cols-2  gap-2 ">
        {points.map((point, pIdx) => (
            <Link
                key={pIdx}
                href="#"
                target="_blank"
            >
                <Badge
                    variant="secondary"
                    className="flex items-center gap-2 p-2 hover:bg-gray-200 transition-colors"
                >
                    <img
                        src={point.image}
                        alt={point.label}
                        className="h-6 w-6 rounded-full object-cover"
                    />
                    <span>{point.label}</span>
                </Badge>
            </Link>
        ))}
    </div>
);

const SimplePointDisplay = ({
    points,
}: {
    points: { label: string; image: string }[];
}) => (
    <div className="flex flex-wrap gap-2 ">
        {points.map((point, pIdx) => (
            <Badge
                key={pIdx}
                variant="outline"
                className="flex items-center gap-2 p-2"
            >
                <img
                    src={point.image}
                    alt={point.label}
                    className="h-7 w-7 rounded-full object-cover"
                />
                <span>{point.label}</span>
            </Badge>
        ))}
    </div>
);

export default function OurServicesMainPage() {
    const [data, setData] = useState<OurServicesMain | null>(null);
    const [loading, setLoading] = useState(true);
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);

    const fetchContent = async () => {
        try {
            setLoading(true);
            const res = await apiService<SingleResponse<OurServicesMain[]>>(
                "/service-main/admin"
            );
            if (res.success && res.data.length > 0) setData(res.data[0]);
            else setData(null);
        } catch (error) {
            console.error("❌ Error fetching services content:", error);
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContent();
    }, []);

    if (loading) return <p className="p-6">Loading...</p>;

    return (
        <div className="p-6">
            <PageHeader
                title="Our Services Page Content"
                description="Manage the content for the main services page."
                actionButtons={
                    !data ? (
                        <Button onClick={() => setCreateDialogOpen(true)}>
                            Create Content
                        </Button>
                    ) : (
                        <Button variant="outline" onClick={() => setEditDialogOpen(true)}>
                            Edit Content
                        </Button>
                    )
                }
            />

            {data ? (
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Main Content</CardTitle>
                        <div
                            className="prose prose-sm max-w-none mt-2"
                            dangerouslySetInnerHTML={{ __html: data.mainTitle }}
                        />
                    </CardHeader>
                    <CardContent>
                        <div
                            className="prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: data.description }}
                        />

                        <h3 className="text-xl font-semibold mt-6 mb-4 border-t pt-4">
                            Hero Sections
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {data.heroSections.map((section, idx) => (
                                <Card key={idx}>
                                    <CardHeader>
                                        <CardTitle className="text-lg">{section.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-col  gap-2">

                                            <Image
                                                src={section.image}
                                                alt={section.title}
                                                width={80}
                                                height={80}
                                                className="rounded-md my-2 object-cover"
                                            />
                                            <div className="flex flex-col gap-2">
                                                <h4 className="font-semibold mt-4 mb-2">Points:</h4>
                                                <LinkedPointDisplay points={section.points} />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <h3 className="text-xl font-semibold mt-6 mb-4 border-t pt-4">
                            Technology Details
                        </h3>
                        <div className="grid gap-6 md:grid-cols-2">
                            {data.technologyDetails.map((detail, idx) => (
                                <Card key={idx}>
                                    <CardHeader>
                                        <CardTitle className="text-lg">{detail.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Image
                                            src={detail.image}
                                            alt={detail.title}
                                            width={200}
                                            height={100}
                                            className="rounded-md my-2 object-cover"
                                        />
                                        <div
                                            className="prose prose-sm max-w-none mt-2"
                                            dangerouslySetInnerHTML={{ __html: detail.description }}
                                        />
                                        <h4 className="font-semibold mt-4 mb-2">
                                            Technology Details:
                                        </h4>
                                        <SimplePointDisplay points={detail.technologyDetail} />
                                        <h4 className="font-semibold mt-4 mb-2">
                                            Development Details:
                                        </h4>
                                        <LinkedPointDisplay points={detail.developmentDetail} />
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <p className="mt-6 text-center text-muted-foreground">
                    No content found. Please create it.
                </p>
            )}

            <CreateOurServicesMainDialog
                isOpen={createDialogOpen}
                onOpenChange={setCreateDialogOpen}
                onSuccess={fetchContent}
            />
            {data && (
                <EditOurServicesMainDialog
                    isOpen={editDialogOpen}
                    onOpenChange={setEditDialogOpen}
                    onSuccess={fetchContent}
                    initialData={data}
                />
            )}
        </div>
    );
}
