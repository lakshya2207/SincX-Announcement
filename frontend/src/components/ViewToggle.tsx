// components/ViewToggle.jsx
export default function ViewToggle({ view, setView }) {
  return (
    <div className="flex gap-2">
      <button onClick={() => setView("grid")}>Grid</button>
      <button onClick={() => setView("table")}>Table</button>
    </div>
  );
}
