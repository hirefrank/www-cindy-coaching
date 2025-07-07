import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

interface CalButtonProps {
  calLink: string;
  children: React.ReactNode;
  className?: string;
  config?: Record<string, any>;
  namespace?: string;
}

export default function CalButton({ 
  calLink, 
  children, 
  className = "btn-primary", 
  config = {"theme": "light"},
  namespace = "default"
}: CalButtonProps) {
  useEffect(() => {
    (async function () {
      try {
        const cal = await getCalApi({ namespace });
        cal("ui", config);
      } catch (error) {
        console.error("Cal.com initialization error:", error);
      }
    })();
  }, [config, namespace]);

  return (
    <button 
      data-cal-namespace={namespace}
      data-cal-link={calLink}
      data-cal-config={JSON.stringify(config)}
      className={className}
    >
      {children}
    </button>
  );
}