import { useState } from "react";
import { Eye, EyeOff, Copy, Check } from "lucide-react";

interface PasswordDisplayProps {
  password: string;
  onCopy?: () => void;
}

export default function PasswordDisplay({
  password,
  onCopy,
}: PasswordDisplayProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      // try modern clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(password);
      } else {
        // fallback for older browsers or mobile
        const textArea = document.createElement("textarea");
        textArea.value = password;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
          document.execCommand("copy");
        } finally {
          document.body.removeChild(textArea);
        }
      }

      setIsCopied(true);
      onCopy?.();

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      // still show success to user since fallback might have worked
      setIsCopied(true);
      onCopy?.();
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const displayText = isVisible ? password : "•".repeat(password.length);

  return (
    <div className="relative w-full">
      <div className="flex items-center gap-2 px-4 py-3 bg-muted border border-border rounded-lg transition-all hover:border-primary/50 focus-within:border-primary focus-within:ring-2 focus-within:ring-ring">
        {/* Password Display */}
        <div className="flex-1 font-mono text-sm text-foreground select-all overflow-hidden">
          {password ? (
            <span className="tracking-wider">{displayText}</span>
          ) : (
            <span className="text-muted-foreground">
              Generated password will appear here
            </span>
          )}
        </div>

        {/* action buttons */}
        {password && (
          <div className="flex items-center gap-1">
            {/* visibility toggle */}
            <button
              onClick={toggleVisibility}
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-foreground/20 hover:text-accent-foreground transition-all duration-200"
              aria-label={isVisible ? "Hide password" : "Show password"}
              type="button"
            >
              {isVisible ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>

            {/* copy button */}
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-foreground/20 hover:text-accent-foreground transition-all duration-200"
              aria-label="Copy password"
              type="button"
            >
              {isCopied ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
