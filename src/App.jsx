import { useState } from "react";

const data = [{
  id: 0,
  title: 'Scenario A',
  trees: 357,
  canopy_cover: 2.56,
  total_benefit: 86875623,
  benefits: [
    {
      group: 'Climate Change Adaptation & Mitigation',
      function: 'Shelter from wind',
      tool: 'Reduced building energy consumption for heating',
      amount: 1166560,
      unit: 'kWh/yr energy saved',
      benefit_per_year: 42625,
      gross_value: 366906,
      indirect: 0, 
      timeframe: 10
    },
    {
      group: 'Climate Change Adaptation & Mitigation',
      function: 'Shelter from wind',
      tool: 'Avoided carbon emissions from building energy saving for heating',
      amount: 223472,
      unit: 'kgCO2/yr not emitted',
      benefit_per_year: 44024,
      gross_value: 0,
      indirect: 390667, 
      timeframe: 10
    },
    {
      group: 'Climate Change Adaptation & Mitigation',
      function: 'Reduction of urban heat island effect',
      tool: 'Reduced peak summer surface temperatures',
      amount: -0.9,
      unit: '°C in surf. temperature reduction',
      benefit_per_year: 0,
      gross_value: 0,
      indirect: 0, 
      timeframe: 0
    },
    {
      group: 'Climate Change Adaptation & Mitigation',
      function: 'Reduction of urban heat island effect',
      tool: 'Reduced Heat-Related Mortality',
      amount: 0,
      unit: 'lives saved per yr',
      benefit_per_year: 2078458,
      gross_value: 0,
      indirect: 18444144, 
      timeframe: 10
    }
  ]
},
{
  id: 1,
  title: 'Scenario B',
  trees: 35,
  canopy_cover: 0.31,
  total_benefit: -2667903,
  benefits: []
},
{
  id: 2,
  title: 'Scenario C',
  trees: 131,
  canopy_cover: 1.38,
  total_benefit: -11395579,
  benefits: []
},
];

let euro = new Intl.NumberFormat('en-DE', {
  style: 'currency',
  currency: 'EUR',
});

function App() {
  const [selectedScenario, setSelectedScenario] = useState(data[0]);

  const handleSelectChange = (event) => {
    const selectedId = Number(event.target.value);
    const scenario = data.find((item) => item.id === selectedId);
    setSelectedScenario(scenario);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6">
        
        <h1 className="text-2xl font-bold text-gray-800">Ecosystem Services Indicative Valuation Dashboard</h1>
        
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4">
          <div className="w-full md:w-1/3">
            <label className="block text-sm font-medium text-gray-700">Scenario</label>
            <select value={selectedScenario.id} onChange={handleSelectChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary">
            {data.map(scenario => (
              <option key={scenario.id} value={scenario.id}>{scenario.title}</option>
            ))}
            </select>
          </div>

          <div className="flex flex-col w-full md:w-2/3 space-y-4 md:space-y-0 md:flex-row md:space-x-4">
            <div className="w-full md:w-1/2 p-4 bg-gray-50 border rounded-lg">
              <h2 className="text-sm font-semibold text-gray-600">Title</h2>
              <p className="text-gray-800">Ecosystem_Valuation_Model_BCW</p>
              <h2 className="text-sm font-semibold text-gray-600">Site Location</h2>
              <p className="text-gray-800">Berlin, Germany</p>
              <h2 className="text-sm font-semibold text-gray-600">Site Area</h2>
              <p className="text-gray-800">16.83 Ha</p>
            </div>
            <div className="w-full md:w-1/2 p-4 bg-gray-50 border rounded-lg">
              <h2 className="text-sm font-semibold text-gray-600">Number of Trees</h2>
              <p className="text-gray-800">{selectedScenario.trees}</p>
              <h2 className="text-sm font-semibold text-gray-600">Canopy Cover</h2>
              <p className="text-gray-800">{selectedScenario.canopy_cover}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className={selectedScenario.total_benefit > 0 ? ' bg-green-100 p-6 rounded-lg' : 'bg-red-100 p-6 rounded-lg'}>
            <h3 className="text-xl font-bold text-gray-800">NPV Total Ecosystem Service Valuation</h3>
            <p className={selectedScenario.total_benefit > 0 ? "text-green-600 text-2xl font-semibold" : "text-red-600 text-2xl font-semibold" }>{euro.format(selectedScenario.total_benefit)}</p>
          </div>
          <div className="bg-green-100 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-gray-800">Average Value Generated per Tree</h3>
            <p className="text-2xl font-semibold text-green-600">€ 3,000</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-800">Benefit Group</th>
                <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-800">Tree Function</th>
                <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-800">Tool</th>
                <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-800">Benefit Quantification</th>
                <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-800">€ Value per year</th>
                <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-800">Timeframe</th>
              </tr>
            </thead>
            <tbody>
            
                {selectedScenario.benefits.map(benefit => (
                    <tr key={benefit.tool}>
                  <td className="px-6 py-4 border-b text-sm text-gray-600">{benefit.group}</td>
                  <td className="px-6 py-4 border-b text-sm text-gray-600">{benefit.function}</td>
                  <td className="px-6 py-4 border-b text-sm text-gray-600">{benefit.tool}</td>
                  <td className="px-6 py-4 border-b text-sm text-gray-600">{benefit.amount +' '+benefit.unit}</td>
                  <td className="px-6 py-4 border-b text-sm text-gray-600">{benefit.benefit_per_year}</td>
                  <td className="px-6 py-4 border-b text-sm text-gray-600">{benefit.timeframe}</td>
                  </tr>
                ))}
             
            </tbody>
          </table>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg mt-6">
          <h3 className="text-lg font-semibold text-gray-800">Visualization of Benefits</h3>
          <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Chart Placeholder</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
