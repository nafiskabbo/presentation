const pptxgen = require('pptxgenjs');
const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';
const s = pres.addSlide();
s.background = { fill: 'FFFFFF' };

const chartData = [
  { name: 'Standard CoT', labels: ['GSM8K', 'CSQA', 'HotpotQA'], values: [77.0, 72.5, 29.0] },
  { name: 'Round 1', labels: ['GSM8K', 'CSQA', 'HotpotQA'], values: [75.2, 63.5, 26.0] },
  { name: 'Round 2', labels: ['GSM8K', 'CSQA', 'HotpotQA'], values: [72.6, 55.3, 25.0] }
];

s.addChart(pres.charts.BAR, chartData, {
  x: 0.6, y: 1.0, w: 8.8, h: 4.0,
  showValue: true,
  dataLabelPosition: 'outEnd',
  chartColors: ['1E293B', 'D97706', '800020'],
  valAxisMaxVal: 100,
  showLegend: true,
  legendPos: 'b'
});

pres.writeFile({ fileName: 'output/test_chart.pptx' })
  .then(() => console.log('Test chart written successfully'))
  .catch(e => console.error(e));
