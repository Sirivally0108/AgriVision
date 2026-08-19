function StatsCard({ title, value }) {
  return (
    <div
      style={{
        width: "220px",
        padding: "20px",
        border: "1px solid green",
        borderRadius: "10px",
        textAlign: "center",
        margin: "10px"
      }}
    >
      <h3>{title}</h3>

      <h2>{value}</h2>
    </div>
  );
}

export default StatsCard;