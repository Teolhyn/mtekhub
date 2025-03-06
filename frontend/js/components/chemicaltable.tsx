import React from "react";

export interface ChemicalOrder {
  chemical_name: string,
  cas_number: string,
  orderer: string;
}

export interface ChemicalOrderTableProps {
  orders: ChemicalOrder[];
}

const ChemicalTable: React.FC<ChemicalOrderTableProps> = ({ orders }) => {

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Chemical Name</th>
            <th>CAS Number</th>
            <th>Orderer</th>
          </tr>
        </thead>
        <tbody>
    {orders.length > 0 ? (
                orders.map((order, index) => (
                  <tr key={index} className="odd:bg-white even:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                    <td className="border border-gray-300 px-4 py-2">{order.chemical_name}</td>
                    <td className="border border-gray-300 px-4 py-2">{order.cas_number}</td>
                    <td className="border border-gray-300 px-4 py-2">{order.orderer}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center border border-gray-300 px-4 py-2">
                    No chemical orders available.
                  </td>
                </tr>
              )}
        </tbody>
      </table>
    </div>
  );
};

export default ChemicalTable;
