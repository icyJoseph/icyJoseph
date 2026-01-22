"use client";

import { useRef, type ReactNode } from "react";

import { ToggleButton } from "components/ToggleButton";

type ShowMoreProps = {
    children: ReactNode;
    initial: number;
    total: number;
    header?: ReactNode;
    headerRef?: React.RefObject<HTMLDivElement | null>;
    className?: string;
};

function getChildrenElements(container: HTMLElement): HTMLElement[] {
    const listElement = container.querySelector("ul, ol");
    return listElement
        ? Array.from(listElement.children) as HTMLElement[]
        : Array.from(container.children) as HTMLElement[];
}

function isExpanded(container: HTMLElement, initial: number): boolean {
    const elements = getChildrenElements(container);
    const elementAtIndex = elements[initial];
    if (!elementAtIndex) return false;
    return !elementAtIndex.classList.contains("hidden");
}

export function ShowMore({
    children,
    initial = 5,
    total,
    header,
    headerRef: externalHeaderRef,
    className,
}: ShowMoreProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const internalHeaderRef = useRef<HTMLDivElement>(null);
    const headerRef = externalHeaderRef || internalHeaderRef;
    const sentinelRef = useRef<HTMLDivElement>(null);
    const hasInteractedRef = useRef(false);

    const handleToggle = (_isActive: boolean) => {
        if (!containerRef.current) return;

        // On first interaction, remove CSS data attribute and apply hidden classes
        if (!hasInteractedRef.current && containerRef.current.hasAttribute("data-show-more-initial")) {
            containerRef.current.removeAttribute("data-show-more-initial");
            const elements = getChildrenElements(containerRef.current);
            const elementsToHide = elements.slice(initial);
            elementsToHide.forEach((element) => {
                element.classList.add("hidden");
            });
            hasInteractedRef.current = true;
        }

        const elements = getChildrenElements(containerRef.current);
        const elementsToToggle = elements.slice(initial);
        const currentlyExpanded = isExpanded(containerRef.current, initial);

        elementsToToggle.forEach((element) => {
            if (currentlyExpanded) {
                element.classList.add("hidden");
            } else {
                element.classList.remove("hidden");
            }
        });

        // Scroll to sentinel when collapsing
        if (currentlyExpanded && hasInteractedRef.current && sentinelRef.current) {
            sentinelRef.current.scrollIntoView({ behavior: "auto", block: "start" });
        }
    };

    const shouldShowButton = total > initial;

    return (
        <>
            <style>{`
                [data-show-more-initial="${initial}"] > ul > li:nth-child(n+${initial + 1}),
                [data-show-more-initial="${initial}"] > ol > li:nth-child(n+${initial + 1}),
                [data-show-more-initial="${initial}"] > *:nth-child(n+${initial + 1}) {
                    display: none !important;
                }
            `}</style>
            {header && (
                <>
                    <div ref={sentinelRef} className="h-0" aria-hidden="true" />
                    <div
                        ref={headerRef}
                        className="sticky top-0 z-10 bg-soft-black -mx-4 px-4 pt-4 pb-4 mb-8 border-b border-zinc-700"
                    >
                        <div className="flex items-center justify-between gap-4">
                            {header}
                            {shouldShowButton && (
                                <ToggleButton
                                    onToggle={handleToggle}
                                    activeLabel="Show less"
                                    inactiveLabel="Show more"
                                    className="text-pale-blue hover:text-pale-yellow text-sm font-sans"
                                />
                            )}
                        </div>
                    </div>
                </>
            )}
            <div
                ref={containerRef}
                data-show-more-initial={initial}
                className={className}
            >
                {children}
            </div>
        </>
    );
}
