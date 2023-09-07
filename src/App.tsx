/** @format */

import React, { useState } from 'react';

import './App.css';

interface TableRow {
  id: number;
  longText: string;
  shortText: string;
}

type ColumnName = 'longText' | 'shortText';

const initialData: TableRow[] = [
  { id: 1, longText: 'This is a long text example', shortText: 'Short 1' },
  { id: 2, longText: 'Another long text here', shortText: 'Short 2' },
  {
    id: 3,
    longText: 'This is another long text example',
    shortText: 'What if this is also a long text?',
  },
  {
    id: 4,
    longText: 'short text',
    shortText: 'reverse role this will become long text',
  },
  {
    id: 5,
    longText: 'This will the the longest text example for this column aaaaaaaa',
    shortText: 'Short 3',
  },
];

const SortableTable: React.FC = () => {
  const [data, setData] = useState<TableRow[]>(initialData);
  const [sortBy, setSortBy] = useState<string>('');

  const sortByColumn = (columnName: ColumnName) => {
    // Sort the data based on the selected column
    const sortedData = [...data].sort((a, b) => {
      if (a[columnName] < b[columnName]) return -1;
      if (a[columnName] > b[columnName]) return 1;
      return 0;
    });

    // Reverse the order if the same column is clicked twice
    if (sortBy === columnName) {
      setData(sortedData.reverse());
    } else {
      setData(sortedData);
    }

    setSortBy(columnName);
  };

  return (
    <div>
      <table className='sortable-table'>
        <thead>
          <tr>
            <th onClick={() => sortByColumn('longText')}>
              Long Text
              {sortBy === 'longText' ? ' ▲' : ' ▼'}
            </th>
            <th onClick={() => sortByColumn('shortText')}>
              Short Text
              {sortBy === 'shortText' ? ' ▲' : ' ▼'}
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.id}>
              <td>{row.longText}</td>
              <td>{row.shortText}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SortableTable;
