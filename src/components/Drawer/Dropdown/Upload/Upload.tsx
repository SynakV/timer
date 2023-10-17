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
    <div className="w-[100%]" onClick={handleUploadData}>
      Upload
    </div>
  );
};
