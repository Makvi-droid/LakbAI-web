import { useState } from "react";
import { motion } from "framer-motion";

export default function Input({
  label,
  icon: Icon,
  type = "text",
  value,
  onChange,
  onBlur,
  onFocus,
  name,
  placeholder,
  rightElement,
  error,
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="mb-1.5 block text-xs font-medium tracking-wide text-[#12202B]/70"
      >
        {label}
      </label>
      <div
        className={`flex items-center gap-2.5 rounded-xl border bg-white px-3.5 py-3 transition-all duration-200 ${
          error
            ? "border-red-400 ring-4 ring-red-100"
            : focused
              ? "border-[#14B8A6] ring-4 ring-[#14B8A6]/15"
              : "border-black/10"
        }`}
      >
        {Icon && (
          <Icon
            size={17}
            className="shrink-0 text-[#7C93A3]"
            strokeWidth={1.75}
          />
        )}
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={(event) => {
            setFocused(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            onBlur?.(event);
          }}
          placeholder={placeholder}
          autoComplete="off"
          className="w-full bg-transparent text-sm text-[#12202B] placeholder:text-[#7C93A3] focus:outline-none"
        />
        {rightElement}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1.5 text-xs text-red-500"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}
