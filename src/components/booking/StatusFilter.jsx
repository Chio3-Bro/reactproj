import { useSearchParams } from "react-router-dom";

function StatusFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentStatus = searchParams.get("status") || "";

  const handleChange = (e) => {
    const value = e.target.value;

    if (value) {
      searchParams.set("status", value);
    } else {
      searchParams.delete("status");
    }

    setSearchParams(searchParams);
  };

  return (
    <div className="filter">
      <label htmlFor="statusFilter">Filter by status</label>
      <select id="statusFilter" value={currentStatus} onChange={handleChange}>
        <option value="">All</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
}

export default StatusFilter;
