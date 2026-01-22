import { useState, type ReactNode } from "react";

type ToggleButtonProps = {
    onToggle: (isActive: boolean) => void;
    activeLabel: ReactNode;
    inactiveLabel: ReactNode;
    className?: string;
};

export function ToggleButton({
    onToggle,
    activeLabel,
    inactiveLabel,
    className,
}: ToggleButtonProps) {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        const newActive = !isActive;
        setIsActive(newActive);
        onToggle(newActive);
    };

    return (
        <button onClick={handleClick} className={className}>
            {isActive ? activeLabel : inactiveLabel}
        </button>
    );
}
