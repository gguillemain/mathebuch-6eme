import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const DecimalNumberTable = () => {
  const [number, setNumber] = useState('310 876 543,19');
  const [highlightedPosition, setHighlightedPosition] = useState(null);

  const formatNumber = (num) => {
    const cleanNum = num.replace(/\s/g, '').replace('.', ',');
    const [integerPart, decimalPart = ''] = cleanNum.split(',');
    
    const formattedInteger = integerPart
      .split('')
      .reverse()
      .reduce((acc, digit, i) => {
        const shouldAddSpace = i > 0 && i % 3 === 0;
        return shouldAddSpace ? `${digit} ${acc}` : `${digit}${acc}`;
      }, '');

    return decimalPart ? `${formattedInteger},${decimalPart}` : formattedInteger;
  };

  const getDigitValue = (position) => {
    const cleanNumber = number.replace(/\s/g, '');
    const [integerPart, decimalPart = ''] = cleanNumber.split(',');
    
    if (position === 12) return ',';
    
    if (position < 12) {
      const reversedPosition = 11 - position;
      const digit = integerPart[integerPart.length - 1 - reversedPosition];
      return digit || '';
    }
    
    const decimalPosition = position - 13;
    return decimalPart[decimalPosition] || '';
  };

  const getColumnClass = (position) => {
    return `w-20 h-12 border text-center ${
      highlightedPosition === position 
      ? 'bg-blue-100' 
      : 'hover:bg-gray-50'
    }`;
  };

  const isCommaColumn = (index) => index === 12;

  return (
    <Card className="w-full max-w-5xl mx-auto">
      <CardHeader>
        <h3 className="text-lg font-semibold">
          Stellenwerttafel / Tableau de numération
        </h3>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th colSpan="3" className="border px-2">Milliarden</th>
                <th colSpan="3" className="border px-2">Millionen</th>
                <th colSpan="3" className="border px-2">Tausend</th>
                <th colSpan="3" className="border px-2">Einer</th>
                <th className="border px-2">,</th>
                <th colSpan="2" className="border px-2">Dezimal</th>
              </tr>
              <tr>
                <th className="border w-20">H</th>
                <th className="border w-20">Z</th>
                <th className="border w-20">E</th>
                <th className="border w-20">H</th>
                <th className="border w-20">Z</th>
                <th className="border w-20">E</th>
                <th className="border w-20">H</th>
                <th className="border w-20">Z</th>
                <th className="border w-20">E</th>
                <th className="border w-20">H</th>
                <th className="border w-20">Z</th>
                <th className="border w-20">E</th>
                <th className="border w-10">,</th>
                <th className="border w-20">Z</th>
                <th className="border w-20">H</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {[...Array(15)].map((_, index) => (
                  <td
                    key={index}
                    className={isCommaColumn(index) ? 'border w-10 text-center' : getColumnClass(index)}
                    onClick={() => !isCommaColumn(index) && setHighlightedPosition(index)}
                  >
                    {getDigitValue(index)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4">
          <input
            type="text"
            value={number}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/[^0-9,]/g, '');
              setNumber(formatNumber(rawValue));
            }}
            className="w-full p-2 border rounded"
            placeholder="Entrez un nombre / Geben Sie eine Zahl ein"
          />
        </div>

        {highlightedPosition !== null && !isCommaColumn(highlightedPosition) && (
          <div className="mt-4 p-4 bg-blue-50 rounded">
            <p className="text-sm">
              Position : {
                highlightedPosition < 12 
                  ? `${Math.floor(highlightedPosition/3) === 0 ? 'Milliarden' 
                    : Math.floor(highlightedPosition/3) === 1 ? 'Millionen'
                    : Math.floor(highlightedPosition/3) === 2 ? 'Tausend'
                    : 'Einer'} (${highlightedPosition % 3 === 0 ? 'H' : highlightedPosition % 3 === 1 ? 'Z' : 'E'})`
                  : highlightedPosition === 13 ? 'Zehntel' : 'Hundertstel'
              }
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DecimalNumberTable;