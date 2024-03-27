import React, { useState } from 'react'
import * as XLSX from 'xlsx';

function ImportFile() {
  const [products, setProducts] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      console.log("parsedData", parsedData)
      // Assuming the Excel file has a specific structure where product information is located
      const productsData = parsedData.map(row => ({
        name: row[0], // Assuming name is in the first column
        price: row[1], // Assuming price is in the second column
        // Add other product properties as needed
      }));

      setProducts(productsData);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      {products.length > 0 && (
        <div>
          <h2>Imported Products:</h2>
          <ul>
            {products.map((product, index) => (
              <li key={index}>
                {product.name} - {product.price}
              </li>
            ))}
          </ul>
          {/* Here you can send products data to your backend to create products */}
        </div>
      )}
    </div>
  )
}

export default ImportFile