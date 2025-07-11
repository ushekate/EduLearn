'use client';

import React from 'react';

export const Table = ({ columns = [], data = [] }) => {
  return (
    <div className="overflow-x-auto rounded-md border border-gray-200">
      <table className="min-w-full text-sm text-left text-gray-700">
        <thead className="bg-gray-100 sticky top-0 z-10 text-xs uppercase font-semibold text-gray-600">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="px-4 py-2 border-b">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="p-4 text-center text-gray-500">
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr
                key={i}
                className="hover:bg-gray-50 transition cursor-pointer"
                onClick={row.onClick}
              >
                {row.values.map((val, j) => (
                  <td key={j} className="px-4 py-2 border-b">
                    {val}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
