"use client"

import { useNavigation, useSelect } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import React from "react";
<%_ if (answers["data-provider"] === "data-provider-hasura") { _%>
    import { BLOG_POSTS_QUERY, BLOG_POSTS_CATEGORIES_SELECT_QUERY } from  "@queries/blog-posts";
<%_ } _%>
<%_ if (answers["data-provider"] === "data-provider-nestjs-query") { _%>
    import { POST_CREATE_MUTATION, CATEGORIES_SELECT_QUERY } from  "@queries/blog-posts";
<%_ } _%>

export default function BlogPostCreate() {
    const { list } = useNavigation();

    const {
        refineCore: { onFinish },
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
<%_ if (answers["data-provider"] === "data-provider-hasura") { _%>
        refineCoreProps: {
            meta: {
              fields: BLOG_POSTS_QUERY,
            },
        },
<%_ } _%>
<%_ if (answers["data-provider"] === "data-provider-nestjs-query") { _%>
        refineCoreProps: {
            meta: {
                gqlMutation: POST_CREATE_MUTATION,
            },
        },
<%_ } _%>
    });

    const { options: categoryOptions } = useSelect({
        resource: "categories",
<%_ if (answers["data-provider"] === "data-provider-hasura") { _%>
            meta: {
                fields: BLOG_POSTS_CATEGORIES_SELECT_QUERY,
            },
<%_ } _%>
<%_ if (answers["data-provider"] === "data-provider-nestjs-query") { _%>
            meta: {
                gqlQuery: CATEGORIES_SELECT_QUERY,
            },
<%_ } _%>
    });

    return (
        <div style={{ padding: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h1>Create</h1>
                <div>
                    <button
                        onClick={() => {
                            list("blog_posts");
                        }}
                    >
                        List
                    </button>
                </div>
            </div>
            <form onSubmit={handleSubmit(onFinish)}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                    }}
                >
                    <label>
                        <span style={{ marginRight: "8px" }}>title</span>
                        <input
                            type="text"
                            {...register("title", {
                                required: "This field is required",
                            })}
                        />
                        <span style={{ color: "red" }}>
                            {(errors as any)?.title?.message as string}
                        </span>
                    </label>
                    <label>
                        <span style={{ marginRight: "8px" }}>Content</span>
                        <textarea
                            rows={5}
                            cols={33}
                            style={{ verticalAlign: "top" }}
                            {...register("content", {
                                required: "This field is required",
                            })}
                        />
                        <span style={{ color: "red" }}>
                            {(errors as any)?.content?.message as string}
                        </span>
                    </label>
                    <label>
                        <span style={{ marginRight: "8px" }}>Category</span>
                        <select
                        {...register(<%- blogPostCategoryIdFormField %>, {
                            required: "This field is required",
                        })}
                        >
                            {categoryOptions?.map((option) => (
                                <option value={option.value} key={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <span style={{ color: "red" }}>
<%_ if (answers["data-provider"] === "data-provider-appwrite") { _%>
                            {(errors as any)?.<%- blogPostCategoryFieldName %>?.message as string}
<%_ } else { _%>
                            {(errors as any)?.<%- blogPostCategoryFieldName %>?.id?.message as string}
<%_ } _%>
                        </span>
                    </label>
                    <label>
                        <span style={{ marginRight: "8px" }}>Status</span>
                        <select
                            defaultValue={<%- blogPostStatusDefaultValue %>}
                            {...register("status", {
                                required: "This field is required",
                            })}
                        >
                            <option value='<%- blogPostStatusOptions[0].value%>'><%- blogPostStatusOptions[0].label%></option>
                            <option value='<%- blogPostStatusOptions[1].value%>'><%- blogPostStatusOptions[1].label%></option>
                            <option value='<%- blogPostStatusOptions[2].value%>'><%- blogPostStatusOptions[2].label%></option>
                        </select>
                        <span style={{ color: "red" }}>
                            {(errors as any)?.status?.message as string}
                        </span>
                    </label>
                    <div>
                        <input type="submit" value="save" />
                    </div>
                </div>
            </form>
        </div>
    );
};
