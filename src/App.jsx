import { useState, useEffect } from "react";
import { ResponsiveSunburst } from "@nivo/sunburst";
import { ResponsiveBar } from "@nivo/bar";
import Map, { Source, Layer } from "react-map-gl";
import { useTranslation } from "react-i18next";
import NavBar from "./components/NavBar";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const data = [
  {
    id: 0,
    title: "Scenario A - Baseline",
    description:
      "Ecosystem Services value from all existing trees in a 50m buffer from road.",
    trees: 357,
    canopy_cover: 2.56,
    total_benefit: 26483560,
    map: "scenario_a_canopy.geojson",
    benefits: [
      {
        group: "Climate Change Adaptation & Mitigation",
        colour: "#06E29E",
        cumulatedData: [
          {
            benefit: "Shelter from wind",
            value: 86649,
          },
          {
            benefit: "Reduction of urban heat island effect",
            value: 2255949,
          },
          {
            benefit: "Carbon storage and sequestration",
            value: 2764,
          },
        ],
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
            amount: 0.5,
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
        colour: "#084887",
        cumulatedData: [
          {
            benefit: "Interception, storage and inflitration of rainwater",
            value: 38125,
          },
        ],
        rows: [
          {
            function: "Interception, storage and infiltration of rainwater",
            tool: "Energy and carbon emissions savings from reduced stormwater volume entering combined sewers",
            amount: 77814213,
            unit: "L/yr water diverted from sewers",
            benefit_per_year: 19063,
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
            tool: "Energy and carbon emissions savings from reduced stormwater volume entering combined sewers",
            amount: 27.34,
            unit: "tCO2e/yr carbon saved",
            benefit_per_year: 5386,
            gross_value: 0,
            indirect: 102525,
            timeframe: 30,
          },
        ],
      },
      {
        group: "Health & Well-being",
        colour: "#A3BDEC",
        cumulatedData: [
          {
            benefit: "Provision of attractive opportunities for exercise",
            value: 518030,
          },
          {
            benefit: "Stress and mental illness alleviation",
            value: 216983,
          },
          {
            benefit: "Air pollution removal",
            value: 8980,
          },
        ],
        rows: [
          {
            function:
              "Provision of attractive opportunities for walking and cycling",
            tool: "Reduced mortality from increased walking and cycling",
            amount: 0.12,
            unit: "lives saved per yr",
            benefit_per_year: 518030,
            gross_value: 0,
            indirect: 4377946,
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
            amount: 0.0,
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
        colour: "#FFFFFF",
        cumulatedData: [
          {
            benefit:
              "Provision, protection and enhancement of natural habitats",
            value: 0,
          },
        ],
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
    chartData: {
      name: "scenario_a",
      children: [
        {
          name: "Climate Change Adaptation & Mitigation",
          color: "#06E29E",
          children: [
            {
              name: "Shelter from wind",
              color: "hsl(139, 70%, 50%)",
              children: [
                {
                  name: "Reduced building energy consumption for heating",
                  color: "hsl(260, 70%, 50%)",
                  loc: 42625,
                },
                {
                  name: "Avoided carbon emissions from building energy saving for heating",
                  color: "hsl(208, 70%, 50%)",
                  loc: 44024,
                },
                {
                  name: "Reduced peak summer surface temperatures",
                  color: "hsl(49, 70%, 50%)",
                  loc: 0,
                },
              ],
            },
            {
              name: "Reduction of urban heat island effect",
              color: "hsl(89, 70%, 50%)",
              children: [
                {
                  name: "Reduced Heat-Related Mortality",
                  color: "hsl(260, 70%, 50%)",
                  loc: 2078458,
                },
                {
                  name: "Reduced Hospital Costs from Heat-Related Morbidity",
                  color: "hsl(208, 70%, 50%)",
                  loc: 177491,
                },
              ],
            },
            {
              name: "Carbon storage and sequestration",
              color: "hsl(89, 70%, 50%)",
              children: [
                {
                  name: "Carbon sequestered by trees",
                  color: "hsl(349, 70%, 50%)",
                  loc: 2764,
                },
              ],
            },
          ],
        },
        {
          name: "Water Management & Flood Alleviation",
          color: "#084887",
          children: [
            {
              name: "Interception, storage and infiltration of rainwater",
              color: "hsl(89, 70%, 50%)",
              children: [
                {
                  name: "Energy and carbon emissions savings from reduced stormwater volume entering combined sewers",
                  color: "hsl(349, 70%, 50%)",
                  loc: 15919,
                },
                {
                  name: "Energy and carbon emissions savings from reduced stormwater volume entering combined sewers",
                  color: "hsl(349, 70%, 50%)",
                  loc: 13677,
                },
                {
                  name: "Energy and carbon emissions savings from reduced stormwater volume entering combined sewers",
                  color: "hsl(349, 70%, 50%)",
                  loc: 2242,
                },
              ],
            },
          ],
        },
        {
          name: "Health & Well-being",
          color: "#A3BDEC",
          children: [
            {
              name: "Provision of attractive opportunities for walking and cycling",
              color: "hsl(173, 70%, 50%)",
              children: [
                {
                  name: "Reduced mortality from increased walking and cycling",
                  color: "hsl(260, 70%, 50%)",
                  loc: 518030,
                },
              ],
            },
            {
              name: "Stress and mental illness alleviation",
              color: "hsl(315, 70%, 50%)",
              children: [
                {
                  name: "Health cost savings from improved mental health from view to green from household",
                  color: "hsl(260, 70%, 50%)",
                  loc: 216983,
                },
              ],
            },
            {
              name: "Air pollution removal",
              color: "hsl(137, 70%, 50%)",
              children: [
                {
                  name: "Reduced air pollution - NO2",
                  color: "hsl(260, 70%, 50%)",
                  loc: 8980,
                },
                {
                  name: "Reduced air pollution - O3",
                  color: "hsl(260, 70%, 50%)",
                  loc: 8980,
                },
                {
                  name: "Reduced air pollution - SO2",
                  color: "hsl(260, 70%, 50%)",
                  loc: 8980,
                },
                {
                  name: "Reduced air pollution - PM2.5",
                  color: "hsl(260, 70%, 50%)",
                  loc: 8980,
                },
              ],
            },
          ],
        },
        {
          name: "Biodiversity",
          color: "#FFFFF",
          children: [
            {
              name: "Provision, protection and enhancement of natural habitats",
              color: "hsl(129, 70%, 50%)",
              children: [
                {
                  name: "Willingness to pay for protection or enhancement of biodiversity",
                  color: "hsl(260, 70%, 50%)",
                  loc: 0,
                },
                {
                  name: "Contribution to biodiversity targets",
                  color: "hsl(260, 70%, 50%)",
                  loc: 0,
                },
              ],
            },
          ],
        },
      ],
    },
    cumulatedData: [
      {
        benefit: "Shelter from wind",
        value: 86649,
      },
      {
        benefit: "Reduction of urban heat island effect",
        value: 2255949,
      },
      {
        benefit: "Carbon storage and sequestration",
        value: 2764,
      },
      {
        benefit: "Interception, storage and inflitration of rainwater",
        value: 31837,
      },
      {
        benefit: "Provision of attractive opportunities for exercise",
        value: 518030,
      },
      {
        benefit: "Stress and mental illness alleviation",
        value: 216983,
      },
      {
        benefit: "Air pollution removal",
        value: 8980 * 4,
      },
      {
        benefit: "Provision, protection and enhancement of natural habitats",
        value: 0,
      },
    ],
  },
  {
    id: 1,
    title: "Scenario B - Optimistic",
    description:
      "Ecosystem Services value from trees that are to be cut according to a technical survey commissioned by BVG (public transport agency).",
    trees: -35,
    canopy_cover: 0.31,
    total_benefit: -2882491,
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
            benefit_per_year: -480,
            gross_value: 0,
            indirect: -9143,
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
            amount: 0.0,
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
    chartData: {
      name: "scenario_b",
      children: [
        {
          name: "Climate Change Adaptation & Mitigation",
          color: "#06E29E",
          children: [
            {
              name: "Shelter from wind",
              color: "hsl(139, 70%, 50%)",
              children: [
                {
                  name: "Reduced building energy consumption for heating",
                  color: "hsl(260, 70%, 50%)",
                  loc: 7129,
                },
                {
                  name: "Avoided carbon emissions from building energy saving for heating",
                  color: "hsl(208, 70%, 50%)",
                  loc: 3539,
                },
              ],
            },
            {
              name: "Reduction of urban heat island effect",
              color: "hsl(89, 70%, 50%)",
              children: [
                {
                  name: "Reduced peak summer surface temperatures",
                  color: "hsl(49, 70%, 50%)",
                  loc: 0,
                },
                {
                  name: "Reduced Heat-Related Mortality",
                  color: "hsl(260, 70%, 50%)",
                  loc: 258793,
                },
                {
                  name: "Reduced Hospital Costs from Heat-Related Morbidity",
                  color: "hsl(208, 70%, 50%)",
                  loc: 22100,
                },
              ],
            },
            {
              name: "Carbon storage and sequestration",
              color: "hsl(89, 70%, 50%)",
              children: [
                {
                  name: "Carbon sequestered by trees",
                  color: "hsl(349, 70%, 50%)",
                  loc: 344,
                },
              ],
            },
          ],
        },
        {
          name: "Water Management & Flood Alleviation",
          color: "#084887",
          children: [
            {
              name: "Interception, storage and infiltration of rainwater",
              color: "hsl(89, 70%, 50%)",
              children: [
                {
                  name: "Energy and carbon emissions savings from reduced stormwater volume entering combined sewers",
                  color: "hsl(349, 70%, 50%)",
                  loc: 0,
                },
                {
                  name: "Energy and carbon emissions savings from reduced stormwater volume entering combined sewers",
                  color: "hsl(349, 70%, 50%)",
                  loc: 1220,
                },
                {
                  name: "Energy and carbon emissions savings from reduced stormwater volume entering combined sewers",
                  color: "hsl(349, 70%, 50%)",
                  loc: 200,
                },
              ],
            },
          ],
        },
        {
          name: "Health & Well-being",
          color: "#A3BDEC",
          children: [
            {
              name: "Provision of attractive opportunities for walking and cycling",
              color: "hsl(173, 70%, 50%)",
              children: [
                {
                  name: "Reduced mortality from increased walking and cycling",
                  color: "hsl(260, 70%, 50%)",
                  loc: 0,
                },
              ],
            },
            {
              name: "Stress and mental illness alleviation",
              color: "hsl(315, 70%, 50%)",
              children: [
                {
                  name: "Health cost savings from improved mental health from view to green from household",
                  color: "hsl(260, 70%, 50%)",
                  loc: 74934,
                },
              ],
            },
            {
              name: "Air pollution removal",
              color: "hsl(137, 70%, 50%)",
              children: [
                {
                  name: "Reduced air pollution - NO2",
                  color: "hsl(260, 70%, 50%)",
                  loc: 967,
                },
                {
                  name: "Reduced air pollution - O3",
                  color: "hsl(260, 70%, 50%)",
                  loc: 967,
                },
                {
                  name: "Reduced air pollution - SO2",
                  color: "hsl(260, 70%, 50%)",
                  loc: 967,
                },
                {
                  name: "Reduced air pollution - PM2.5",
                  color: "hsl(260, 70%, 50%)",
                  loc: 967,
                },
              ],
            },
          ],
        },
        {
          name: "Biodiversity",
          color: "#FFFFF",
          children: [
            {
              name: "Provision, protection and enhancement of natural habitats",
              color: "hsl(129, 70%, 50%)",
              children: [
                {
                  name: "Willingness to pay for protection or enhancement of biodiversity",
                  color: "hsl(260, 70%, 50%)",
                  loc: 0,
                },
                {
                  name: "Contribution to biodiversity targets",
                  color: "hsl(260, 70%, 50%)",
                  loc: 0,
                },
              ],
            },
          ],
        },
      ],
    },
    cumulatedData: [
      {
        benefit: "Shelter from wind",
        value: -10668,
      },
      {
        benefit: "Reduction of urban heat island effect",
        value: -280893,
      },
      {
        benefit: "Carbon storage and sequestration",
        value: -344,
      },
      {
        benefit: "Interception, storage and inflitration of rainwater",
        value: -1420,
      },
      {
        benefit: "Provision of attractive opportunities for exercise",
        value: 0,
      },
      {
        benefit: "Stress and mental illness alleviation",
        value: -74934,
      },
      {
        benefit: "Air pollution removal",
        value: -947 * 4,
      },
      {
        benefit: "Provision, protection and enhancement of natural habitats",
        value: 0,
      },
    ],
  },
  {
    id: 2,
    title: "Scenario C - Realistic",
    description:
      "Ecosystem Services value from all trees considered at risk of being cut off if they are located within the construction area or their crown diameter area overlaps with the construction area based on the Berlin Tree Protection Ordinance.",
    trees: -131,
    canopy_cover: 1.38,
    total_benefit: -11914807,
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
            benefit_per_year: -2453,
            gross_value: 0,
            indirect: -46668,
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
    chartData: {
      name: "scenario_c",
      children: [
        {
          name: "Climate Change Adaptation & Mitigation",
          color: "#06E29E",
          children: [
            {
              name: "Shelter from wind",
              color: "hsl(139, 70%, 50%)",
              children: [
                {
                  name: "Reduced building energy consumption for heating",
                  color: "hsl(260, 70%, 50%)",
                  loc: 16907,
                },
                {
                  name: "Avoided carbon emissions from building energy saving for heating",
                  color: "hsl(208, 70%, 50%)",
                  loc: 8321,
                },
              ],
            },
            {
              name: "Reduction of urban heat island effect",
              color: "hsl(89, 70%, 50%)",
              children: [
                {
                  name: "Reduced peak summer surface temperatures",
                  color: "hsl(49, 70%, 50%)",
                  loc: 0,
                },
                {
                  name: "Reduced Heat-Related Mortality",
                  color: "hsl(260, 70%, 50%)",
                  loc: 119544,
                },
                {
                  name: "Reduced Hospital Costs from Heat-Related Morbidity",
                  color: "hsl(208, 70%, 50%)",
                  loc: 95604,
                },
              ],
            },
            {
              name: "Carbon storage and sequestration",
              color: "hsl(89, 70%, 50%)",
              children: [
                {
                  name: "Carbon sequestered by trees",
                  color: "hsl(349, 70%, 50%)",
                  loc: 1489,
                },
              ],
            },
          ],
        },
        {
          name: "Water Management & Flood Alleviation",
          color: "#084887",
          children: [
            {
              name: "Interception, storage and infiltration of rainwater",
              color: "hsl(89, 70%, 50%)",
              children: [
                {
                  name: "Energy and carbon emissions savings from reduced stormwater volume entering combined sewers",
                  color: "hsl(349, 70%, 50%)",
                  loc: 0,
                },
                {
                  name: "Energy and carbon emissions savings from reduced stormwater volume entering combined sewers",
                  color: "hsl(349, 70%, 50%)",
                  loc: 6225,
                },
                {
                  name: "Energy and carbon emissions savings from reduced stormwater volume entering combined sewers",
                  color: "hsl(349, 70%, 50%)",
                  loc: 1020,
                },
              ],
            },
          ],
        },
        {
          name: "Health & Well-being",
          color: "#A3BDEC",
          children: [
            {
              name: "Provision of attractive opportunities for walking and cycling",
              color: "hsl(173, 70%, 50%)",
              children: [
                {
                  name: "Reduced mortality from increased walking and cycling",
                  color: "hsl(260, 70%, 50%)",
                  loc: 0,
                },
              ],
            },
            {
              name: "Stress and mental illness alleviation",
              color: "hsl(315, 70%, 50%)",
              children: [
                {
                  name: "Health cost savings from improved mental health from view to green from household",
                  color: "hsl(260, 70%, 50%)",
                  loc: 195480,
                },
              ],
            },
            {
              name: "Air pollution removal",
              color: "hsl(137, 70%, 50%)",
              children: [
                {
                  name: "Reduced air pollution - NO2",
                  color: "hsl(260, 70%, 50%)",
                  loc: 4183,
                },
                {
                  name: "Reduced air pollution - O3",
                  color: "hsl(260, 70%, 50%)",
                  loc: 4183,
                },
                {
                  name: "Reduced air pollution - SO2",
                  color: "hsl(260, 70%, 50%)",
                  loc: 4183,
                },
                {
                  name: "Reduced air pollution - PM2.5",
                  color: "hsl(260, 70%, 50%)",
                  loc: 4183,
                },
              ],
            },
          ],
        },
        {
          name: "Biodiversity",
          color: "#FFFFF",
          children: [
            {
              name: "Provision, protection and enhancement of natural habitats",
              color: "hsl(129, 70%, 50%)",
              children: [
                {
                  name: "Willingness to pay for protection or enhancement of biodiversity",
                  color: "hsl(260, 70%, 50%)",
                  loc: 0,
                },
                {
                  name: "Contribution to biodiversity targets",
                  color: "hsl(260, 70%, 50%)",
                  loc: 0,
                },
              ],
            },
          ],
        },
      ],
    },
    cumulatedData: [
      {
        benefit: "Shelter from wind",
        value: -25228,
      },
      {
        benefit: "Reduction of urban heat island effect",
        value: -1215148,
      },
      {
        benefit: "Carbon storage and sequestration",
        value: -1489,
      },
      {
        benefit: "Interception, storage and inflitration of rainwater",
        value: -7246,
      },
      {
        benefit: "Provision of attractive opportunities for exercise",
        value: 0,
      },
      {
        benefit: "Stress and mental illness alleviation",
        value: -195480,
      },
      {
        benefit: "Air pollution removal",
        value: -4183 * 4,
      },
      {
        benefit: "Provision, protection and enhancement of natural habitats",
        value: 0,
      },
    ],
  },
];

const data_de = [
  {
    id: 0,
    title: "Szenario A - Ausgangslage",
    description:
      "Wert der Ökosystemdienstleistungen durch alle vorhandenen Bäume in einem Puffer von 50m von der Straße.",
    trees: 357,
    canopy_cover: 2.56,
    total_benefit: 26483560,
    map: "scenario_a_canopy.geojson",
    benefits: [
      {
        group: "Anpassung an den Klimawandel und Abschwächung seiner Folgen",
        colour: "#06E29E",
        cumulatedData: [
          {
            benefit: "Schutz vor Wind",
            value: 86649,
          },
          {
            benefit: "Reduzierung des städtischen Wärmeinseleffekts",
            value: 2255949,
          },
          {
            benefit: "Kohlenstoffspeicherung und -bindung",
            value: 2764,
          },
        ],
        rows: [
          {
            function: "Schutz vor Wind",
            tool: "Reduzierter Energieverbrauch des Gebäudes für die Heizung",
            amount: 1166560,
            unit: "kWh/Jahr Energieeinsparung",
            benefit_per_year: 42625,
            gross_value: 366906,
            indirect: 0,
            timeframe: 10,
          },
          {
            function: "Schutz vor Wind",
            tool: "Vermeidung von CO2-Emissionen durch Gebäudeenergieeinsparung beim Heizen",
            amount: 223472,
            unit: "kgCO2/Jahr nicht emittiert",
            benefit_per_year: 44024,
            gross_value: 0,
            indirect: 390667,
            timeframe: 10,
          },
          {
            function: "Reduzierung des städtischen Wärmeinseleffekts",
            tool: "Reduzierte Spitzenoberflächentemperaturen im Sommer",
            amount: -0.9,
            unit: "°C zur Reduzierung der Oberflächentemperatur",
            benefit_per_year: 0,
            gross_value: 0,
            indirect: 0,
            timeframe: 0,
          },
          {
            function: "Reduzierung des städtischen Wärmeinseleffekts",
            tool: "Reduzierte hitzebedingte Sterblichkeit",
            amount: 0.5,
            unit: "Gerettete Leben pro Jahr",
            benefit_per_year: 2078458,
            gross_value: 0,
            indirect: 18444144,
            timeframe: 10,
          },
          {
            function: "Reduzierung des städtischen Wärmeinseleffekts",
            tool: "Reduzierte Krankenhauskosten durch hitzebedingte Morbidität",
            amount: 49,
            unit: "Patiententage pro Jahr",
            benefit_per_year: 177491,
            gross_value: 0,
            indirect: 1575044,
            timeframe: 10,
          },
          {
            function: "Kohlenstoffspeicherung und -bindung",
            tool: "Bäume binden Kohlenstoff",
            amount: 701.43,
            unit: "kgCO2e beschlagnahmt",
            benefit_per_year: 2764,
            gross_value: 0,
            indirect: 69343,
            timeframe: 50,
          },
        ],
      },
      {
        group: "Wassermanagement und Hochwasserschutz",
        colour: "#084887",
        cumulatedData: [
          {
            benefit: "Auffangen, Speichern und Versickern von Regenwasser",
            value: 31837,
          },
        ],
        rows: [
          {
            function: "Auffangen, Speichern und Versickern von Regenwasser",
            tool: "Energie- und CO2-Einsparungen durch geringere Regenwassermengen in der Mischkanalisation",
            amount: 77814213,
            unit: "L/yr aus der Kanalisation abgeleitetes Wasser",
            benefit_per_year: 19063,
            gross_value: 0,
            indirect: 0,
            timeframe: 30,
          },
          {
            function: "Auffangen, Speichern und Versickern von Regenwasser",
            tool: "Energie- und CO2-Einsparungen durch geringere Regenwassermengen in der Mischkanalisation",
            amount: 68865.58,
            unit: "kWh/yr Energie gespart",
            benefit_per_year: 13677,
            gross_value: 260347,
            indirect: 0,
            timeframe: 30,
          },
          {
            function: "Auffangen, Speichern und Versickern von Regenwasser",
            tool: "Energie- und CO2-Einsparungen durch geringere Regenwassermengen in der Mischkanalisation",
            amount: 27.34,
            unit: "Eingesparte tCO2e/Jahr",
            benefit_per_year: 5386,
            gross_value: 0,
            indirect: 102525,
            timeframe: 30,
          },
        ],
      },
      {
        group: "Gesundheit & Wohlbefinden",
        colour: "#A3BDEC",
        cumulatedData: [
          {
            benefit: "Bereitstellung attraktiver Bewegungsmöglichkeiten",
            value: 518030,
          },
          {
            benefit: "Linderung von Stress und psychischen Erkrankungen",
            value: 216983,
          },
          {
            benefit: "Beseitigung der Luftverschmutzung",
            value: 8980,
          },
        ],
        rows: [
          {
            function:
              "Bereitstellung attraktiver Möglichkeiten für Fußgänger und Radfahrer",
            tool: "Geringere Sterblichkeit durch vermehrtes Gehen und Radfahren",
            amount: 0.12,
            unit: "Gerettete Leben pro Jahr",
            benefit_per_year: 518030,
            gross_value: 0,
            indirect: 4377946,
            timeframe: 10,
          },
          {
            function: "Linderung von Stress und psychischen Erkrankungen",
            tool: "Einsparungen bei den Gesundheitskosten durch verbesserte psychische Gesundheit aus Sicht der Umwelt im Haushalt",
            amount: 599,
            unit: "Personenzahl",
            benefit_per_year: 216983,
            gross_value: 0,
            indirect: 671307,
            timeframe: 20,
          },
          {
            function: "Beseitigung der Luftverschmutzung",
            tool: "Reduzierte Luftverschmutzung",
            amount: 0.01,
            unit: "t/Jahr entferntes NO2",
            benefit_per_year: 8980,
            gross_value: 225332,
            indirect: 0,
            timeframe: 50,
          },
          {
            function: "Beseitigung der Luftverschmutzung",
            tool: "Reduzierte Luftverschmutzung",
            amount: 0.03,
            unit: "t/Jahr entferntes O3",
            benefit_per_year: 8980,
            gross_value: 225332,
            indirect: 0,
            timeframe: 50,
          },
          {
            function: "Beseitigung der Luftverschmutzung",
            tool: "Reduzierte Luftverschmutzung",
            amount: 0.0,
            unit: "t/Jahr entferntes SO2",
            benefit_per_year: 8980,
            gross_value: 225332,
            indirect: 0,
            timeframe: 50,
          },
          {
            function: "Beseitigung der Luftverschmutzung",
            tool: "Reduzierte Luftverschmutzung",
            amount: 0.07,
            unit: "t/Jahr entferntes PM2.5",
            benefit_per_year: 8980,
            gross_value: 225332,
            indirect: 0,
            timeframe: 50,
          },
        ],
      },
      {
        group: "Biodiversität",
        colour: "#FFFFFF",
        cumulatedData: [
          {
            benefit:
              "Bereitstellung, Schutz und Verbesserung natürlicher Lebensräume",
            value: 0,
          },
        ],
        rows: [
          {
            function:
              "Bereitstellung, Schutz und Verbesserung natürlicher Lebensräume",
            tool: "Zahlungsbereitschaft für den Schutz oder die Verbesserung der Biodiversität",
            amount: 0,
            unit: "Hektar Land mit Biodiversitätswert",
            benefit_per_year: 0,
            gross_value: 0,
            indirect: 0,
            timeframe: 10,
          },
          {
            function:
              "Bereitstellung, Schutz und Verbesserung natürlicher Lebensräume",
            tool: "Beitrag zu Biodiversitätszielen",
            amount: 0,
            unit: "Hektar Grünlandlebensraum",
            benefit_per_year: 0,
            gross_value: 0,
            indirect: 0,
            timeframe: 40,
          },
        ],
      },
    ],
    chartData: {
      name: "scenario_a",
      children: [
        {
          name: "Anpassung an den Klimawandel und Abschwächung seiner Folgen",
          color: "#06E29E",
          children: [
            {
              name: "Schutz vor Wind",
              color: "hsl(139, 70%, 50%)",
              children: [
                {
                  name: "Reduzierter Energieverbrauch des Gebäudes für die Heizung",
                  color: "hsl(260, 70%, 50%)",
                  loc: 42625,
                },
                {
                  name: "Vermeidung von CO2-Emissionen durch Gebäudeenergieeinsparung beim Heizen",
                  color: "hsl(208, 70%, 50%)",
                  loc: 44024,
                },
                {
                  name: "Reduzierte Spitzenoberflächentemperaturen im Sommer",
                  color: "hsl(49, 70%, 50%)",
                  loc: 0,
                },
              ],
            },
            {
              name: "Reduzierung des städtischen Wärmeinseleffekts",
              color: "hsl(89, 70%, 50%)",
              children: [
                {
                  name: "Reduzierte hitzebedingte Sterblichkeit",
                  color: "hsl(260, 70%, 50%)",
                  loc: 2078458,
                },
                {
                  name: "Reduzierte Krankenhauskosten durch hitzebedingte Morbidität",
                  color: "hsl(208, 70%, 50%)",
                  loc: 177491,
                },
              ],
            },
            {
              name: "Kohlenstoffspeicherung und -bindung",
              color: "hsl(89, 70%, 50%)",
              children: [
                {
                  name: "Bäume binden Kohlenstoff",
                  color: "hsl(349, 70%, 50%)",
                  loc: 2764,
                },
              ],
            },
          ],
        },
        {
          name: "Wassermanagement und Hochwasserschutz",
          color: "#084887",
          children: [
            {
              name: "Auffangen, Speichern und Versickern von Regenwasser",
              color: "hsl(89, 70%, 50%)",
              children: [
                {
                  name: "Energie- und CO2-Einsparungen durch geringere Regenwassermengen in der Mischkanalisation",
                  color: "hsl(349, 70%, 50%)",
                  loc: 15919,
                },
                {
                  name: "Energie- und CO2-Einsparungen durch geringere Regenwassermengen in der Mischkanalisation",
                  color: "hsl(349, 70%, 50%)",
                  loc: 13677,
                },
                {
                  name: "Energie- und CO2-Einsparungen durch geringere Regenwassermengen in der Mischkanalisation",
                  color: "hsl(349, 70%, 50%)",
                  loc: 2242,
                },
              ],
            },
          ],
        },
        {
          name: "Gesundheit & Wohlbefinden",
          color: "#A3BDEC",
          children: [
            {
              name: "Bereitstellung attraktiver Möglichkeiten für Fußgänger und Radfahrer",
              color: "hsl(173, 70%, 50%)",
              children: [
                {
                  name: "Geringere Sterblichkeit durch vermehrtes Gehen und Radfahren",
                  color: "hsl(260, 70%, 50%)",
                  loc: 518030,
                },
              ],
            },
            {
              name: "Linderung von Stress und psychischen Erkrankungen",
              color: "hsl(315, 70%, 50%)",
              children: [
                {
                  name: "Einsparungen bei den Gesundheitskosten durch verbesserte psychische Gesundheit aus Sicht der Umwelt im Haushalt",
                  color: "hsl(260, 70%, 50%)",
                  loc: 216983,
                },
              ],
            },
            {
              name: "Beseitigung der Luftverschmutzung",
              color: "hsl(137, 70%, 50%)",
              children: [
                {
                  name: "Reduzierte Luftverschmutzung - NO2",
                  color: "hsl(260, 70%, 50%)",
                  loc: 8980,
                },
                {
                  name: "Reduzierte Luftverschmutzung - O3",
                  color: "hsl(260, 70%, 50%)",
                  loc: 8980,
                },
                {
                  name: "Reduzierte Luftverschmutzung - SO2",
                  color: "hsl(260, 70%, 50%)",
                  loc: 8980,
                },
                {
                  name: "Reduzierte Luftverschmutzung - PM2.5",
                  color: "hsl(260, 70%, 50%)",
                  loc: 8980,
                },
              ],
            },
          ],
        },
        {
          name: "Biodiversität",
          color: "#FFFFF",
          children: [
            {
              name: "Bereitstellung, Schutz und Verbesserung natürlicher Lebensräume",
              color: "hsl(129, 70%, 50%)",
              children: [
                {
                  name: "Zahlungsbereitschaft für den Schutz oder die Verbesserung der Biodiversität",
                  color: "hsl(260, 70%, 50%)",
                  loc: 0,
                },
                {
                  name: "Beitrag zu Biodiversitätszielen",
                  color: "hsl(260, 70%, 50%)",
                  loc: 0,
                },
              ],
            },
          ],
        },
      ],
    },
    cumulatedData: [
      {
        benefit: "Schutz vor Wind",
        value: 86649,
      },
      {
        benefit: "Reduzierung des städtischen Wärmeinseleffekts",
        value: 2255949,
      },
      {
        benefit: "Kohlenstoffspeicherung und -bindung",
        value: 2764,
      },
      {
        benefit: "Auffangen, Speichern und Versickern von Regenwasser",
        value: 31837,
      },
      {
        benefit: "Bereitstellung attraktiver Bewegungsmöglichkeiten",
        value: 518030,
      },
      {
        benefit: "Linderung von Stress und psychischen Erkrankungen",
        value: 216983,
      },
      {
        benefit: "Beseitigung der Luftverschmutzung",
        value: 8980 * 4,
      },
      {
        benefit:
          "Bereitstellung, Schutz und Verbesserung natürlicher Lebensräume",
        value: 0,
      },
    ],
  },
  {
    id: 1,
    title: "Szenario B - Optimistisch",
    description:
      "Wert der Ökosystemdienstleistungen von Bäumen, die gefällt werden sollen, laut einer technischen Untersuchung im Auftrag der BVG.",
    trees: -35,
    canopy_cover: 0.31,
    total_benefit: -2882491,
    map: "scenario_b_canopy.geojson",
    benefits: [
      {
        group: "Anpassung an den Klimawandel und Abschwächung seiner Folgen",
        rows: [
          {
            function: "Schutz vor Wind",
            tool: "Reduzierter Energieverbrauch des Gebäudes für die Heizung",
            amount: -82400,
            unit: "Eingesparte Energie in kWh/Jahr",
            benefit_per_year: -7129,
            gross_value: -61364,
            indirect: 0,
            timeframe: 10,
          },
          {
            function: "Schutz vor Wind",
            tool: "Vermeidung von CO2-Emissionen durch Gebäudeenergieeinsparung beim Heizen",
            amount: -17965,
            unit: "kgCO2/Jahr nicht emittiert",
            benefit_per_year: -3539,
            gross_value: 0,
            indirect: -31407,
            timeframe: 10,
          },
          {
            function: "Reduzierung des städtischen Wärmeinseleffekts",
            tool: "Reduzierte Spitzenoberflächentemperaturen im Sommer",
            amount: 0.8,
            unit: "°C in der Oberflächentemperatur",
            benefit_per_year: 0,
            gross_value: 0,
            indirect: 0,
            timeframe: 0,
          },
          {
            function: "Reduzierung des städtischen Wärmeinseleffekts",
            tool: "Reduzierte hitzebedingte Sterblichkeit",
            amount: 0,
            unit: "Gerettete Leben pro Jahr",
            benefit_per_year: -258793,
            gross_value: 0,
            indirect: -2296519,
            timeframe: 10,
          },
          {
            function: "Reduzierung des städtischen Wärmeinseleffekts",
            tool: "Reduzierte Krankenhauskosten durch hitzebedingte Morbidität",
            amount: -6,
            unit: "Patiententage pro Jahr",
            benefit_per_year: -22100,
            gross_value: 0,
            indirect: -196112,
            timeframe: 10,
          },
          {
            function: "Kohlenstoffspeicherung und -bindung",
            tool: "Bäume binden Kohlenstoff",
            amount: -87,
            unit: "kg CO2e gebunden",
            benefit_per_year: -344,
            gross_value: 0,
            indirect: -8634,
            timeframe: 50,
          },
        ],
      },
      {
        group: "Wassermanagement und Hochwasserschutz",
        rows: [
          {
            function: "Auffangen, Speichern und Versickern von Regenwasser",
            tool: "Energie- und CO2-Einsparungen durch geringere Regenwassermengen in der Mischkanalisation",
            amount: -6939182,
            unit: "L/Jahr aus der Kanalisation abgeleitetes Wasser",
            benefit_per_year: 0,
            gross_value: -0,
            indirect: 0,
            timeframe: 30,
          },
          {
            function: "Auffangen, Speichern und Versickern von Regenwasser",
            tool: "Energie- und CO2-Einsparungen durch geringere Regenwassermengen in der Mischkanalisation",
            amount: -6141.18,
            unit: "Eingesparte Energie in kWh/Jahr",
            benefit_per_year: -1220,
            gross_value: -23217,
            indirect: 0,
            timeframe: 30,
          },
          {
            function: "Auffangen, Speichern und Versickern von Regenwasser",
            tool: "Energie- und CO2-Einsparungen durch geringere Regenwassermengen in der Mischkanalisation",
            amount: -2.44,
            unit: "Eingesparte tCO2e/Jahr",
            benefit_per_year: -480,
            gross_value: 0,
            indirect: -9143,
            timeframe: 30,
          },
        ],
      },
      {
        group: "Gesundheit & Wohlbefinden",
        rows: [
          {
            function:
              "Bereitstellung attraktiver Möglichkeiten für Fußgänger und Radfahrer",
            tool: "Geringere Sterblichkeit durch vermehrtes Gehen und Radfahren",
            amount: 0,
            unit: "Gerettete Leben pro Jahr",
            benefit_per_year: 0,
            gross_value: 0,
            indirect: 0,
            timeframe: 10,
          },
          {
            function: "Linderung von Stress und psychischen Erkrankungen",
            tool: "Einsparungen bei den Gesundheitskosten durch psychische Störungen",
            amount: -207,
            unit: "Anzahl der Patienten",
            benefit_per_year: -74934,
            gross_value: 0,
            indirect: -231833,
            timeframe: 20,
          },
          {
            function: "Beseitigung der Luftverschmutzung",
            tool: "Reduzierte Luftverschmutzung",
            amount: -0.002,
            unit: "t/Jahr entferntes NO2",
            benefit_per_year: -967,
            gross_value: -24263,
            indirect: 0,
            timeframe: 50,
          },
          {
            function: "Beseitigung der Luftverschmutzung",
            tool: "Reduzierte Luftverschmutzung",
            amount: -0.004,
            unit: "t/Jahr entferntesf O3",
            benefit_per_year: -967,
            gross_value: -24263,
            indirect: 0,
            timeframe: 50,
          },
          {
            function: "Beseitigung der Luftverschmutzung",
            tool: "Reduzierte Luftverschmutzung",
            amount: 0.0,
            unit: "t/Jahr entferntes SO2",
            benefit_per_year: -967,
            gross_value: -24263,
            indirect: 0,
            timeframe: 50,
          },
          {
            function: "Beseitigung der Luftverschmutzung",
            tool: "Reduzierte Luftverschmutzung",
            amount: -0.009,
            unit: "t/Jahr entferntes PM2.5",
            benefit_per_year: -967,
            gross_value: -24263,
            indirect: 0,
            timeframe: 50,
          },
        ],
      },
    ],
    chartData: {
      name: "scenario_b",
      children: [
        {
          name: "Anpassung an den Klimawandel und Abschwächung seiner Folgen",
          color: "#06E29E",
          children: [
            {
              name: "Schutz vor Wind",
              color: "hsl(139, 70%, 50%)",
              children: [
                {
                  name: "Reduzierter Energieverbrauch des Gebäudes für die Heizung",
                  color: "hsl(260, 70%, 50%)",
                  loc: 7129,
                },
                {
                  name: "Vermeidung von CO2-Emissionen durch Gebäudeenergieeinsparung beim Heizen",
                  color: "hsl(208, 70%, 50%)",
                  loc: 3539,
                },
              ],
            },
            {
              name: "Reduzierung des städtischen Wärmeinseleffekts",
              color: "hsl(89, 70%, 50%)",
              children: [
                {
                  name: "Reduzierte Spitzenoberflächentemperaturen im Sommer",
                  color: "hsl(49, 70%, 50%)",
                  loc: 0,
                },
                {
                  name: "Reduzierte hitzebedingte Sterblichkeit",
                  color: "hsl(260, 70%, 50%)",
                  loc: 258793,
                },
                {
                  name: "Reduzierte Krankenhauskosten durch hitzebedingte Morbidität",
                  color: "hsl(208, 70%, 50%)",
                  loc: 22100,
                },
              ],
            },
            {
              name: "Kohlenstoffspeicherung und -bindung",
              color: "hsl(89, 70%, 50%)",
              children: [
                {
                  name: "Bäume binden Kohlenstoff",
                  color: "hsl(349, 70%, 50%)",
                  loc: 344,
                },
              ],
            },
          ],
        },
        {
          name: "Wassermanagement und Hochwasserschutz",
          color: "#084887",
          children: [
            {
              name: "Auffangen, Speichern und Versickern von Regenwasser",
              color: "hsl(89, 70%, 50%)",
              children: [
                {
                  name: "Energie- und CO2-Einsparungen durch geringere Regenwassermengen in der Mischkanalisation",
                  color: "hsl(349, 70%, 50%)",
                  loc: 0,
                },
                {
                  name: "Energie- und CO2-Einsparungen durch geringere Regenwassermengen in der Mischkanalisation",
                  color: "hsl(349, 70%, 50%)",
                  loc: 1220,
                },
                {
                  name: "Energie- und CO2-Einsparungen durch geringere Regenwassermengen in der Mischkanalisation",
                  color: "hsl(349, 70%, 50%)",
                  loc: 200,
                },
              ],
            },
          ],
        },
        {
          name: "Gesundheit & Wohlbefinden",
          color: "#A3BDEC",
          children: [
            {
              name: "Bereitstellung attraktiver Möglichkeiten für Fußgänger und Radfahrer",
              color: "hsl(173, 70%, 50%)",
              children: [
                {
                  name: "Geringere Sterblichkeit durch vermehrtes Gehen und Radfahren",
                  color: "hsl(260, 70%, 50%)",
                  loc: 0,
                },
              ],
            },
            {
              name: "Linderung von Stress und psychischen Erkrankungen",
              color: "hsl(315, 70%, 50%)",
              children: [
                {
                  name: "Einsparungen bei den Gesundheitskosten durch verbesserte psychische Gesundheit aus Sicht der Umwelt im Haushalt",
                  color: "hsl(260, 70%, 50%)",
                  loc: 74934,
                },
              ],
            },
            {
              name: "Beseitigung der Luftverschmutzung",
              color: "hsl(137, 70%, 50%)",
              children: [
                {
                  name: "Reduzierte Luftverschmutzungn - NO2",
                  color: "hsl(260, 70%, 50%)",
                  loc: 967,
                },
                {
                  name: "Reduzierte Luftverschmutzung - O3",
                  color: "hsl(260, 70%, 50%)",
                  loc: 967,
                },
                {
                  name: "Reduzierte Luftverschmutzung - SO2",
                  color: "hsl(260, 70%, 50%)",
                  loc: 967,
                },
                {
                  name: "Reduzierte Luftverschmutzung - PM2.5",
                  color: "hsl(260, 70%, 50%)",
                  loc: 967,
                },
              ],
            },
          ],
        },
        {
          name: "Biodiversität",
          color: "#FFFFF",
          children: [
            {
              name: "Bereitstellung, Schutz und Verbesserung natürlicher Lebensräume",
              color: "hsl(129, 70%, 50%)",
              children: [
                {
                  name: "Zahlungsbereitschaft für den Schutz oder die Verbesserung der Biodiversität",
                  color: "hsl(260, 70%, 50%)",
                  loc: 0,
                },
                {
                  name: "Beitrag zu Biodiversitätszielen",
                  color: "hsl(260, 70%, 50%)",
                  loc: 0,
                },
              ],
            },
          ],
        },
      ],
    },
    cumulatedData: [
      {
        benefit: "Schutz vor Wind",
        value: -10668,
      },
      {
        benefit: "Reduzierung des städtischen Wärmeinseleffekts",
        value: -280893,
      },
      {
        benefit: "Kohlenstoffspeicherung und -bindung",
        value: -344,
      },
      {
        benefit: "Auffangen, Speichern und Versickern von Regenwasser",
        value: -1420,
      },
      {
        benefit: "Bereitstellung attraktiver Bewegungsmöglichkeiten",
        value: 0,
      },
      {
        benefit: "Linderung von Stress und psychischen Erkrankungen",
        value: -74934,
      },
      {
        benefit: "Beseitigung der Luftverschmutzung",
        value: -947 * 4,
      },
      {
        benefit:
          "Bereitstellung, Schutz und Verbesserung natürlicher Lebensräume",
        value: 0,
      },
    ],
  },
  {
    id: 2,
    title: "Szenario C - Realistisch",
    description:
      "Der Wert der Ökosystemdienstleistungen aller Bäume gilt als vom Fällen bedroht, wenn sie innerhalb der Baufläche liegen oder ihr Kronendurchmesser auf Grundlage der Berliner Baumschutzverordnung mit der Baufläche überlappt.",
    trees: -131,
    canopy_cover: 1.38,
    total_benefit: -11914807,
    map: "scenario_c_canopy.geojson",
    benefits: [
      {
        group: "Anpassung an den Klimawandel und Abschwächung seiner Folgen",
        rows: [
          {
            function: "Schutz vor Wind",
            tool: "Reduzierter Energieverbrauch des Gebäudes für die Heizung",
            amount: -184000,
            unit: "Eingesparte Energie in kWh/Jahr",
            benefit_per_year: -16907,
            gross_value: -145530,
            indirect: 0,
            timeframe: 10,
          },
          {
            function: "Schutz vor Wind",
            tool: "Vermeidung von CO2-Emissionen durch Gebäudeenergieeinsparung beim Heizen",
            amount: -42239,
            unit: "kgCO2/Jahr nicht emittiert",
            benefit_per_year: -8321,
            gross_value: 0,
            indirect: -73841,
            timeframe: 10,
          },
          {
            function: "Reduzierung des städtischen Wärmeinseleffekts",
            tool: "Reduzierte Spitzenoberflächentemperaturen im Sommer",
            amount: 0.8,
            unit: "°C bei Surftemperatur",
            benefit_per_year: 0,
            gross_value: 0,
            indirect: 0,
            timeframe: 0,
          },
          {
            function: "Reduzierung des städtischen Wärmeinseleffekts",
            tool: "Reduzierte hitzebedingte Sterblichkeit",
            amount: 0,
            unit: "Gerettete Leben pro Jahr",
            benefit_per_year: -1119544,
            gross_value: 0,
            indirect: -9934785,
            timeframe: 10,
          },
          {
            function: "Reduzierung des städtischen Wärmeinseleffekts",
            tool: "Reduzierte Krankenhauskosten durch hitzebedingte Morbidität",
            amount: -27,
            unit: "Patiententage pro Jahr",
            benefit_per_year: -95604,
            gross_value: 0,
            indirect: -848384,
            timeframe: 10,
          },
          {
            function: "Kohlenstoffspeicherung und -bindung",
            tool: "Bäume binden Kohlenstoff",
            amount: -378,
            unit: "kg CO2e gebunden",
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
            function: "Abfangen, Speichern und Versickern von Regenwasser",
            tool: "Energie- und CO2-Einsparungen durch geringere Regenwassermengen in der Mischkanalisation",
            amount: -35419864,
            unit: "L/Jahr aus der Kanalisation abgeleitetes Wasser",
            benefit_per_year: 0,
            gross_value: 0,
            indirect: 0,
            timeframe: 30,
          },
          {
            function: "Abfangen, Speichern und Versickern von Regenwasser",
            tool: "Energie- und CO2-Einsparungen durch geringere Regenwassermengen in der Mischkanalisation",
            amount: -31346.58,
            unit: "Eingesparte Energie in kWh/Jahr",
            benefit_per_year: -6225,
            gross_value: -118506,
            indirect: 0,
            timeframe: 30,
          },
          {
            function: "Abfangen, Speichern und Versickern von Regenwasser",
            tool: "Reduzierte CO2-Emissionen",
            amount: -12.44,
            unit: "Eingesparte tCO2e/Jahr",
            benefit_per_year: -2452,
            gross_value: 0,
            indirect: -46558,
            timeframe: 30,
          },
        ],
      },
      {
        group: "Gesundheit & Wohlbefinden",
        rows: [
          {
            function:
              "Bereitstellung attraktiver Möglichkeiten für Fußgänger und Radfahrer",
            tool: "Geringere Sterblichkeit durch vermehrtes Gehen und Radfahren",
            amount: 0,
            unit: "Gerettete Leben pro Jahr",
            benefit_per_year: 0,
            gross_value: 0,
            indirect: 0,
            timeframe: 10,
          },
          {
            function: "Linderung von Stress und psychischen Erkrankungen",
            tool: "Einsparungen bei den Gesundheitskosten durch psychische Störungen",
            amount: -540,
            unit: "Anzahl der Patienten",
            benefit_per_year: -195480,
            gross_value: 0,
            indirect: -604781,
            timeframe: 20,
          },
          {
            function: "Beseitigung der Luftverschmutzung",
            tool: "Reduzierte Luftverschmutzung",
            amount: -0.007,
            unit: "t/yr of NO2 removed",
            benefit_per_year: -4183,
            gross_value: -104961,
            indirect: 0,
            timeframe: 50,
          },
          {
            function: "Beseitigung der Luftverschmutzung",
            tool: "Reduzierte Luftverschmutzung",
            amount: -0.017,
            unit: "t/Jahr O3 entfernt",
            benefit_per_year: -4183,
            gross_value: -104961,
            indirect: 0,
            timeframe: 50,
          },
          {
            function: "Beseitigung der Luftverschmutzung",
            tool: "Reduzierte Luftverschmutzung",
            amount: -0.001,
            unit: "t/Jahr of SO2 entfernt",
            benefit_per_year: -4183,
            gross_value: -104961,
            indirect: 0,
            timeframe: 50,
          },
          {
            function: "Beseitigung der Luftverschmutzung",
            tool: "Reduzierte Luftverschmutzung",
            amount: -0.039,
            unit: "t/Jahr of SO2 entfernt",
            benefit_per_year: -4183,
            gross_value: -104961,
            indirect: 0,
            timeframe: 50,
          },
        ],
      },
    ],
    chartData: {
      name: "scenario_c",
      children: [
        {
          name: "Anpassung an den Klimawandel und Abschwächung seiner Folgen",
          color: "#06E29E",
          children: [
            {
              name: "Schutz vor Wind",
              color: "hsl(139, 70%, 50%)",
              children: [
                {
                  name: "Reduzierter Energieverbrauch des Gebäudes für die Heizung",
                  color: "hsl(260, 70%, 50%)",
                  loc: 16907,
                },
                {
                  name: "Vermeidung von CO2-Emissionen durch Gebäudeenergieeinsparungen beim Heizen",
                  color: "hsl(208, 70%, 50%)",
                  loc: 8321,
                },
              ],
            },
            {
              name: "Reduzierung des städtischen Wärmeinseleffekts",
              color: "hsl(89, 70%, 50%)",
              children: [
                {
                  name: "Reduzierte Spitzenoberflächentemperaturen im Sommer",
                  color: "hsl(49, 70%, 50%)",
                  loc: 0,
                },
                {
                  name: "Reduzierte hitzebedingte Sterblichkeit",
                  color: "hsl(260, 70%, 50%)",
                  loc: 119544,
                },
                {
                  name: "Reduzierte Krankenhauskosten durch hitzebedingte Morbidität",
                  color: "hsl(208, 70%, 50%)",
                  loc: 95604,
                },
              ],
            },
            {
              name: "Kohlenstoffspeicherung und -bindung",
              color: "hsl(89, 70%, 50%)",
              children: [
                {
                  name: "Bäume binden Kohlenstoff",
                  color: "hsl(349, 70%, 50%)",
                  loc: 1489,
                },
              ],
            },
          ],
        },
        {
          name: "Wassermanagement und Hochwasserschutz",
          color: "#084887",
          children: [
            {
              name: "Auffangen, Speichern und Versickern von Regenwasser",
              color: "hsl(89, 70%, 50%)",
              children: [
                {
                  name: "Energie- und CO2-Einsparungen durch geringere Regenwassermengen in der Mischkanalisation",
                  color: "hsl(349, 70%, 50%)",
                  loc: 0,
                },
                {
                  name: "Energie- und CO2-Einsparungen durch geringere Regenwassermengen in der Mischkanalisation",
                  color: "hsl(349, 70%, 50%)",
                  loc: 6225,
                },
                {
                  name: "Energie- und CO2-Einsparungen durch geringere Regenwassermengen in der Mischkanalisation",
                  color: "hsl(349, 70%, 50%)",
                  loc: 1020,
                },
              ],
            },
          ],
        },
        {
          name: "Gesundheit & Wohlbefinden",
          color: "#A3BDEC",
          children: [
            {
              name: "Bereitstellung attraktiver Möglichkeiten für Fußgänger und Radfahrer",
              color: "hsl(173, 70%, 50%)",
              children: [
                {
                  name: "Geringere Sterblichkeit durch vermehrtes Gehen und Radfahren",
                  color: "hsl(260, 70%, 50%)",
                  loc: 0,
                },
              ],
            },
            {
              name: "Linderung von Stress und psychischen Erkrankungen",
              color: "hsl(315, 70%, 50%)",
              children: [
                {
                  name: "Einsparungen bei den Gesundheitskosten durch verbesserte psychische Gesundheit aus Sicht der Umwelt im Haushalt",
                  color: "hsl(260, 70%, 50%)",
                  loc: 195480,
                },
              ],
            },
            {
              name: "Beseitigung der Luftverschmutzung",
              color: "hsl(137, 70%, 50%)",
              children: [
                {
                  name: "Reduzierte Luftverschmutzung - NO2",
                  color: "hsl(260, 70%, 50%)",
                  loc: 4183,
                },
                {
                  name: "Reduzierte Luftverschmutzung - O3",
                  color: "hsl(260, 70%, 50%)",
                  loc: 4183,
                },
                {
                  name: "Reduzierte Luftverschmutzung - SO2",
                  color: "hsl(260, 70%, 50%)",
                  loc: 4183,
                },
                {
                  name: "Reduzierte Luftverschmutzung - PM2.5",
                  color: "hsl(260, 70%, 50%)",
                  loc: 4183,
                },
              ],
            },
          ],
        },
        {
          name: "Biodiversität",
          color: "#FFFFF",
          children: [
            {
              name: "Bereitstellung, Schutz und Verbesserung natürlicher Lebensräume",
              color: "hsl(129, 70%, 50%)",
              children: [
                {
                  name: "Zahlungsbereitschaft für den Schutz oder die Verbesserung der Biodiversität",
                  color: "hsl(260, 70%, 50%)",
                  loc: 0,
                },
                {
                  name: "Beitrag zu Biodiversitätszielen",
                  color: "hsl(260, 70%, 50%)",
                  loc: 0,
                },
              ],
            },
          ],
        },
      ],
    },
    cumulatedData: [
      {
        benefit: "Schutz vor Wind",
        value: -25228,
      },
      {
        benefit: "Reduzierung des städtischen Wärmeinseleffekts",
        value: -1215148,
      },
      {
        benefit: "Kohlenstoffspeicherung und -bindung",
        value: -1489,
      },
      {
        benefit: "Auffangen, Speichern und Versickern von Regenwasser",
        value: -7246,
      },
      {
        benefit: "Bereitstellung attraktiver Bewegungsmöglichkeiten",
        value: 0,
      },
      {
        benefit: "Linderung von Stress und psychischen Erkrankungen",
        value: -195480,
      },
      {
        benefit: "Beseitigung der Luftverschmutzung",
        value: -4183 * 4,
      },
      {
        benefit:
          "Bereitstellung, Schutz und Verbesserung natürlicher Lebensräume",
        value: 0,
      },
    ],
  },
];

const tempData = [
  {
    scenario: "Scenario C: Realistic",
    "Interception, storage and infiltration of rainwater": -8677,
    "Shelter from wind": -25228,
    "Reduced Urban heat island effect": -1215148,
    "Carbon Storage and Sequestration": -1489,
    "Provision of opportunities for exercise": 0,
    "Stress and metnal illness alleviation": -195480,
    "Air Pollution Removal": -4183,
  },
  {
    scenario: "Scenario B: Optimistic",
    "Interception, storage and infiltration of rainwater": -1700,
    "Shelter from wind": -10668,
    "Reduced Urban heat island effect": -280893,
    "Carbon Storage and Sequestration": -344,
    "Provision of opportunities for exercise": 0,
    "Stress and metnal illness alleviation": -74934,
    "Air Pollution Removal": -967,
  },
  {
    scenario: "Scenaio A: Baseline",
    "Interception, storage and infiltration of rainwater": 38125,
    "Shelter from wind": 86649,
    "Reduced Urban heat island effect": 2255949,
    "Carbon Storage and Sequestration": 2764,
    "Provision of opportunities for exercise": 518030,
    "Stress and metnal illness alleviation": 216983,
    "Air Pollution Removal": 8980,
  },
];

const dataLayerGreen = {
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

const dataLayerRed = {
  id: "data",
  type: "fill",
  paint: {
    "fill-color": {
      property: "area (ha)",
      stops: [[2, "#e81728"]],
    },
    "fill-opacity": 1,
  },
};

// TODO: calculate dynamically
const total_valuation_chart = [
  {
    scenario: "Scenario A Baseline",
    value: 26483560,
  },
  {
    scenario: "Scenario B Optimistic",
    value: -2882491,
  },
  {
    scenario: "Scenario C Realistic",
    value: -11914807,
  },
];

let euro = new Intl.NumberFormat();

function App() {
  const { t, i18n } = useTranslation();

  const [dataLang, setDataLang] = useState(data_de);
  const [selectedScenario, setSelectedScenario] = useState(data_de[0]);
  const [mapData, setMapData] = useState(null);
  const [mapDataAll, setMapDataAll] = useState(null);

  useEffect(() => {
    if (i18n.language === "de") {
      setDataLang(data_de);
      setSelectedScenario(data_de[0]);

      euro = new Intl.NumberFormat("de", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 0,
      });
    } else {
      setDataLang(data);
      setSelectedScenario(data[0]);

      euro = new Intl.NumberFormat("en", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 0,
      });
    }
  }, [i18n.language]);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/Dark-Matter-Labs/ev-dashboard/refs/heads/main/src/data/" +
        selectedScenario.map,
    )
      .then((resp) => resp.json())
      .then((json) => setMapData(json))
      .catch((err) => console.error("Could not load data", err));
  }, [selectedScenario]);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/Dark-Matter-Labs/ev-dashboard/refs/heads/main/src/data/scenario_all_canopy.geojson",
    )
      .then((resp) => resp.json())
      .then((json) => setMapDataAll(json))
      .catch((err) => console.error("Could not load data", err));
  }, []);

  const handleSelectChange = (event) => {
    const selectedId = Number(event.target.value);
    const scenario = dataLang.find((item) => item.id === selectedId);
    setSelectedScenario(scenario);
  };

  return (
    <div className="global-margin bg-gray-100">
      <NavBar />
      <div className=" bg-white shadow-lg rounded-lg p-6 space-y-6">
        <h1 className=" text-gray-800">{t("title")}</h1>
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4">
          <div className="w-full md:w-1/3">
            <label className="block medium-info-sm text-gray-700">
              {t("scenario")}
            </label>
            <select
              value={selectedScenario.id}
              onChange={handleSelectChange}
              className="book-info-md mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            >
              {dataLang.map((scenario) => (
                <option key={scenario.id} value={scenario.id}>
                  {scenario.title}
                </option>
              ))}
            </select>

            <div className="w-full mt-4 p-4 bg-gray-50 border rounded-lg ">
              <h2 className="medium-info-sm text-gray-600">
                {t("description")}
              </h2>
              <p className="book-intro-sm">{selectedScenario.description}</p>
            </div>
          </div>

          <div className="flex flex-col w-full md:w-2/3 space-y-4 md:space-y-0 md:flex-row md:space-x-4">
            <div className="w-full md:w-1/2 p-4 bg-gray-50 border rounded-lg">
              <h2 className="medium-info-sm text-gray-600">{t("location")}</h2>
              <p className="text-gray-800 book-intro-sm">{t("berlin")}</p>
              <h2 className="medium-info-sm text-gray-600 pt-6">{t("area")}</h2>
              <p className="text-gray-800 book-intro-sm">16.83 Ha</p>
            </div>
            <div className="w-full md:w-1/2 p-4 bg-gray-50 border rounded-lg">
              <h2 className="medium-info-sm text-gray-600">
                {t("tree_number")}
              </h2>
              <p className="text-gray-800 book-intro-sm">
                {selectedScenario.trees}
              </p>
              <h2 className="medium-info-sm text-gray-600 pt-6">
                {t("canopy_cover")}
              </h2>
              <p className="text-gray-800 book-intro-sm">
                {selectedScenario.canopy_cover} Ha
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-gray-800 pb-8">{selectedScenario.title}</h3>
            <div
              className={
                selectedScenario.total_benefit > 0
                  ? " bg-green-100 p-6 rounded-lg"
                  : "bg-red-100 p-6 rounded-lg"
              }
            >
              <h3 className="medium-intro-md text-gray-800">
                {t("total_es_sv")}
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
                selectedScenario.trees > 0
                  ? " bg-green-100 p-6 rounded-lg mt-4"
                  : "bg-red-100 p-6 rounded-lg mt-4"
              }
            >
              <h3 className="medium-intro-md text-gray-800">
                {t("avg_val_per_tree")}
              </h3>
              <p
                className={
                  selectedScenario.trees > 0
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
                {selectedScenario.id === 0 ? (
                  <Layer {...dataLayerGreen} />
                ) : (
                  <Layer {...dataLayerRed} />
                )}
              </Source>
            </Map>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border book-info-md table-fixed">
            <thead>
              <tr>
                <th
                  width="10%"
                  className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-800"
                >
                  {t("benefit_group")}
                </th>
                <th
                  width="8%"
                  className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-800"
                >
                  {t("total")}
                </th>
                <th
                  width="11%"
                  className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-800"
                >
                  {t("tree_function")}
                </th>
                <th
                  width="30%"
                  className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-800"
                >
                  {t("tool")}
                </th>
                <th
                  width="15%"
                  className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-800"
                >
                  {t("benefit_quant")}
                </th>
                <th
                  width="7%"
                  className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-800"
                >
                  {t("value_per_year")}
                </th>
                <th
                  width="7%"
                  className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-800"
                >
                  {t("timeframe")}
                </th>
              </tr>
            </thead>
            <tbody>
              {selectedScenario.benefits.map((benefit, benefitIndex) =>
                benefit.rows.map((row, rowIndex) => (
                  <tr key={`${benefitIndex}-${rowIndex}`}>
                    {rowIndex === 0 && (
                      <td
                        // style={{background: benefit.colour}}
                        rowSpan={benefit.rows.length}
                      >
                        {benefit.group}
                      </td>
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
                      {row.timeframe} {t("years")}
                    </td>
                  </tr>
                )),
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg my-6">
          <h3 className="text-lg font-semibold text-gray-800">
            {t("visualisation_of_benefits")}
          </h3>
          <div className="w-full h-[60vh]">
            <ResponsiveSunburst
              data={selectedScenario.chartData}
              margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
              id="name"
              value="loc"
              cornerRadius={6}
              borderColor={{ theme: "background" }}
              colors={(parent) => {
                return parent.data.color;
              }}
              childColor={{
                from: "color",
                modifiers: [["brighter", 0.1]],
              }}
              enableArcLabels={true}
              arcLabelsSkipAngle={10}
              arcLabelsTextColor={{
                from: "color",
                modifiers: [["darker", 1.4]],
              }}
            />
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg my-6">
          <h3 className="text-lg font-semibold text-gray-800">
            {t("benefit_per_function")}
          </h3>
          <div className="w-full h-[60vh]">
            <ResponsiveBar
              data={selectedScenario.cumulatedData}
              keys={["value"]}
              indexBy="benefit"
              margin={{
                top: 20,
                right: 0,
                bottom: 40,
                left: 100,
              }}
              padding={0.6}
              colors="#2a7ef0"
              axisTop={null}
              axisRight={null}
              enableGridX
              enableGridY
              enableLabel={false}
              axisBottom={{
                tickSize: 0,
                tickPadding: 10,
                tickRotation: 0,
                truncateTickAt: 20,
              }}
            />
          </div>
        </div>

        <div className="py-10">
          <h3 className="text-gray-800 pb-8">{t("scenario_comp_title")}</h3>
          <div className="grid grid-cols-2 gap-4">
            <table className="min-w-full bg-white border book-info-md table-fixed">
              <thead>
                <tr>
                  <th
                    width="20%"
                    className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-800"
                  >
                    {t("scenario")}
                  </th>
                  <th
                    width="30%"
                    className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-800"
                  >
                    {t("description")}
                  </th>
                  <th
                    width="25%"
                    className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-800"
                  >
                    {t("tree_number")}
                  </th>
                  <th
                    width="25%"
                    className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-800"
                  >
                    {t("canopy_cover")}(Ha)
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataLang.map((scenario) => (
                  <tr key={scenario.id}>
                    <td className="px-6 py-4 border-b text-sm text-gray-600">
                      {scenario.title}
                    </td>
                    <td className="px-6 py-4 border-b text-sm text-gray-600">
                      {scenario.description}
                    </td>

                    <td className="px-6 py-4 border-b text-sm text-gray-600">
                      {scenario.trees}
                    </td>

                    <td className="px-6 py-4 border-b text-sm text-gray-600">
                      {scenario.canopy_cover}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Map
              initialViewState={{
                latitude: 52.526,
                longitude: 13.3,
                zoom: 14,
              }}
              mapStyle="mapbox://styles/mapbox/light-v9"
              mapboxAccessToken={MAPBOX_TOKEN}
            >
              <Source type="geojson" data={mapDataAll}>
                <Layer {...dataLayerGreen} />
              </Source>
            </Map>

            <div className="w-full h-[60vh]">
              <ResponsiveBar
                data={total_valuation_chart}
                keys={["value"]}
                indexBy="scenario"
                margin={{
                  top: 20,
                  right: 0,
                  bottom: 40,
                  left: 100,
                }}
                padding={0.6}
                colors="#2a7ef0"
                axisTop={null}
                axisRight={null}
                enableGridX
                enableGridY
                enableLabel={false}
                axisBottom={{
                  tickSize: 0,
                  tickPadding: 10,
                  tickRotation: 0,
                  truncateTickAt: 20,
                }}
              />
            </div>
            <table className="min-w-full bg-white border book-info-md">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-800"></th>
                  <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-800">
                    {t("scenario_a")}
                  </th>
                  <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-800">
                    {t("scenario_b")}
                  </th>
                  <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-800">
                    {t("scenario_c")}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-6 py-4 border-b text-sm text-gray-600">
                    {t("total")}
                  </td>
                  <td className="px-6 py-4 border-b text-sm text-gray-600">
                    €86.8M
                  </td>

                  <td className="px-6 py-4 border-b text-sm text-gray-600">
                    -€2.7M
                  </td>

                  <td className="px-6 py-4 border-b text-sm text-gray-600">
                    -€11.4M
                  </td>
                </tr>

                <tr>
                  <td className="px-6 py-4 border-b text-sm text-gray-600">
                    {t("climate_reg")}
                  </td>
                  <td className="px-6 py-4 border-b text-sm text-gray-600">
                    €20.8M
                  </td>

                  <td className="px-6 py-4 border-b text-sm text-gray-600">
                    -€2.6M
                  </td>

                  <td className="px-6 py-4 border-b text-sm text-gray-600">
                    -€11M
                  </td>
                </tr>

                <tr>
                  <td className="px-6 py-4 border-b text-sm text-gray-600">
                    {t("water_mgmt")}
                  </td>
                  <td className="px-6 py-4 border-b text-sm text-gray-600">
                    €20.8M
                  </td>

                  <td className="px-6 py-4 border-b text-sm text-gray-600">
                    -€2.6M
                  </td>

                  <td className="px-6 py-4 border-b text-sm text-gray-600">
                    -€11M
                  </td>
                </tr>

                <tr>
                  <td className="px-6 py-4 border-b text-sm text-gray-600">
                    {t("health")}
                  </td>
                  <td className="px-6 py-4 border-b text-sm text-gray-600">
                    €65M
                  </td>

                  <td className="px-6 py-4 border-b text-sm text-gray-600">
                    -€0.027M
                  </td>

                  <td className="px-6 py-4 border-b text-sm text-gray-600">
                    -€0.12M
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="w-full h-[60vh]">
            <ResponsiveBar
              data={tempData}
              keys={[
                "Interception, storage and infiltration of rainwater",
                "Shelter from wind",
                "Reduced Urban heat island effect",
                "Carbon Storage and Sequestration",
                "Provision of opportunities for exercise",
                "Stress and metnal illness alleviation",
                "Air Pollution Removal",
              ]}
              indexBy="scenario"
              margin={{ top: 50, right: 130, bottom: 50, left: 120 }}
              padding={0.3}
              layout="horizontal"
              valueScale={{ type: "linear" }}
              indexScale={{ type: "band", round: true }}
              colors={{ scheme: "nivo" }}
              borderColor={{
                from: "color",
                modifiers: [["darker", 1.6]],
              }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "€ per year",
                legendPosition: "middle",
                legendOffset: 32,
                truncateTickAt: 0,
              }}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{
                from: "color",
                modifiers: [["darker", 1.6]],
              }}
              legends={[
                {
                  dataFrom: "keys",
                  anchor: "bottom-right",
                  direction: "column",
                  justify: false,
                  translateX: 120,
                  translateY: 0,
                  itemsSpacing: 2,
                  itemWidth: 100,
                  itemHeight: 20,
                  itemDirection: "left-to-right",
                  itemOpacity: 0.85,
                  symbolSize: 20,
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]}
              role="application"
              barAriaLabel={(e) =>
                e.id + ": " + e.formattedValue + " in country: " + e.indexValue
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
