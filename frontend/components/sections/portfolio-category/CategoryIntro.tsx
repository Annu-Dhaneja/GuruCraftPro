"use client";

export function CategoryIntro({ text }: { text: string }) {
    return (
        <section className="py-12 border-b border-border bg-muted/20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <p className="text-lg md:text-xl font-medium leading-relaxed text-foreground/80">
                        {text}
                    </p>
                </div>
            </div>
        </section>
    );
}
