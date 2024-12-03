import { useState, useEffect } from "react";
import { ResponsivePie } from "@nivo/pie";
import Map, { Source, Layer } from "react-map-gl";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const dataLayer = {
  id: "data",
  type: "fill",
  paint: {
    "fill-color": {
      property: "area (ha)",
      stops: [[2, "#4F7942"]],
    },
    "fill-opacity": 1,
  },
};

const data = [
  {
    id: 0,
    title: "Scenario A - Baseline",
    description:
      "Ecosystem Services value from all existing trees in a 50m buffer from road.",
    trees: 357,
    canopy_cover: 2.56,
    total_benefit: 87551936,
    map: "scenario_a_canopy.geojson",
    benefits: [
      {
        group: "Climate Change Adaptation & Mitigation",
        rows: [
          {
            function: "Shelter from wind",
            tool: "Reduced building energy consumption for heating",
            amount: 1166560,
            unit: "kWh/yr energy saved",
            benefit_per_year: 42625,
            gross_value: 366906,
            indirect: 0,
            timeframe: 10,
          },
          {
            function: "Shelter from wind",
            tool: "Avoided carbon emissions from building energy saving for heating",
            amount: 223472,
            unit: "kgCO2/yr not emitted",
            benefit_per_year: 44024,
            gross_value: 0,
            indirect: 390667,
            timeframe: 10,
          },
          {
            function: "Reduction of urban heat island effect",
            tool: "Reduced peak summer surface temperatures",
            amount: -0.9,
            unit: "°C in surf. temperature reduction",
            benefit_per_year: 0,
            gross_value: 0,
            indirect: 0,
            timeframe: 0,
          },
          {
            function: "Reduction of urban heat island effect",
            tool: "Reduced Heat-Related Mortality",
            amount: 0,
            unit: "lives saved per yr",
            benefit_per_year: 2078458,
            gross_value: 0,
            indirect: 18444144,
            timeframe: 10,
          },
          {
            function: "Reduction of urban heat island effect",
            tool: "Reduced Hospital Costs from Heat-Related Morbidity",
            amount: 49,
            unit: "patient days per yr",
            benefit_per_year: 177491,
            gross_value: 0,
            indirect: 1575044,
            timeframe: 10,
          },
          {
            function: "Carbon storage and sequestration",
            tool: "Carbon sequestered by trees",
            amount: 701.43,
            unit: "kgCO2e sequestered",
            benefit_per_year: 2764,
            gross_value: 0,
            indirect: 69343,
            timeframe: 50,
          },
        ],
      },
      {
        group: "Water Management & Flood Alleviation",
        rows: [
          {
            function: "Interception, storage and infiltration of rainwater",
            tool: "Energy and carbon emissions savings from reduced stormwater volume entering combined sewers",
            amount: 77814213,
            unit: "L/yr water diverted from sewers",
            benefit_per_year: 15919,
            gross_value: 0,
            indirect: 0,
            timeframe: 30,
          },
          {
            function: "Interception, storage and infiltration of rainwater",
            tool: "Energy and carbon emissions savings from reduced stormwater volume entering combined sewers",
            amount: 68865.58,
            unit: "kWh/yr energy saved",
            benefit_per_year: 13677,
            gross_value: 260347,
            indirect: 0,
            timeframe: 30,
          },
          {
            function: "Interception, storage and infiltration of rainwater",
            tool: "Reduced carbon emissions",
            amount: 27.34,
            unit: "tCO2e/yr carbon saved",
            benefit_per_year: 2242,
            gross_value: 260347,
            indirect: 0,
            timeframe: 30,
          },
        ],
      },
      {
        group: "Health & Well-being",
        rows: [
          {
            function:
              "Provision of attractive opportunities for walking and cycling",
            tool: "Reduced mortality from increased walking and cycling",
            amount: 2,
            unit: "lives saved per yr",
            benefit_per_year: 7594328,
            gross_value: 0,
            indirect: 65288500,
            timeframe: 10,
          },
          {
            function: "Stress and mental illness alleviation",
            tool: "Health cost savings from improved mental health from view to green from household",
            amount: 599,
            unit: "number of people",
            benefit_per_year: 216983,
            gross_value: 0,
            indirect: 671307,
            timeframe: 20,
          },
          {
            function: "Air pollution removal",
            tool: "Reduced air pollution",
            amount: 0.01,
            unit: "t/yr of NO2 removed",
            benefit_per_year: 8980,
            gross_value: 225332,
            indirect: 0,
            timeframe: 50,
          },
          {
            function: "Air pollution removal",
            tool: "Reduced air pollution",
            amount: 0.03,
            unit: "t/yr of O3 removed",
            benefit_per_year: 8980,
            gross_value: 225332,
            indirect: 0,
            timeframe: 50,
          },
          {
            function: "Air pollution removal",
            tool: "Reduced air pollution",
            amount: 0.00,
            unit: "t/yr of SO2 removed",
            benefit_per_year: 8980,
            gross_value: 225332,
            indirect: 0,
            timeframe: 50,
          },
          {
            function: "Air pollution removal",
            tool: "Reduced air pollution",
            amount: 0.07,
            unit: "t/yr of PM2.5 removed",
            benefit_per_year: 8980,
            gross_value: 225332,
            indirect: 0,
            timeframe: 50,
          },
        ],
      },
      {
        group: "Biodiversity",
        rows: [
          {
            function:
              "Provision, protection and enhancement of natural habitats",
            tool: "Willingness to pay for protection or enhancement of biodiversity",
            amount: 0,
            unit: "Ha of land w/ biodiversity value",
            benefit_per_year: 0,
            gross_value: 0,
            indirect: 0,
            timeframe: 10,
          },
          {
            function:
              "Provision, protection and enhancement of natural habitats",
            tool: "Contribution to biodiversity targets",
            amount: 0,
            unit: "Ha of grassland habitat",
            benefit_per_year: 0,
            gross_value: 0,
            indirect: 0,
            timeframe: 40,
          },
        ],
      },
    ],
    chartData: [
      {
        id: "Shelter from wind",
        label: "Shelter from wind",
        value: 366906 + 390667,
        color: "hsl(109, 97%, 88%)",
      },
      {
        id: "Reduction of urban heat island effect",
        label: "Reduction of urban heat island effect",
        value: 0 + 18444144 + 1575044 + 69343,
        color: "hsl(84, 100%, 70%)",
      },
      {
        id: "Interception, storage and infiltration of rainwater",
        label: "Interception, storage and infiltration of rainwater",
        value: 0 + 260347 + 260347,
        color: "hsl(74, 73%, 51%)",
      },
      {
        id: "Provision of attractive opportunities for walking and cycling",
        label: "Provision of attractive opportunities for walking and cycling",
        value: 65288500,
        color: "hsl(130, 91%, 78%)",
      },
      {
        id: "Stress and mental illness alleviation",
        label: "Provision of attractive opportunities for walking and cycling",
        value: 0,
        color: "hsl(130, 91%, 78%)",
      },
      {
        id: "Air pollution removal",
        label: "Air pollution removal",
        value: 220325 + 220325 + 220325 + 220325,
        color: "hsl(145, 63%, 49%)",
      },
      {
        id: "Provision, protection and enhancement of natural habitats",
        label: "Provision, protection and enhancement of natural habitats",
        value: 0,
        color: "hsl(126, 32%, 67%)",
      },
    ],
  },
  {
    id: 1,
    title: "Scenario B - Optimistic",
    description:
      "Ecosystem Services value from trees that are to be cut according to a technical survey commissioned by BVG (public transport agency).",
    trees: 35,
    canopy_cover: 0.31,
    total_benefit: -2896565,
    map: "scenario_b_canopy.geojson",
    benefits: [
      {
        group: "Climate Change Adaptation & Mitigation",
        rows: [
          {
            function: "Shelter from wind",
            tool: "Reduced building energy consumption for heating",
            amount: -82400,
            unit: "kWh/yr energy saved",
            benefit_per_year: -7129,
            gross_value: -61364,
            indirect: 0,
            timeframe: 10,
          },
          {
            function: "Shelter from wind",
            tool: "Avoided carbon emissions from building energy saving for heating",
            amount: -17965,
            unit: "kgCO2/yr not emitted",
            benefit_per_year: -3539,
            gross_value: 0,
            indirect: -31407,
            timeframe: 10,
          },
          {
            function: "Reduction of urban heat island effect",
            tool: "Reduced peak summer surface temperatures",
            amount: 0.8,
            unit: "°C in surf. temperature",
            benefit_per_year: 0,
            gross_value: 0,
            indirect: 0,
            timeframe: 0,
          },
          {
            function: "Reduction of urban heat island effect",
            tool: "Reduced Heat-Related Mortality",
            amount: 0,
            unit: "lives saved per yr",
            benefit_per_year: -258793,
            gross_value: 0,
            indirect: -2296519,
            timeframe: 10,
          },
          {
            function: "Reduction of urban heat island effect",
            tool: "Reduced Hospital Costs from Heat-Related Morbidity",
            amount: -6,
            unit: "patient days per yr",
            benefit_per_year: -22100,
            gross_value: 0,
            indirect: -196112,
            timeframe: 10,
          },
          {
            function: "Carbon storage and sequestration",
            tool: "Carbon sequestered by trees",
            amount: -87,
            unit: "kgCO2e sequestered",
            benefit_per_year: -344,
            gross_value: 0,
            indirect: -8634,
            timeframe: 50,
          },
        ],
      },
      {
        group: "Water Management & Flood Alleviation",
        rows: [
          {
            function: "Interception, storage and infiltration of rainwater",
            tool: "Energy and carbon emissions savings from reduced stormwater volume entering combined sewers",
            amount: -6939182,
            unit: "L/yr water diverted from sewers",
            benefit_per_year: 0,
            gross_value: -0,
            indirect: 0,
            timeframe: 30,
          },
          {
            function: "Interception, storage and infiltration of rainwater",
            tool: "Energy and carbon emissions savings from reduced stormwater volume entering combined sewers",
            amount: -6141.18,
            unit: "kWh/yr energy saved",
            benefit_per_year: -1220,
            gross_value: -23217,
            indirect: 0,
            timeframe: 30,
          },
          {
            function: "Interception, storage and infiltration of rainwater",
            tool: "Energy and carbon emissions savings from reduced stormwater volume entering combined sewers",
            amount: -2.44,
            unit: "tCO2e/yr carbon saved",
            benefit_per_year: -200,
            gross_value: 0,
            indirect: -23217,
            timeframe: 30,
          },
        ],
      },
      {
        group: "Health & Well-being",
        rows: [
          {
            function:
              "Provision of attractive opportunities for walking and cycling",
            tool: "Reduced mortality from increased walking and cycling",
            amount: 0,
            unit: "lives saved per yr",
            benefit_per_year: 0,
            gross_value: 0,
            indirect: 0,
            timeframe: 10,
          },
          {
            function: "Stress and mental illness alleviation",
            tool: "Health cost savings from mental health disorders",
            amount: -207,
            unit: "number of patients",
            benefit_per_year: -74934,
            gross_value: 0,
            indirect: -231833,
            timeframe: 20,
          },
          {
            function: "Air pollution removal",
            tool: "Reduced air pollution",
            amount: -0.002,
            unit: "t/yr of NO2 removed",
            benefit_per_year: -967,
            gross_value: -24263,
            indirect: 0,
            timeframe: 50,
          },
          {
            function: "Air pollution removal",
            tool: "Reduced air pollution",
            amount: -0.004,
            unit: "t/yr of O3 removed",
            benefit_per_year: -967,
            gross_value: -24263,
            indirect: 0,
            timeframe: 50,
          },
          {
            function: "Air pollution removal",
            tool: "Reduced air pollution",
            amount: 0.000,
            unit: "t/yr of SO2 removed",
            benefit_per_year: -967,
            gross_value: -24263,
            indirect: 0,
            timeframe: 50,
          },
          {
            function: "Air pollution removal",
            tool: "Reduced air pollution",
            amount: -0.009,
            unit: "t/yr of PM2.5 removed",
            benefit_per_year: -967,
            gross_value: -24263,
            indirect: 0,
            timeframe: 50,
          },
        ],
      },
    ],
    chartData: [
      {
        id: "Shelter from wind",
        label: "(-)Shelter from wind",
        value: (-61364 -31407) * -1,
        color: "hsl(5, 90%, 51%)",
      },
      {
        id: "Reduction of urban heat island effect",
        label: "(-)Reduction of urban heat island effect",
        value: (0 - 2296519 - 196112 + 69343)*-1,
        color: "hsl(355, 50%, 54%)",
      },
      {
        id: "Carbon storage and sequestration",
        label: "(-)Carbon storage and sequestration",
        value: -8634 * -1,
        color: "hsl(355, 60%, 56%)",
      },
      {
        id: "Interception, storage and infiltration of rainwater",
        label: "(-)Interception, storage and infiltration of rainwater",
        value: (-23217 - 23217) * -1,
        color: "hsl(0, 89%, 28%)",
      },
      {
        id: "Provision of attractive opportunities for walking and cycling",
        label: "Provision of attractive opportunities for walking and cycling",
        value: 0,
        color: "hsl(300, 70%, 50%)",
      },
      {
        id: "Stress and mental illness alleviation",
        label: "Provision of attractive opportunities for walking and cycling",
        value: 0,
        color: "hsl(11, 70%, 50%)",
      },
      {
        id: "Air pollution removal",
        label: "Air pollution removal",
        value: 0,
        color: "hsl(11, 70%, 50%)",
      },
    ],
  },
  {
    id: 2,
    title: "Scenario C - Realistic",
    description:
      "Ecosystem Services value from all trees considered at risk of being cut off if they are located within the construction area or their crown diameter area overlaps with the construction area based on the Berlin Tree Protection Ordinance.",
    trees: 131,
    canopy_cover: 1.38,
    total_benefit: -11986645,
    map: "scenario_c_canopy.geojson",
    benefits: [
      {
        group: "Climate Change Adaptation & Mitigation",
        rows: [
          {
            function: "Shelter from wind",
            tool: "Reduced building energy consumption for heating",
            amount: -184000,
            unit: "kWh/yr energy saved",
            benefit_per_year: -16907,
            gross_value: -145530,
            indirect: 0,
            timeframe: 10,
          },
          {
            function: "Shelter from wind",
            tool: "Avoided carbon emissions from building energy saving for heating",
            amount: -42239,
            unit: "kgCO2/yr not emitted",
            benefit_per_year: -8321,
            gross_value: 0,
            indirect: -73841,
            timeframe: 10,
          },
          {
            function: "Reduction of urban heat island effect",
            tool: "Reduced peak summer surface temperatures",
            amount: 0.8,
            unit: "°C in surf. temperature",
            benefit_per_year: 0,
            gross_value: 0,
            indirect: 0,
            timeframe: 0,
          },
          {
            function: "Reduction of urban heat island effect",
            tool: "Reduced Heat-Related Mortality",
            amount: 0,
            unit: "lives saved per yr",
            benefit_per_year: -1119544,
            gross_value: 0,
            indirect: -9934785,
            timeframe: 10,
          },
          {
            function: "Reduction of urban heat island effect",
            tool: "Reduced Hospital Costs from Heat-Related Morbidity",
            amount: -27,
            unit: "patient days per yr",
            benefit_per_year: -95604,
            gross_value: 0,
            indirect: -848384,
            timeframe: 10,
          },
          {
            function: "Carbon storage and sequestration",
            tool: "Carbon sequestered by trees",
            amount: -378,
            unit: "kgCO2e sequestered",
            benefit_per_year: -1489,
            gross_value: 0,
            indirect: -37351,
            timeframe: 50,
          },
        ],
      },
      {
        group: "Water Management & Flood Alleviation",
        rows: [
          {
            function: "Interception, storage and infiltration of rainwater",
            tool: "Energy and carbon emissions savings from reduced stormwater volume entering combined sewers",
            amount: -35419864,
            unit: "L/yr water diverted from sewers",
            benefit_per_year: 0,
            gross_value: 0,
            indirect: 0,
            timeframe: 30,
          },
          {
            function: "Interception, storage and infiltration of rainwater",
            tool: "Energy and carbon emissions savings from reduced stormwater volume entering combined sewers",
            amount: -31346.58,
            unit: "kWh/yr energy saved",
            benefit_per_year: -6225,
            gross_value: -118506,
            indirect: 0,
            timeframe: 30,
          },
          {
            function: "Interception, storage and infiltration of rainwater",
            tool: "Reduced carbon emissions",
            amount: -12.44,
            unit: "tCO2e/yr carbon saved",
            benefit_per_year: -1020,
            gross_value: -118506,
            indirect: 0,
            timeframe: 30,
          },
        ],
      },
      {
        group: "Health & Well-being",
        rows: [
          {
            function:
              "Provision of attractive opportunities for walking and cycling",
            tool: "Reduced mortality from increased walking and cycling",
            amount: 0,
            unit: "lives saved per yr",
            benefit_per_year: 0,
            gross_value: 0,
            indirect: 0,
            timeframe: 10,
          },
          {
            function: "Stress and mental illness alleviation",
            tool: "Health cost savings from mental health disorders",
            amount: -540,
            unit: "number of patients",
            benefit_per_year: -195480,
            gross_value: 0,
            indirect: -604781,
            timeframe: 20,
          },
          {
            function: "Air pollution removal",
            tool: "Reduced air pollution",
            amount: -0.007,
            unit: "t/yr of NO2 removed",
            benefit_per_year: -4183,
            gross_value: -104961,
            indirect: 0,
            timeframe: 50,
          },
          {
            function: "Air pollution removal",
            tool: "Reduced air pollution",
            amount: -0.017,
            unit: "t/yr of O3 removed",
            benefit_per_year: -4183,
            gross_value: -104961,
            indirect: 0,
            timeframe: 50,
          },
          {
            function: "Air pollution removal",
            tool: "Reduced air pollution",
            amount: -0.001,
            unit: "t/yr of SO2 removed",
            benefit_per_year: -4183,
            gross_value: -104961,
            indirect: 0,
            timeframe: 50,
          },
          {
            function: "Air pollution removal",
            tool: "Reduced air pollution",
            amount: -0.039,
            unit: "t/yr of SO2 removed",
            benefit_per_year: -4183,
            gross_value: -104961,
            indirect: 0,
            timeframe: 50,
          },
        ],
      },
    ],
    chartData: [
      {
        id: "Shelter from wind",
        label: "(-)Shelter from wind",
        value: (-145530 - 73841)*-1,
        color: "hsl(5, 90%, 51%)",
      },
      {
        id: "Reduction of urban heat island effect",
        label: "(-)Reduction of urban heat island effect",
        value: (0 - 9934785 - 848384)*-1,
        color: "hsl(355, 50%, 54%)",
      },
      {
        id: "Carbon storage and sequestration",
        label: "(-)Carbon storage and sequestration",
        value: -37351 *-1,
        color: "hsl(355, 60%, 56%)",
      },
      {
        id: "Interception, storage and infiltration of rainwater",
        label: "(-)Interception, storage and infiltration of rainwater",
        value: (-118506 - 118506) *.1,
        color: "hsl(0, 89%, 28%)",
      },
      {
        id: "Provision of attractive opportunities for walking and cycling",
        label: "Provision of attractive opportunities for walking and cycling",
        value: 0,
        color: "hsl(300, 70%, 50%)",
      },
      {
        id: "Stress and mental illness alleviation",
        label: "Provision of attractive opportunities for walking and cycling",
        value: 0,
        color: "hsl(11, 70%, 50%)",
      },
      {
        id: "Air pollution removal",
        label: "(-)Air pollution removal",
        value: -118676 *-1,
        color: "hsl(2, 80%, 47%)",
      },
    ],
  },
];

let euro = new Intl.NumberFormat("en-DE", {
  style: "currency",
  currency: "EUR",
});

function App() {
  const [selectedScenario, setSelectedScenario] = useState(data[0]);
  const [mapData, setMapData] = useState(null);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/Dark-Matter-Labs/ev-dashboard/refs/heads/main/src/data/" +
        selectedScenario.map,
    )
      .then((resp) => resp.json())
      .then((json) => setMapData(json))
      .catch((err) => console.error("Could not load data", err));
  }, [selectedScenario]);

  const handleSelectChange = (event) => {
    const selectedId = Number(event.target.value);
    const scenario = data.find((item) => item.id === selectedId);
    setSelectedScenario(scenario);
  };

  return (
    <div className="global-margin bg-gray-100">
      <div className=" bg-white shadow-lg rounded-lg p-6 space-y-6">
        <h1 className=" text-gray-800">
          Ecosystem Services Indicative Valuation Dashboard
        </h1>
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4">
          <div className="w-full md:w-1/3">
            <label className="block medium-info-sm text-gray-700">
              Scenario
            </label>
            <select
              value={selectedScenario.id}
              onChange={handleSelectChange}
              className="book-info-md mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            >
              {data.map((scenario) => (
                <option key={scenario.id} value={scenario.id}>
                  {scenario.title}
                </option>
              ))}
            </select>

            <div className="w-full mt-4 p-4 bg-gray-50 border rounded-lg ">
              <h2 className="medium-info-sm text-gray-600">
                Description
              </h2>
              <p className="book-info-md">{selectedScenario.description}</p>
            </div>
          </div>

          <div className="flex flex-col w-full md:w-2/3 space-y-4 md:space-y-0 md:flex-row md:space-x-4">
            <div className="w-full md:w-1/2 p-4 bg-gray-50 border rounded-lg">
              <h2 className="medium-info-sm text-gray-600">
                Site Location
              </h2>
              <p className="text-gray-800 book-info-md">Berlin, Germany</p>
              <h2 className="medium-info-sm text-gray-600 pt-6">Site Area</h2>
              <p className="text-gray-800 book-info-md">16.83 Ha</p>
            </div>
            <div className="w-full md:w-1/2 p-4 bg-gray-50 border rounded-lg">
              <h2 className="medium-info-sm text-gray-600">
                Number of Trees
              </h2>
              <p className="text-gray-800 book-info-md">{selectedScenario.trees}</p>
              <h2 className="medium-info-sm text-gray-600 pt-6">
                Canopy Cover
              </h2>
              <p className="text-gray-800 book-info-md">
                {selectedScenario.canopy_cover} Ha
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div
            className={
              selectedScenario.total_benefit > 0
                ? " bg-green-100 p-6 rounded-lg"
                : "bg-red-100 p-6 rounded-lg"
            }
          >
            <h3 className="medium-intro-md text-gray-800">
              Total Ecosystem Service Valuation
            </h3>
            <p
              className={
                selectedScenario.total_benefit > 0
                  ? "text-green-600 text-2xl font-semibold"
                  : "text-red-600 text-2xl font-semibold"
              }
            >
              {euro.format(selectedScenario.total_benefit)}
            </p>
          </div>
          <div
            className={
              selectedScenario.total_benefit / selectedScenario.trees > 0
                ? " bg-green-100 p-6 rounded-lg"
                : "bg-red-100 p-6 rounded-lg"
            }
          >
            <h3 className="medium-intro-md text-gray-800">
              Average Value Generated per Tree
            </h3>
            <p
              className={
                selectedScenario.total_benefit / selectedScenario.trees > 0
                  ? "text-green-600 text-2xl font-semibold"
                  : "text-red-600 text-2xl font-semibold"
              }
            >
              {euro.format(
                selectedScenario.total_benefit / selectedScenario.trees,
              )}
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border book-info-md">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-800">
                  Benefit Group
                </th>
                <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-800">
                  Total
                </th>
                <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-800">
                  Tree Function
                </th>
                <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-800">
                  Tool
                </th>
                <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-800">
                  Benefit Quantification
                </th>
                <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-800">
                  Value per year
                </th>
                <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-800">
                  Timeframe
                </th>
              </tr>
            </thead>
            <tbody>
              {selectedScenario.benefits.map((benefit, benefitIndex) =>
                benefit.rows.map((row, rowIndex) => (
                  <tr key={`${benefitIndex}-${rowIndex}`}>
                    {rowIndex === 0 && (
                      <td rowSpan={benefit.rows.length}>{benefit.group}</td>
                    )}

                    {rowIndex === 0 && (
                      <td rowSpan={benefit.rows.length}>
                        {euro.format(row.gross_value + row.indirect)}
                      </td>
                    )}
                    <td className="px-6 py-4 border-b text-sm text-gray-600">
                      {row.function}
                    </td>
                    <td className="px-6 py-4 border-b text-sm text-gray-600">
                      {row.tool}
                    </td>
                    <td className="px-6 py-4 border-b text-sm text-gray-600">
                      {row.amount.toLocaleString() + " " + row.unit}
                    </td>
                    <td className="px-6 py-4 border-b text-sm text-gray-600">
                      {euro.format(row.benefit_per_year)}
                    </td>
                    <td className="px-6 py-4 border-b text-sm text-gray-600">
                      {row.timeframe} years
                    </td>
                  </tr>
                )),
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg my-6">
          <h3 className="text-lg font-semibold text-gray-800">
            Visualization of Benefits
          </h3>
          <div className="w-full h-96">
            <ResponsivePie
              data={selectedScenario.chartData}
              margin={{ top: 10, right: 40, bottom: 80, left: 40 }}
              innerRadius={0.5}
              padAngle={0.7}
             colors={{datum: 'data.color'}}
              cornerRadius={3}
              activeOuterRadiusOffset={8}
              borderWidth={1}
              borderColor={{
                from: "color",
                modifiers: [["darker", 0.2]],
              }}
              arcLinkLabelsSkipAngle={20}
              arcLinkLabelsTextColor="#333333"
              arcLinkLabelsThickness={2}
              arcLinkLabelsColor={{ from: "color" }}
              arcLabelsSkipAngle={10}
              arcLabelsTextColor={{
                from: "color",
                modifiers: [["darker", 2]],
              }}
              legends={[
                {
                  anchor: "right",
                  direction: "column",
                  justify: false,
                  translateX: -220,
                  translateY: 10,
                  itemsSpacing: 20,
                  itemWidth: 20,
                  itemHeight: 32,
                  itemTextColor: "#999",
                  itemDirection: "left-to-right",
                  itemOpacity: 1,
                  symbolSize: 18,
                  symbolShape: "circle",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemTextColor: "#000",
                      },
                    },
                  ],
                },
              ]}
            />
          </div>
        </div>

        <div className="h-96">
          <Map
            initialViewState={{
              latitude: 52.526,
              longitude: 13.3,
              zoom: 14,
            }}
            mapStyle="mapbox://styles/mapbox/light-v9"
            mapboxAccessToken={MAPBOX_TOKEN}
          >
            <Source type="geojson" data={mapData}>
              <Layer {...dataLayer} />
            </Source>
          </Map>
        </div>
      </div>
    </div>
  );
}

export default App;
