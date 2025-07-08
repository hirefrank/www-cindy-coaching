import React from 'react';

interface CopyrightTextProps {
  copyrightText?: string;
}

export default function CopyrightText({ copyrightText }: CopyrightTextProps) {
  const currentYear = new Date().getFullYear();
  const defaultText = `© ${currentYear} Cindy Romanzo. All rights reserved.`;
  
  // If copyrightText is provided and contains a year placeholder, replace it
  if (copyrightText) {
    // Replace any 4-digit year with current year
    return <>{copyrightText.replace(/\b\d{4}\b/, currentYear.toString())}</>;
  }
  
  return <>{defaultText}</>;
}