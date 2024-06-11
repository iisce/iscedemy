import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // Support GitHub Flavored Markdown (optional)
import { JsxElement } from 'typescript';
import DOMPurify from 'dompurify';

interface MarkdownToReactProps {
    markdown: string;
    // Other optional props for customization
}

function markdownToReact(props: MarkdownToReactProps): JSX.Element {
    const { markdown } = props;
    
    // Sanitize Markdown Input
    const sanitizedHtml = DOMPurify.sanitize(markdown, {
        USE_PROFILES: { html: true }, // Enable HTML sanitization profile
        FORBID_ATTR: ['style'],       // Optionally, disallow inline styles
        // Add other sanitization rules as needed
    });

    return (
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {sanitizedHtml} 
        </ReactMarkdown>
    );
}

export default markdownToReact;