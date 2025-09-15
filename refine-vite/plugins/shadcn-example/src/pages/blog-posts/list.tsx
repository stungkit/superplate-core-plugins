import { useList } from "@refinedev/core";
import { useTable } from "@refinedev/react-table";
import { createColumnHelper } from "@tanstack/react-table";
import React from "react";

import { DataTable } from "@/components/refine-ui/data-table/data-table";
import { ListView } from "@/components/refine-ui/views/list-view";
import { Badge } from "@/components/ui/badge";
import { EditButton } from "@/components/refine-ui/buttons/edit";
import { ShowButton } from "@/components/refine-ui/buttons/show";
import { DeleteButton } from "@/components/refine-ui/buttons/delete";

<%_ if (answers["data-provider"] === "data-provider-hasura") { _%>
import { BLOG_POSTS_QUERY } from './queries'
<%_ } _%>
<%_ if (answers["data-provider"] === "data-provider-nestjs-query") { _%>
import { POSTS_LIST_QUERY } from './queries'
<%_ } _%>

type BlogPost = {
    id: string;
    title: string;
    content: string;
    status: string;
    <%_ if (answers["data-provider"] === "data-provider-hasura") { _%>
    created_at: string;
    <%_ } else if (answers["data-provider"] === "data-provider-appwrite") { _%>
    $createdAt: string;
    <%_ } else { _%>
    createdAt: string;
    <%_ } _%>
    <%- blogPostCategoryFieldName %>: { id: string; title: string };
};

export const BlogPostList = () => {
    // fetch all categories to use in the combobox filter
    const {
        result: { data: categories },
        query: { isLoading: categoryIsLoading },
    } = useList({
        resource: 'categories',
        pagination: {
            currentPage: 1,
            pageSize: 999,
        },
    })

    const columns = React.useMemo(() => {
        const columnHelper = createColumnHelper<BlogPost>();

        return [
            columnHelper.accessor("id", {
                id: "id",
                header: "ID",
                enableSorting: false,
            }),
            columnHelper.accessor("title", {
                id: "title",
                header: "Title",
                enableSorting: true,
            }),
            columnHelper.accessor("content", {
                id: "content",
                header: "Content",
                enableSorting: false,
                cell: ({ getValue }) => {
                    const content = getValue();
                    if (!content) return "-";
                    return (
                        <div className="max-w-xs truncate">
                            {content.slice(0, 80)}...
                        </div>
                    );
                },
            }),
            columnHelper.accessor("<%- blogPostCategoryFieldName %>.title", {
                id: "category",
                header: "Category",
                enableSorting: false,
                cell: ({ row }) => {
                    const categoryId = row.original.<%- blogPostCategoryFieldName %>?.id;
                    const category = categories?.find((item) => item.id === categoryId);
                    return categoryIsLoading ? "Loading..." : category?.title || "-";
                },
            }),
            columnHelper.accessor("status", {
                id: "status",
                header: "Status",
                enableSorting: true,
                cell: ({ getValue }) => {
                    const status = getValue();
                    return (
                        <Badge variant={status === "published" ? "default" : "secondary"}>
                            {status}
                        </Badge>
                    );
                },
            }),
            columnHelper.accessor(
                <%_ if (answers["data-provider"] === "data-provider-hasura") { _%>
                "created_at"
                <%_ } else if (answers["data-provider"] === "data-provider-appwrite") { _%>
                "$createdAt"
                <%_ } else { _%>
                "createdAt"
                <%_ } _%>,
                {
                    id: "createdAt",
                    header: "Created At",
                    enableSorting: true,
                    cell: ({ getValue }) => {
                        const date = getValue();
                        return date ? new Date(date).toLocaleDateString() : "-";
                    },
                }
            ),
            columnHelper.display({
                id: "actions",
                header: "Actions",
                cell: ({ row }) => (
                    <div className="flex gap-2">
                        <EditButton recordItemId={row.original.id} size="sm" />
                        <ShowButton recordItemId={row.original.id} size="sm" />
                        <DeleteButton recordItemId={row.original.id} size="sm" />
                    </div>
                ),
                enableSorting: false,
                size: 290,
            }),
        ];
    }, [categories, categoryIsLoading]);

    const table = useTable({
        columns,
        refineCoreProps: {
            syncWithLocation: true,
            <%_ if (answers["data-provider"] === "data-provider-hasura") { _%>
            meta: {
                fields: BLOG_POSTS_QUERY,
            },
            <%_ } _%>
            <%_ if (answers["data-provider"] === "data-provider-nestjs-query") { _%>
            meta: {
                gqlQuery: POSTS_LIST_QUERY,
            },
            <%_ } _%>
            <%_ if (answers["data-provider"] === "data-provider-strapi-v4") { _%>
            meta: {
                populate: ['category'],
            },
            <%_ } _%>
            <%_ if (answers["data-provider"] === "data-provider-supabase") { _%>
            meta: {
                select: '*, categories(id,title)',
            },
            <%_ } _%>
        },
    });

    return (
        <ListView>
            <DataTable table={table} />
        </ListView>
    );
};