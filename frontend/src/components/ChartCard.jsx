function ChartCard({ title }) {
  return (
    <div
      style={{
        width: "260px",
        border: "1px solid gray",
        borderRadius: "10px",
        padding: "20px",
        margin: "10px",
        textAlign: "center"
      }}
    >
      <h3>{title}</h3>

      <img
        src="https://via.placeholder.com/220x150"
        alt="chart"
      />
    </div>
  );
}

export default ChartCard;