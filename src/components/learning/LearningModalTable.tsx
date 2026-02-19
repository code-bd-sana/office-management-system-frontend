import { ModalTable, type ColumnDef } from "@/components/shared";
import { LearningModalRow } from "./LearningModalRow";
import { DEMO_LEARNING_RECORDS } from "@/constants/learning";
import type { LearningRecord } from "@/types/learning";

const TOTAL_RECORDS = 97; // From the screenshot "1-10 of 97"

const COLUMNS: ColumnDef[] = [
  { key: "number", label: "#" },
  { key: "topicTitle", label: "Topic Title" },
  { key: "category", label: "Category" },
  { key: "uploadedBy", label: "Uploaded By" },
  { key: "fileName", label: "File Name" },
  { key: "uploadDate", label: "Upload Date" },
  { key: "status", label: "Status" },
];

export function LearningModalTable() {
  const handleFilterData = (
    data: LearningRecord[],
    filter: string,
    search: string
  ): LearningRecord[] => {
    return data.filter((record) => {
      const matchesSearch = 
        record.topicTitle.toLowerCase().includes(search.toLowerCase()) ||
        record.fileName.toLowerCase().includes(search.toLowerCase());
      return matchesSearch;
    });
  };

  return (
    <ModalTable<LearningRecord, string>
      data={DEMO_LEARNING_RECORDS}
      columns={COLUMNS}
      totalRecords={TOTAL_RECORDS}
      enableSearch={true}
      searchPlaceholder="Search..."
      onFilterData={handleFilterData}
      renderRow={(record) => (
        <LearningModalRow key={record.id} record={record} />
      )}
      enableCheckboxes={true}
      rowsPerPageOptions={[10, 20, 50, 100]}
      defaultRowsPerPage={10}
      showDCRButton={false}
    />
  );
}
