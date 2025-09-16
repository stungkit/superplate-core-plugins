"use client";

import { ShowView } from "@/components/refine-ui/views/show-view";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useShow } from "@refinedev/core";

<%_ if (answers["data-provider"] === "data-provider-hasura") { _%>
import { CATEGORIES_QUERY } from '@queries/categories'
<%_ } _%>
<%_ if (answers["data-provider"] === "data-provider-nestjs-query") { _%>
import { CATEGORY_SHOW_QUERY } from '@queries/categories'
<%_ } _%>

export default function CategoryShow() {
    const { result: record, query } = useShow({
        <%_ if (answers["data-provider"] === "data-provider-hasura") { _%>
        meta: {
            fields: CATEGORIES_QUERY,
        },
        <%_ } _%>
        <%_ if (answers["data-provider"] === "data-provider-nestjs-query") { _%>
        meta: {
            gqlQuery: CATEGORY_SHOW_QUERY,
        },
        <%_ } _%>
    });
    const { isLoading } = query;

    return (
        <ShowView>
            <Card>
                <CardHeader>
                    <CardTitle>{result?.title}</CardTitle>
                    <CardDescription>Category ID: {result?.id}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <h4 className="text-sm font-medium mb-2">Title</h4>
                            <p className="text-sm text-muted-foreground">
                                {result?.title || "-"}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </ShowView>
    );
}
