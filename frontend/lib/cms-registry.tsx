import { PremiumHero } from "@/components/shared/PremiumHero";
import { UniversalCTA } from "@/components/shared/UniversalCTA";
import { FeatureGrid } from "@/components/shared/FeatureGrid";
import { ProcessFlow } from "@/components/shared/ProcessFlow";
import { AILabGrid } from "@/components/shared/AILabGrid";

import { Testimonials } from "@/components/shared/Testimonials";
import { FAQ } from "@/components/shared/FAQ";
import { Pricing } from "@/components/shared/Pricing";
import { ContactForm } from "@/components/shared/ContactForm";

import { CategoryGrid } from "@/components/shared/CategoryGrid";
import { AILabPreview } from "@/components/shared/AILabPreview";
import { SevenDayTrial } from "@/components/shared/SevenDayTrial";

export const COMPONENT_REGISTRY: Record<string, React.FC<any>> = {
    hero: (props) => <PremiumHero data={props} variant="split" />,
    hero_centered: (props) => <PremiumHero data={props} variant="centered" />,
    cta: (props) => <UniversalCTA data={props} />,
    features: (props) => <FeatureGrid props={props} />,
    process: (props) => <ProcessFlow props={props} />,
    ai_lab_grid: (props) => <AILabGrid props={props} />,
    testimonials: (props) => <Testimonials props={props} />,
    faq: (props) => <FAQ props={props} />,
    pricing: (props) => <Pricing props={props} />,
    contact_form: (props) => <ContactForm props={props} />,
    category_grid: (props) => <CategoryGrid props={props} />,
    ai_lab_preview: (props) => <AILabPreview data={props} />,
    trial_section: (props) => <SevenDayTrial data={props} />,
};

export function resolveComponent(name: string, type?: string) {
    // 1. Check direct registry by type or name
    if (type && COMPONENT_REGISTRY[type]) return COMPONENT_REGISTRY[type];
    if (COMPONENT_REGISTRY[name]) return COMPONENT_REGISTRY[name];

    // 2. Fuzzy matching for legacy support
    if (name.includes("hero")) return COMPONENT_REGISTRY.hero;
    if (name.includes("cta") || name.includes("newsletter")) return COMPONENT_REGISTRY.cta;
    
    return null;
}
