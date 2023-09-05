import type { ChangeEvent } from "react";

import classNames from "classnames";

export const ToggleSwitch = ({
  label,
  checked,
  disabled = false,
  onChange,
}: {
  label: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <label className="relative inline-flex items-center mb-5 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
        disabled={disabled}
      />

      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 peer-focus:ring-offset-blue-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-smoke-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-smoke-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-400" />

      <span
        className={classNames(
          "ml-3 text-sm font-medium",
          disabled ? "text-gray-400" : "text-gray-200"
        )}
      >
        {label}
      </span>
    </label>
  );
};
