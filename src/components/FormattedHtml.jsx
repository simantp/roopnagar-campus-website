import React from 'react';

export default function FormattedHtml({ content, style = {}, className = '' }) {
  if (!content) return null;

  // Check if content contains HTML tags (e.g. <p>, <h3>, <ul>, <br>, <strong>, etc.)
  const hasHtml = /<[a-z][\s\S]*>/i.test(content);

  if (hasHtml) {
    return (
      <div 
        className={`rns-formatted-content ${className}`}
        style={{
          fontSize: '15px',
          color: '#334155',
          lineHeight: '1.85',
          ...style
        }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  // If plain text (e.g., pasted Nepali text with line breaks \n)
  return (
    <div 
      className={`rns-formatted-content ${className}`}
      style={{
        fontSize: '15px',
        color: '#334155',
        lineHeight: '1.85',
        whiteSpace: 'pre-line',
        ...style
      }}
    >
      {content}
    </div>
  );
}
