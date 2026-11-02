import sampleGridData from './sampleGridData.json';

const getItemName = (item) => {
  if (typeof item === 'string') {
    return item;
  }

  return item?.label ?? item?.title ?? item?.name ?? item?.text ?? '';
};

export default function GridData({ selectedItems = [] }) {
  const selectedNames = new Set(
    selectedItems.map((item) => getItemName(item).trim().toLowerCase())
  );
  const rows = sampleGridData.filter((row) =>
    selectedNames.has(row.name.toLowerCase())
  );

  if (selectedItems.length === 0) {
    return null;
  }

  return (
    <div style={{ marginTop: 24, overflowX: 'auto' }}>
      <h2>Selected menu data</h2>
      {rows.length === 0 ? (
        <p>No sample data found for the selected menu item.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr>
              <th style={cellStyle}>Type</th>
              <th style={cellStyle}>Filename</th>
              <th style={cellStyle}>Created date</th>
              <th style={cellStyle}>Modified date</th>
              <th style={cellStyle}>File format</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={`${row.name}-${row.filename}`}>
                <td style={cellStyle}>{row.type}</td>
                <td style={cellStyle}>{row.filename}</td>
                <td style={cellStyle}>{row.createdDate}</td>
                <td style={cellStyle}>{row.modifiedDate}</td>
                <td style={cellStyle}>{row.fileFormat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const cellStyle = {
  padding: '10px 12px',
  border: '1px solid #ddd',
};