import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useExport } from "@/hooks/useExport";

export const ExportButton: React.FC = () => {
  const { exportVotes } = useExport();

  return (
    <Button
      onClick={exportVotes}
      className="flex items-center gap-2"
      data-testid="export-button"
    >
      <Download className="h-4 w-4" />
      Export Votes
    </Button>
  );
};
