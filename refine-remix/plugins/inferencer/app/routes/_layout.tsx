import { Outlet } from "@remix-run/react";
<%_ if (answers["ui-framework"] === 'antd') { _%>
    import { ThemedLayout } from "@refinedev/antd";
<%_ } _%>
<%_ if (answers["ui-framework"] === 'mui') { _%>
    import { ThemedLayout } from "@refinedev/mui";
<%_ } _%>
<%_ if (answers["ui-framework"] === 'mantine') { _%>
    import { ThemedLayout } from "@refinedev/mantine";
<%_ } _%>
<%_ if (answers["ui-framework"] === 'chakra') { _%>
    import { ThemedLayout } from "@refinedev/chakra-ui";
<%_ } _%>

<%_ if (_app.isAuthProviderCheck) { _%>
import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { authProvider } from "~/authProvider";
<%_ } _%>

import { Header } from "@components/header";

export default function BaseLayout() {
    return (
        <>
             <%_ if (answers["ui-framework"] === 'no') { _%>
                <Outlet />
            <%_ } else { _%>
                <ThemedLayout Header={Header}>
                    <Outlet />
                </ThemedLayout>
            <%_ } _%>
        </>
    );
}

<%_ if (_app.isAuthProviderCheck) { _%>
/**
 * We're checking if the current session is authenticated.
 * If not, we're redirecting the user to the login page.
 * This is applied for all routes that are nested under this layout (_protected).
 */
export async function loader({ request }: LoaderArgs) {
const { authenticated, redirectTo } = await authProvider.check(request);

if (!authenticated) {
    throw redirect(redirectTo ?? "/login");
}

return {};
}
<%_ } _%>