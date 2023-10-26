export default function ClockName({ value, onChange }) {
  return (
    <div className="input-wrapper">
      <label htmlFor="name">Name</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Enter clock name"
      />
    </div>
  );
}
