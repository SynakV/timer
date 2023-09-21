import { Button } from "../ui/button";
import { useSections } from "@/utils/contexts/SectionsContext/SectionsContext";

export const Upload = () => {
  const { setSections } = useSections();

  const handleUploadData = async () => {
    const data = (await import("./data.json")).default;

    setSections((prev) => ({
      ...prev,
      ...data,
    }));
  };

  return (
    <Button onClick={handleUploadData} className="absolute top-2 right-2">
      Upload
    </Button>
  );
};
