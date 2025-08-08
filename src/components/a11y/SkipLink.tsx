
import React from "react";

interface SkipLinkProps {
  href: string;
  children?: React.ReactNode;
}

const SkipLink: React.FC<SkipLinkProps> = ({ href, children }) => {
  return (
    <a
      href={href}
      className="sr-only focus:not-sr-only focus:ring-2 focus:ring-recicla-primary focus:outline-none bg-background text-foreground px-3 py-2 rounded-md absolute z-[100] left-2 top-2 shadow-md"
    >
      {children ?? "Pular para conteúdo"}
    </a>
  );
};

export default SkipLink;
