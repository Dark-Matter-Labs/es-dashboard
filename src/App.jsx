import { useState } from "react";

const data = [{
  id: 0,
  title: 'Scenario A - Baseline',
  description: 'Ecosystem Services value from all existing trees in a 50m buffer from road.',
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
    },
    {
      "group": "Climate Change Adaptation & Mitigation",
      "function": "Reduction of urban heat island effect",
      "tool": "Reduced Hospital Costs from Heat-Related Morbidity",
      "amount": 49,
      "unit": "patient days per yr",
      "benefit_per_year": 177491,
      "gross_value": 0,
      "indirect": 1575044,
      "timeframe": 10
    },
    {
      "group": "Climate Change Adaptation & Mitigation",
      "function": "Carbon storage and sequestration",
      "tool": "Carbon sequestered by trees",
      "amount": 701,
      "unit": "kgCO2e sequestered",
      "benefit_per_year": 2764,
      "gross_value": 0,
      "indirect": 69343,
      "timeframe": 50
    },
    {
      "group": "Water Management & Flood Alleviation",
      "function": "Interception, storage and infiltration of rainwater",
      "tool": "Energy and carbon emissions savings from reduced stormwater volume entering combined sewers",
      "amount": 77814213,
      "unit": "L/yr water diverted from sewers",
      "benefit_per_year": 13677,
      "gross_value": 260347,
      "indirect": 0,
      "timeframe": 30
    },
    {
      "group": "Water Management & Flood Alleviation",
      "function": "Interception, storage and infiltration of rainwater",
      "tool": "Reduced carbon emissions",
      "amount": 27.34,
      "unit": "tCO2e/yr carbon saved",
      "benefit_per_year": 2242,
      "gross_value": 260347,
      "indirect": 0,
      "timeframe": 30
    },
    {
      "group": "Health & Well-being",
      "function": "Provision of attractive opportunities for walking and cycling",
      "tool": "Reduced mortality from increased walking and cycling",
      "amount": 2,
      "unit": "lives saved per yr",
      "benefit_per_year": 7594328,
      "gross_value": 0,
      "indirect": 65288500,
      "timeframe": 10
    },
    {
      "group": "Health & Well-being",
      "function": "Stress and mental illness alleviation",
      "tool": "Health cost savings from mental health disorders",
      "amount": 0,
      "unit": "number of patients",
      "benefit_per_year": 0,
      "gross_value": 0,
      "indirect": 0,
      "timeframe": 20
    },
    {
      "group": "Health & Well-being",
      "function": "Air pollution removal",
      "tool": "Reduced air pollution",
      "amount": 0.02,
      "unit": "t/yr of NO2 removed",
      "benefit_per_year": 8781,
      "gross_value": 220325,
      "indirect": 0,
      "timeframe": 50
    },
    {
      "group": "Health & Well-being",
      "function": "Air pollution removal",
      "tool": "Reduced air pollution",
      "amount": 0.04,
      "unit": "t/yr of O3 removed",
      "benefit_per_year": 8781,
      "gross_value": 220325,
      "indirect": 0,
      "timeframe": 50
    },
    {
      "group": "Health & Well-being",
      "function": "Air pollution removal",
      "tool": "Reduced air pollution",
      "amount": 0.08,
      "unit": "t/yr of PM2.5 removed",
      "benefit_per_year": 8781,
      "gross_value": 220325,
      "indirect": 0,
      "timeframe": 50
    },
    {
      "group": "Biodiversity",
      "function": "Provision, protection and enhancement of natural habitats",
      "tool": "Willingness to pay for protection or enhancement of biodiversity",
      "amount": 0,
      "unit": "Ha of land w/ biodiversity value",
      "benefit_per_year": 0,
      "gross_value": 0,
      "indirect": 0,
      "timeframe": 10
    },
    {
      "group": "Biodiversity",
      "function": "Provision, protection and enhancement of natural habitats",
      "tool": "Contribution to biodiversity targets",
      "amount": 0,
      "unit": "Ha of grassland habitat",
      "benefit_per_year": 0,
      "gross_value": 0,
      "indirect": 0,
      "timeframe": 40
    }
  ]
},
{
  id: 1,
  title: 'Scenario B - Optimistic',
  description: 'Ecosystem Services value from trees that are to be cut according to a technical survey commissioned by BVG (public transport agency).',
  trees: 35,
  canopy_cover: 0.31,
  total_benefit: -2667903,
  benefits: [
      {
        "group": "Climate Change Adaptation & Mitigation",
        "function": "Shelter from wind",
        "tool": "Reduced building energy consumption for heating",
        "amount": -82400,
        "unit": "kWh/yr energy saved",
        "benefit_per_year": -7129,
        "gross_value": -61364,
        "indirect": 0,
        "timeframe": 10
      },
      {
        "group": "Climate Change Adaptation & Mitigation",
        "function": "Shelter from wind",
        "tool": "Avoided carbon emissions from building energy saving for heating",
        "amount": -17965,
        "unit": "kgCO2/yr not emitted",
        "benefit_per_year": -3539,
        "gross_value": 0,
        "indirect": -31407,
        "timeframe": 10
      },
      {
        "group": "Climate Change Adaptation & Mitigation",
        "function": "Reduction of urban heat island effect",
        "tool": "Reduced peak summer surface temperatures",
        "amount": 0.8,
        "unit": "°C in surf. temperature",
        "benefit_per_year": 0,
        "gross_value": 0,
        "indirect": 0,
        "timeframe": 0
      },
      {
        "group": "Climate Change Adaptation & Mitigation",
        "function": "Reduction of urban heat island effect",
        "tool": "Reduced Heat-Related Mortality",
        "amount": 0,
        "unit": "lives saved per yr",
        "benefit_per_year": -258793,
        "gross_value": 0,
        "indirect": -2296519,
        "timeframe": 10
      },
      {
        "group": "Climate Change Adaptation & Mitigation",
        "function": "Reduction of urban heat island effect",
        "tool": "Reduced Hospital Costs from Heat-Related Morbidity",
        "amount": -6,
        "unit": "patient days per yr",
        "benefit_per_year": -22100,
        "gross_value": 0,
        "indirect": -196112,
        "timeframe": 10
      },
      {
        "group": "Climate Change Adaptation & Mitigation",
        "function": "Carbon storage and sequestration",
        "tool": "Carbon sequestered by trees",
        "amount": -87,
        "unit": "kgCO2e sequestered",
        "benefit_per_year": -344,
        "gross_value": 0,
        "indirect": -8634,
        "timeframe": 50
      },
      {
        "group": "Water Management & Flood Alleviation",
        "function": "Interception, storage and infiltration of rainwater",
        "tool": "Energy and carbon emissions savings from reduced stormwater volume entering combined sewers",
        "amount": -6939182,
        "unit": "L/yr water diverted from sewers",
        "benefit_per_year": -1220,
        "gross_value": -23217,
        "indirect": 0,
        "timeframe": 30
      },
      {
        "group": "Water Management & Flood Alleviation",
        "function": "Interception, storage and infiltration of rainwater",
        "tool": "Reduced carbon emissions",
        "amount": -2.44,
        "unit": "tCO2e/yr carbon saved",
        "benefit_per_year": -200,
        "gross_value": -23217,
        "indirect": 0,
        "timeframe": 30
      },
      {
        "group": "Health & Well-being",
        "function": "Provision of attractive opportunities for walking and cycling",
        "tool": "Reduced mortality from increased walking and cycling",
        "amount": 0,
        "unit": "lives saved per yr",
        "benefit_per_year": 0,
        "gross_value": 0,
        "indirect": 0,
        "timeframe": 10
      },
      {
        "group": "Health & Well-being",
        "function": "Stress and mental illness alleviation",
        "tool": "Health cost savings from mental health disorders",
        "amount": 0,
        "unit": "number of patients",
        "benefit_per_year": 0,
        "gross_value": 0,
        "indirect": 0,
        "timeframe": 20
      },
      {
        "group": "Health & Well-being",
        "function": "Air pollution removal",
        "tool": "Reduced air pollution",
        "amount": -0.003,
        "unit": "t/yr of NO2 removed",
        "benefit_per_year": -1093,
        "gross_value": -27433,
        "indirect": 0,
        "timeframe": 50
      }  
  ]
},
{
  id: 2,
  title: 'Scenario C - Realistic',
  description: 'Ecosystem Services value from all trees considered at risk of being cut off if they are located within the construction area or their crown diameter area overlaps with the construction area based on the Berlin Tree Protection Ordinance.',
  trees: 131,
  canopy_cover: 1.38,
  total_benefit: -11395579,
  benefits: [
    {
      "group": "Climate Change Adaptation & Mitigation",
      "function": "Shelter from wind",
      "tool": "Reduced building energy consumption for heating",
      "amount": -184000,
      "unit": "kWh/yr energy saved",
      "benefit_per_year": -16907,
      "gross_value": -145530,
      "indirect": 0,
      "timeframe": 10
    },
    {
      "group": "Climate Change Adaptation & Mitigation",
      "function": "Shelter from wind",
      "tool": "Avoided carbon emissions from building energy saving for heating",
      "amount": -42239,
      "unit": "kgCO2/yr not emitted",
      "benefit_per_year": -8321,
      "gross_value": 0,
      "indirect": -73841,
      "timeframe": 10
    },
    {
      "group": "Climate Change Adaptation & Mitigation",
      "function": "Reduction of urban heat island effect",
      "tool": "Reduced peak summer surface temperatures",
      "amount": 0.8,
      "unit": "°C in surf. temperature",
      "benefit_per_year": 0,
      "gross_value": 0,
      "indirect": 0,
      "timeframe": 0
    },
    {
      "group": "Climate Change Adaptation & Mitigation",
      "function": "Reduction of urban heat island effect",
      "tool": "Reduced Heat-Related Mortality",
      "amount": 0,
      "unit": "lives saved per yr",
      "benefit_per_year": -1119544,
      "gross_value": 0,
      "indirect": -9934785,
      "timeframe": 10
    },
    {
      "group": "Climate Change Adaptation & Mitigation",
      "function": "Reduction of urban heat island effect",
      "tool": "Reduced Hospital Costs from Heat-Related Morbidity",
      "amount": -27,
      "unit": "patient days per yr",
      "benefit_per_year": -95604,
      "gross_value": 0,
      "indirect": -848384,
      "timeframe": 10
    },
    {
      "group": "Climate Change Adaptation & Mitigation",
      "function": "Carbon storage and sequestration",
      "tool": "Carbon sequestered by trees",
      "amount": -378,
      "unit": "kgCO2e sequestered",
      "benefit_per_year": -1489,
      "gross_value": 0,
      "indirect": -37351,
      "timeframe": 50
    },
    {
      "group": "Water Management & Flood Alleviation",
      "function": "Interception, storage and infiltration of rainwater",
      "tool": "Energy and carbon emissions savings from reduced stormwater volume entering combined sewers",
      "amount": -35419864,
      "unit": "L/yr water diverted from sewers",
      "benefit_per_year": -6225,
      "gross_value": -118506,
      "indirect": 0,
      "timeframe": 30
    },
    {
      "group": "Water Management & Flood Alleviation",
      "function": "Interception, storage and infiltration of rainwater",
      "tool": "Reduced carbon emissions",
      "amount": -12.44,
      "unit": "tCO2e/yr carbon saved",
      "benefit_per_year": -1020,
      "gross_value": -118506,
      "indirect": 0,
      "timeframe": 30
    },
    {
      "group": "Health & Well-being",
      "function": "Provision of attractive opportunities for walking and cycling",
      "tool": "Reduced mortality from increased walking and cycling",
      "amount": 0,
      "unit": "lives saved per yr",
      "benefit_per_year": 0,
      "gross_value": 0,
      "indirect": 0,
      "timeframe": 10
    },
    {
      "group": "Health & Well-being",
      "function": "Stress and mental illness alleviation",
      "tool": "Health cost savings from mental health disorders",
      "amount": 0,
      "unit": "number of patients",
      "benefit_per_year": 0,
      "gross_value": 0,
      "indirect": 0,
      "timeframe": 20
    },
    {
      "group": "Health & Well-being",
      "function": "Air pollution removal",
      "tool": "Reduced air pollution",
      "amount": -0.011,
      "unit": "t/yr of NO2 removed",
      "benefit_per_year": -4730,
      "gross_value": -118676,
      "indirect": 0,
      "timeframe": 50
    }
  ]
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
        <h1 className=" text-gray-800">Ecosystem Services Indicative Valuation Dashboard</h1>
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4">
          <div className="w-full md:w-1/3">
            <label className="block text-sm font-medium text-gray-700">Scenario</label>
            <select value={selectedScenario.id} onChange={handleSelectChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary">
            {data.map(scenario => (
              <option key={scenario.id} value={scenario.id}>{scenario.title}</option>
            ))}
            </select>

            <div className="w-full mt-4 p-4 bg-gray-50 border rounded-lg ">
            <h2 className="text-sm font-semibold text-gray-600">Description</h2>
            <p>{selectedScenario.description}</p>
            </div>
          </div>

          <div className="flex flex-col w-full md:w-2/3 space-y-4 md:space-y-0 md:flex-row md:space-x-4">
            <div className="w-full md:w-1/2 p-4 bg-gray-50 border rounded-lg">
              <h2 className="text-sm font-semibold text-gray-600">Site Location</h2>
              <p className="text-gray-800">Berlin, Germany</p>
              <h2 className="text-sm font-semibold text-gray-600">Site Area</h2>
              <p className="text-gray-800">16.83 Ha</p>
            </div>
            <div className="w-full md:w-1/2 p-4 bg-gray-50 border rounded-lg">
              <h2 className="text-sm font-semibold text-gray-600">Number of Trees</h2>
              <p className="text-gray-800">{selectedScenario.trees}</p>
              <h2 className="text-sm font-semibold text-gray-600">Canopy Cover</h2>
              <p className="text-gray-800">{selectedScenario.canopy_cover} Ha</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className={selectedScenario.total_benefit > 0 ? ' bg-green-100 p-6 rounded-lg' : 'bg-red-100 p-6 rounded-lg'}>
            <h3 className="text-xl font-bold text-gray-800">Total Ecosystem Service Valuation</h3>
            <p className={selectedScenario.total_benefit > 0 ? "text-green-600 text-2xl font-semibold" : "text-red-600 text-2xl font-semibold" }>{euro.format(selectedScenario.total_benefit)}</p>
          </div>
          <div className={(selectedScenario.total_benefit / selectedScenario.trees) > 0 ? ' bg-green-100 p-6 rounded-lg' : 'bg-red-100 p-6 rounded-lg'}>
            <h3 className="text-xl font-bold text-gray-800">Average Value Generated per Tree</h3>
            <p className={(selectedScenario.total_benefit / selectedScenario.trees) > 0 ? "text-green-600 text-2xl font-semibold" : "text-red-600 text-2xl font-semibold" }>{euro.format(selectedScenario.total_benefit / selectedScenario.trees)}</p>
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
