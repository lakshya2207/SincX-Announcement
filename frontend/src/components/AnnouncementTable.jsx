import { Table, Button, ButtonGroup, Tag, FlexboxGrid } from "rsuite";
import QuillDeltaToHtmlConverter from "quill-delta-to-html";

import EditIcon from "@rsuite/icons/Edit";
import TrashIcon from "@rsuite/icons/Trash";
import { BsEye } from "react-icons/bs";

const { Column, HeaderCell, Cell } = Table;

export default function AnnouncementTable({ data, onEdit, onDelete, onView }) {
  return (
    <Table
      data={data}
      bordered
      cellBordered
      autoHeight
      style={{ marginTop: "16px", borderRadius: "8px" }}
    >
      {/* ✅ Title */}
      <Column flexGrow={1}>
        <HeaderCell>Title</HeaderCell>
        <Cell dataKey="title" style={{ fontWeight: 600 }} />
      </Column>

      {/* ✅ Type with Color Tag */}
      <Column flexGrow={1}>
        <HeaderCell>Type</HeaderCell>
        <Cell>
          {(rowData) => {
            const typeColors = {
              "Policy Updates": "blue",
              "IT Notices": "orange",
              "HR Notices": "green",
              General: "violet",
            };
            return (
              // <Tag >
              <p>

                {rowData.type}
              </p>
              // </Tag>
            );
          }}
        </Cell>
      </Column>

      {/* ✅ Description – Convert Delta → HTML */}

      {/* ✅ Actions */}
      <Column flexGrow={1}>
        <HeaderCell>Actions</HeaderCell>
        <Cell>
          {(rowData) => (
           <FlexboxGrid style={{ gap: "5px" }}>
  {/* View Button */}
  <Button
    size="xs"
    appearance="ghost"
    onClick={() => onView(rowData)}
    startIcon={<BsEye />}
  >
    <span className="hidden sm:inline">View</span>
  </Button>

  {/* Edit Button */}
  <Button
    size="xs"
    appearance="ghost"
    onClick={() => onEdit(rowData)}
    startIcon={<EditIcon />}
  >
    <span className="hidden sm:inline">Edit</span>
  </Button>

  {/* Delete Button */}
  <Button
    size="xs"
    appearance="primary"
    color="red"
    onClick={() => onDelete(rowData.id)}
    startIcon={<TrashIcon />}
  >
    <span className="hidden sm:inline">Delete</span>
  </Button>
</FlexboxGrid>

          )}
        </Cell>
      </Column>
    </Table>
  );
}
