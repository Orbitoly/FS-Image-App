import { api } from "../services/imagesApi";

export const useExport = () => {
  const exportVotes = async () => {
    try {
      const blob = await api.exportVotes();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "votes.csv";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Failed to export votes:", error);
    }
  };

  return { exportVotes };
};
