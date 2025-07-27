import { useState, useEffect, useMemo } from "react";
import { Modal, Button, Form, SelectPicker, FlexboxGrid } from "rsuite";
import EditorComponent from "./EditorComponent";

const typeOptions = [
  { label: "Policy Updates", value: "Policy Updates" },
  { label: "Event Notifications", value: "Event Notifications" },
  { label: "Compliance Alerts", value: "Compliance Alerts" },
  { label: "IT Notices", value: "IT Notices" },
];

const emptyForm = { id: null, title: "", type: "", description: "" };

export default function AnnouncementModal({
  open,
  onClose,
  onSave,
  initialData,
  mode,
}) {
  const [formValue, setFormValue] = useState(emptyForm);

  // ✅ Compute modal title dynamically
  const modalTitle = useMemo(() => {
    if (mode === "view") return "View Announcement";
    return initialData ? "Edit Announcement" : "New Announcement";
  }, [mode, initialData]);

  // ✅ Prefill when editing/viewing
  useEffect(() => {
    if (initialData) {
      setFormValue({
        id: initialData.id ?? null,
        title: initialData.title,
        type: initialData.type,
        description: initialData.description,
      });
    } else {
      setFormValue(emptyForm);
    }
  }, [initialData]);

  const handleClose = () => {
    setFormValue(emptyForm);
    onClose();
  };

  const handleSubmit = () => {
    if (!formValue.title || !formValue.type || !formValue.description) return;
    onSave(formValue);
    setFormValue(emptyForm);
  };

  const isReadOnly = mode === "view";
  const isSaveDisabled =
    !formValue.title || !formValue.type || !formValue.description;

  return (
    <Modal open={open} onClose={handleClose} size="md">
      <Modal.Header>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <hr />

      <Modal.Body>
        <Form fluid formValue={formValue} onChange={setFormValue}>
          <FlexboxGrid justify="start" align="middle" style={{ gap: "1rem" }}>
            {/* ✅ Title */}
            <FlexboxGrid.Item colspan={16}>
              {isReadOnly ? (
                <h3>{formValue.title}</h3>
              ) : (
                <Form.Group>
                  <Form.ControlLabel>Title</Form.ControlLabel>
                  <Form.Control name="title" placeholder="Enter title" />
                </Form.Group>
              )}
            </FlexboxGrid.Item>

            {/* ✅ Type Picker (hidden in view mode) */}
            {!isReadOnly && (
              <FlexboxGrid.Item colspan={7}>
                <Form.Group>
                  <Form.ControlLabel>Type</Form.ControlLabel>
                  <SelectPicker
                    data={typeOptions}
                    value={formValue.type}
                    onChange={(value) =>
                      setFormValue((prev) => ({ ...prev, type: value }))
                    }
                    style={{ width: "100%" }}
                    placeholder="Select type"
                  />
                </Form.Group>
              </FlexboxGrid.Item>
            )}
          </FlexboxGrid>

          {/* ✅ Description via Editor */}
          <Form.Group className="mt-2">
            {!isReadOnly && <Form.ControlLabel>Description</Form.ControlLabel>}
            <EditorComponent
              value={formValue.description}
              onChange={(val) =>
                setFormValue((prev) => ({ ...prev, description: val }))
              }
              readOnly={isReadOnly}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      {/* ✅ Footer */}
      <Modal.Footer>
        {!isReadOnly && (
          <Button
            appearance="primary"
            disabled={isSaveDisabled}
            onClick={handleSubmit}
          >
            Save
          </Button>
        )}
        <Button appearance="subtle" onClick={handleClose}>
          {isReadOnly ? "Close" : "Cancel"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
