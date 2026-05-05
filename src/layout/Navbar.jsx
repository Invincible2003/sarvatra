export default function Navbar({ onCountryChange }) {
  return (
    <div className="bg-slate-800 text-white p-4 flex justify-between">
      <h1 className="font-bold text-lg">Dashboard</h1>

      <select
        className="bg-slate-700 px-3 py-1 rounded"
        onChange={(e) => onCountryChange(e.target.value)}
      >
        <option value="IN">India</option>
        <option value="US">USA</option>
        <option value="CN">China</option>
        <option value="JP">Japan</option>
        <option value="DE">Germany</option>
        <option value="GB">UK</option>
      </select>
    </div>
  );
}