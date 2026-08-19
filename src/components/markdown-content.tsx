"use client";

import ReactMarkdown, { type Components } from "react-markdown";

const components: Components = {
  h1: ({ children }) => <h2 className="text-4xl">{children}</h2>,
  h2: ({ children }) => <h2 className="text-4xl">{children}</h2>,
  p: ({ children }) => <p className="max-w-md text-lg">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  a: ({ href, children }) => (
    <a href={href} className="underline underline-offset-4 hover:opacity-80">
      {children}
    </a>
  ),
  ul: ({ children }) => <ul className="list-disc space-y-1 pl-5 text-lg">{children}</ul>,
  li: ({ children }) => <li>{children}</li>,
};

export function MarkdownContent({ children }: { children: string }) {
  return <ReactMarkdown components={components}>{children}</ReactMarkdown>;
}
