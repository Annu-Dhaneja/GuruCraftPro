import { DynamicPageContent } from "./[slug]/DynamicPageContent";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function HomePage() {
    return <DynamicPageContent slug="home" />;
}
