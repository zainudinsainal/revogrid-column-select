import './style.css';
import Vue from 'vue';
import Grid from '@revolist/vue-datagrid';
import SelectColumnType from '../src';

// function generateHeader(index: number) {
//   const asciiFirstLetter = 65;
//   const lettersCount = 26;
//   let div = index + 1;
//   let label = '';
//   let pos: number;
//   while (div > 0) {
//       pos = (div - 1) % lettersCount;
//       label = String.fromCharCode(asciiFirstLetter + pos) + label;
//       div = parseInt(((div - pos) / lettersCount).toString(), 10);
//   }
//   return label.toLowerCase();
// }
// function generateFakeDataObject(rowsNumber: number, colsNumber: number) {
//   const result: Record<any, any> = [];
//   const columns: Record<number, any> = {};
//   const all = colsNumber * rowsNumber;
//   for (let j = 0; j < all; j++) {
//       let col = j%colsNumber;
//       let row = j/colsNumber|0;
//       if (!result[row]) {
//           result[row] = {};
//       }
//       if (!columns[col]) {
//           columns[col] = {
//               name: generateHeader(col),
//               prop: col,
//           }
//       }
//       result[row][col] = row + ':' + col;
//       if (col === 1) {
//         /** select data as object*/
//         columns[col] = {
//             ...columns[col],
//             columnType: 'select',
//             size: 150,
//             labelKey: 'label',
//             valueKey: 'value',
//             source: [
//               { label: 'According', value: 'a' },
//               { label: 'Over', value: 'b' },
//               { label: 'Source', value: 's' }
//             ]
//         }; 
//         result[row][col] = 'b';
//        /**  select data as array string[] */
//         // columns[col] = {
//         //     ...columns[col],
//         //     columnType: 'select',
//         //     size: 150,
//         //     source: ['According', 'Source']
//         // }; 
//         // result[row][col] = 'According';
//       }
//   }
//   let headers = Object.keys(columns).map((k) => columns[parseInt(k, 10)]);
//   return {
//     source: result,
//     headers
//   };
// }

function generateSampleData() {
  const result: any[] = [
    { "attribute_18": "742" },
    { "attribute_18": "743" },
  ]
  let headers = [
    {
      columnType: "select",
      labelKey: "value",
      valueKey: "id",
      name: "Hardheid",
      prop: "attribute_18",
      readonly: false,
      size: 150,
      source: [
        { id: "742", value: "Medium" },
        { id: "743", value: "Hard" },
      ],
      appendSource: [
        { id: "new", value: "Create Value" }
      ]
    }
  ]
  return {
    source: result,
    headers
  };
}

new Vue({
  el: '#app',
  components: {
    Grid
  },
  render: (h) => {
    // console.log(generateFakeDataObject(100, 5));
    // const {source, headers} = generateFakeDataObject(100, 5);
    const {source, headers} = generateSampleData();
    // console.log({ source, headers })
    return h('div', { class: {'tile large': true} }, [h(Grid, {
      props: {
        source,
        resize: true,
        range: true,
        columns: headers,
        theme: 'material',
        columnTypes: {
          'select': new SelectColumnType()
        }
      }
    })]);
  }
});
