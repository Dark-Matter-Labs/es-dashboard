import { useState, useEffect } from "react";
import { ResponsiveSunburst } from "@nivo/sunburst";
import { ResponsiveBar } from "@nivo/bar";
import Map, { Source, Layer } from "react-map-gl";
import "mapboxgl-legend/dist/style.css";
import { useTranslation } from "react-i18next";
import { Element } from "react-scroll";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import TNClogo from "./assets/TNC.svg";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const data = [
  {
    id: 0,
    title: "Baseline",
    description:
      "Ecosystem Services value from all existing trees in a 50m buffer from road.",
    trees: 357,
    canopy_cover: 2.56,
    total_benefit: 10510563,
    map: "scenario_a_canopy.geojson",
    tram: "tram_route.geojson",
    benefits: [
      {
        group: "Climate Change Adaptation & Mitigation",
        colour: "#06E29E",
        total: 7608822,
        cumulatedData: [
          {
            benefit: "Shelter from wind",
            value: 103965,
          },
          {
            benefit: "Reduction of urban heat island effect",
            value: 751983,
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
            amount: 311371,
            unit: "kgCO2/yr not emitted",
            benefit_per_year: 61340,
            gross_value: 0,
            indirect: 544329,
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
            amount: 0.2,
            unit: "lives saved per yr",
            benefit_per_year: 692819,
            gross_value: 0,
            indirect: 6148048,
            timeframe: 10,
          },
          {
            function: "Reduction of urban heat island effect",
            tool: "Reduced Hospital Costs from Heat-Related Morbidity",
            amount: 16,
            unit: "patient days per yr",
            benefit_per_year: 59164,
            gross_value: 0,
            indirect: 525015,
            timeframe: 10,
          },
          {
            function: "Carbon storage and sequestration",
            tool: "Carbon sequestered by trees",
            amount: 701.43,
            unit: "kgCO2e sequestered",
            benefit_per_year: 2764,
            gross_value: 0,
            indirect: 24524,
            timeframe: 10,
          },
        ],
      },
      {
        group: "Water Management & Flood Alleviation",
        colour: "#084887",
        total: 164085,
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
            timeframe: 10,
          },
          {
            function: "Interception, storage and infiltration of rainwater",
            tool: "Energy and carbon emissions savings from reduced stormwater volume entering combined sewers",
            amount: 68865.58,
            unit: "kWh/yr energy saved",
            benefit_per_year: 13677,
            gross_value: 260347,
            indirect: 0,
            timeframe: 10,
          },
          {
            function: "Interception, storage and infiltration of rainwater",
            tool: "Energy and carbon emissions savings from reduced stormwater volume entering combined sewers",
            amount: 27.34,
            unit: "tCO2e/yr carbon saved",
            benefit_per_year: 5386,
            gross_value: 0,
            indirect: 102525,
            timeframe: 10,
          },
        ],
      },
      {
        group: "Health & Well-being",
        colour: "#A3BDEC",
        total: 2737656,
        cumulatedData: [
          {
            benefit: "Provision of attractive opportunities for exercise",
            value: 286158,
          },
          {
            benefit: "Stress and mental illness alleviation",
            value: 120546,
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
            amount: 0.07,
            unit: "lives saved per yr",
            benefit_per_year: 286158,
            gross_value: 0,
            indirect: 2446937,
            timeframe: 10,
          },
          {
            function: "Stress and mental illness alleviation",
            tool: "Health cost savings from improved mental health from view to green from household",
            amount: 333,
            unit: "number of people",
            benefit_per_year: 120546,
            gross_value: 0,
            indirect: 211027,
            timeframe: 10,
          },
          {
            function: "Air pollution removal",
            tool: "Reduced air pollution",
            amount: 0.01,
            unit: "t/yr of NO2 removed",
            benefit_per_year: 8980,
            gross_value: 79692,
            indirect: 0,
            timeframe: 10,
          },
          {
            function: "Air pollution removal",
            tool: "Reduced air pollution",
            amount: 0.03,
            unit: "t/yr of O3 removed",
            benefit_per_year: 8980,
            gross_value: 79692,
            indirect: 0,
            timeframe: 10,
          },
          {
            function: "Air pollution removal",
            tool: "Reduced air pollution",
            amount: 0.0,
            unit: "t/yr of SO2 removed",
            benefit_per_year: 8980,
            gross_value: 79692,
            indirect: 0,
            timeframe: 10,
          },
          {
            function: "Air pollution removal",
            tool: "Reduced air pollution",
            amount: 0.07,
            unit: "t/yr of PM2.5 removed",
            benefit_per_year: 8980,
            gross_value: 79692,
            indirect: 0,
            timeframe: 10,
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
                  loc: 61340,
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
                  loc: 692819,
                },
                {
                  name: "Reduced Hospital Costs from Heat-Related Morbidity",
                  color: "hsl(208, 70%, 50%)",
                  loc: 59164,
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
                  loc: 19063,
                },
                {
                  name: "Energy and carbon emissions savings from reduced stormwater volume entering combined sewers",
                  color: "hsl(349, 70%, 50%)",
                  loc: 13677,
                },
                {
                  name: "Energy and carbon emissions savings from reduced stormwater volume entering combined sewers",
                  color: "hsl(349, 70%, 50%)",
                  loc: 5386,
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
                  loc: 286158,
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
                  loc: 120546,
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
      ],
    },
    cumulatedData: [
      {
        benefit: "Shelter from wind",
        value: 103965,
      },
      {
        benefit: "Reduction of urban heat island effect",
        value: 751983,
      },
      {
        benefit: "Carbon storage and sequestration",
        value: 2764,
      },
      {
        benefit: "Interception, storage and inflitration of rainwater",
        value: 38125,
      },
      {
        benefit: "Provision of attractive opportunities for exercise",
        value: 286158,
      },
      {
        benefit: "Stress and mental illness alleviation",
        value: 120546,
      },
      {
        benefit: "Air pollution removal",
        value: 8980 * 4,
      },
    ],
  },
  {
    id: 1,
    title: "Scenario A - Optimistic",
    description:
      "Ecosystem Services value from trees that are to be cut according to a technical survey commissioned by BVG (public transport agency).",
    trees: -35,
    canopy_cover: 0.31,
    total_benefit: -1035145,
    map: "scenario_b_canopy.geojson",
    tram: "tram_route.geojson",
    benefits: [
      {
        group: "Climate Change Adaptation & Mitigation",
        colour: "#06E29E",
        total: -939055,
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
            amount: -25032,
            unit: "kgCO2/yr not emitted",
            benefit_per_year: -4931,
            gross_value: 0,
            indirect: -43760,
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
            benefit_per_year: -86264,
            gross_value: 0,
            indirect: -765506,
            timeframe: 10,
          },
          {
            function: "Reduction of urban heat island effect",
            tool: "Reduced Hospital Costs from Heat-Related Morbidity",
            amount: -2,
            unit: "patient days per yr",
            benefit_per_year: -7367,
            gross_value: 0,
            indirect: -65371,
            timeframe: 10,
          },
          {
            function: "Carbon storage and sequestration",
            tool: "Carbon sequestered by trees",
            amount: -87,
            unit: "kgCO2e sequestered",
            benefit_per_year: -344,
            gross_value: 0,
            indirect: -3054,
            timeframe: 10,
          },
        ],
      },
      {
        group: "Water Management & Flood Alleviation",
        colour: "#084887",
        total: -14632,
        rows: [
          {
            function: "Interception, storage and infiltration of rainwater",
            tool: "Energy and carbon emissions savings from reduced stormwater volume entering combined sewers",
            amount: -6939182,
            unit: "L/yr water diverted from sewers",
            benefit_per_year: 0,
            gross_value: -0,
            indirect: 0,
            timeframe: 10,
          },
          {
            function: "Interception, storage and infiltration of rainwater",
            tool: "Energy and carbon emissions savings from reduced stormwater volume entering combined sewers",
            amount: -6141.18,
            unit: "kWh/yr energy saved",
            benefit_per_year: -1220,
            gross_value: -10498,
            indirect: 0,
            timeframe: 10,
          },
          {
            function: "Interception, storage and infiltration of rainwater",
            tool: "Energy and carbon emissions savings from reduced stormwater volume entering combined sewers",
            amount: -2.44,
            unit: "tCO2e/yr carbon saved",
            benefit_per_year: -480,
            gross_value: 0,
            indirect: -4134,
            timeframe: 10,
          },
        ],
      },
      {
        group: "Health & Well-being",
        colour: "#A3BDEC",
        total: -81458,
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
            amount: -115,
            unit: "number of patients",
            benefit_per_year: -41630,
            gross_value: 0,
            indirect: -72877,
            timeframe: 10,
          },
          {
            function: "Air pollution removal",
            tool: "Reduced air pollution",
            amount: -0.002,
            unit: "t/yr of NO2 removed",
            benefit_per_year: -967,
            gross_value: -8581,
            indirect: 0,
            timeframe: 10,
          },
          {
            function: "Air pollution removal",
            tool: "Reduced air pollution",
            amount: -0.004,
            unit: "t/yr of O3 removed",
            benefit_per_year: -967,
            gross_value: -8581,
            indirect: 0,
            timeframe: 10,
          },
          {
            function: "Air pollution removal",
            tool: "Reduced air pollution",
            amount: 0.0,
            unit: "t/yr of SO2 removed",
            benefit_per_year: -967,
            gross_value: -8581,
            indirect: 0,
            timeframe: 10,
          },
          {
            function: "Air pollution removal",
            tool: "Reduced air pollution",
            amount: -0.009,
            unit: "t/yr of PM2.5 removed",
            benefit_per_year: -967,
            gross_value: -8581,
            indirect: 0,
            timeframe: 10,
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
                  loc: 4931,
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
                  loc: 86264,
                },
                {
                  name: "Reduced Hospital Costs from Heat-Related Morbidity",
                  color: "hsl(208, 70%, 50%)",
                  loc: 7367,
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
                  loc: 480,
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
                  loc: 41630,
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
      ],
    },
    cumulatedData: [
      {
        benefit: "Shelter from wind",
        value: -12060,
      },
      {
        benefit: "Reduction of urban heat island effect",
        value: -93631,
      },
      {
        benefit: "Carbon storage and sequestration",
        value: -344,
      },
      {
        benefit: "Interception, storage and inflitration of rainwater",
        value: -1700,
      },
      {
        benefit: "Provision of attractive opportunities for exercise",
        value: 0,
      },
      {
        benefit: "Stress and mental illness alleviation",
        value: -41630,
      },
      {
        benefit: "Air pollution removal",
        value: -947 * 4,
      },
    ],
  },
  {
    id: 2,
    title: "Scenario B - Realistic",
    description:
      "Ecosystem Services value from all trees considered at risk of being cut off if they are located within the construction area or their crown diameter area overlaps with the construction area based on the Berlin Tree Protection Ordinance.",
    trees: -131,
    canopy_cover: 1.38,
    total_benefit: -4159576,
    map: "scenario_c_canopy.geojson",
    tram: "tram_route.geojson",
    benefits: [
      {
        group: "Climate Change Adaptation & Mitigation",
        colour: "#06E29E",
        total: -3856015,
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
            amount: -58853,
            unit: "kgCO2/yr not emitted",
            benefit_per_year: -11594,
            gross_value: 0,
            indirect: -102885,
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
            benefit_per_year: -373181,
            gross_value: 0,
            indirect: -3311595,
            timeframe: 10,
          },
          {
            function: "Reduction of urban heat island effect",
            tool: "Reduced Hospital Costs from Heat-Related Morbidity",
            amount: -9,
            unit: "patient days per yr",
            benefit_per_year: -31868,
            gross_value: 0,
            indirect: -282795,
            timeframe: 10,
          },
          {
            function: "Carbon storage and sequestration",
            tool: "Carbon sequestered by trees",
            amount: -378,
            unit: "kgCO2e sequestered",
            benefit_per_year: -1489,
            gross_value: 0,
            indirect: -13210,
            timeframe: 10,
          },
        ],
      },
      {
        group: "Water Management & Flood Alleviation",
        colour: "#084887",
        total: -76326,
        rows: [
          {
            function: "Interception, storage and infiltration of rainwater",
            tool: "Energy and carbon emissions savings from reduced stormwater volume entering combined sewers",
            amount: -36195993,
            unit: "L/yr water diverted from sewers",
            benefit_per_year: 0,
            gross_value: 0,
            indirect: 0,
            timeframe: 10,
          },
          {
            function: "Interception, storage and infiltration of rainwater",
            tool: "Energy and carbon emissions savings from reduced stormwater volume entering combined sewers",
            amount: -32033.45,
            unit: "kWh/yr energy saved",
            benefit_per_year: -6362,
            gross_value: -54761,
            indirect: 0,
            timeframe: 10,
          },
          {
            function: "Interception, storage and infiltration of rainwater",
            tool: "Reduced carbon emissions",
            amount: -12.72,
            unit: "tCO2e/yr carbon saved",
            benefit_per_year: -2505,
            gross_value: 0,
            indirect: -21565,
            timeframe: 10,
          },
        ],
      },
      {
        group: "Health & Well-being",
        colour: "#A3BDEC",
        total: -227235,
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
            amount: -300,
            unit: "number of patients",
            benefit_per_year: -108600,
            gross_value: 0,
            indirect: -190114,
            timeframe: 10,
          },
          {
            function: "Air pollution removal",
            tool: "Reduced air pollution",
            amount: -0.007,
            unit: "t/yr of NO2 removed",
            benefit_per_year: -4183,
            gross_value: -37121,
            indirect: 0,
            timeframe: 10,
          },
          {
            function: "Air pollution removal",
            tool: "Reduced air pollution",
            amount: -0.017,
            unit: "t/yr of O3 removed",
            benefit_per_year: -4183,
            gross_value: -37121,
            indirect: 0,
            timeframe: 10,
          },
          {
            function: "Air pollution removal",
            tool: "Reduced air pollution",
            amount: -0.001,
            unit: "t/yr of SO2 removed",
            benefit_per_year: -4183,
            gross_value: -37121,
            indirect: 0,
            timeframe: 10,
          },
          {
            function: "Air pollution removal",
            tool: "Reduced air pollution",
            amount: -0.039,
            unit: "t/yr of SO2 removed",
            benefit_per_year: -4183,
            gross_value: -37121,
            indirect: 0,
            timeframe: 10,
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
                  loc: 11594,
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
                  loc: 373181,
                },
                {
                  name: "Reduced Hospital Costs from Heat-Related Morbidity",
                  color: "hsl(208, 70%, 50%)",
                  loc: 31868,
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
                  loc: 6362,
                },
                {
                  name: "Energy and carbon emissions savings from reduced stormwater volume entering combined sewers",
                  color: "hsl(349, 70%, 50%)",
                  loc: 2505,
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
                  loc: 108600,
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
      ],
    },
    cumulatedData: [
      {
        benefit: "Shelter from wind",
        value: -28591,
      },
      {
        benefit: "Reduction of urban heat island effect",
        value: -405049,
      },
      {
        benefit: "Carbon storage and sequestration",
        value: -1489,
      },
      {
        benefit: "Interception, storage and inflitration of rainwater",
        value: -8867,
      },
      {
        benefit: "Provision of attractive opportunities for exercise",
        value: 0,
      },
      {
        benefit: "Stress and mental illness alleviation",
        value: -108600,
      },
      {
        benefit: "Air pollution removal",
        value: -4183 * 4,
      },
    ],
  },
  {
    id: 3,
    title: "Scenario C - Alternative",
    description:
      "A new route is considered based on other extension route options shown in pre-planning application documents. All trees are considered at risk of being cut if a 1.5m buffer from their crown overlaps within the construction area.",
    trees: -45,
    canopy_cover: 0.242,
    total_benefit: -249555,
    map: "alternative_canopy_loss.geojson",
    tram: "alternative_tram_route.geojson",
    benefits: [
      {
        group: "Climate Change Adaptation & Mitigation",
        colour: "#06E29E",
        total: -221325,
        rows: [
          {
            function: "Shelter from wind",
            tool: "Reduced building energy consumption for heating",
            amount: -184000,
            unit: "kWh/yr energy saved",
            benefit_per_year: -896,
            gross_value: -7712,
            indirect: 0,
            timeframe: 10,
          },
          {
            function: "Shelter from wind",
            tool: "Avoided carbon emissions from building energy saving for heating",
            amount: -58853,
            unit: "kgCO2/yr not emitted",
            benefit_per_year: -640,
            gross_value: 0,
            indirect: -5679,
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
            benefit_per_year: -21348,
            gross_value: 0,
            indirect: -189440,
            timeframe: 10,
          },
          {
            function: "Reduction of urban heat island effect",
            tool: "Reduced Hospital Costs from Heat-Related Morbidity",
            amount: -9,
            unit: "patient days per yr",
            benefit_per_year: -1823,
            gross_value: 0,
            indirect: -16177,
            timeframe: 10,
          },
          {
            function: "Carbon storage and sequestration",
            tool: "Carbon sequestered by trees",
            amount: -378,
            unit: "kgCO2e sequestered",
            benefit_per_year: -753,
            gross_value: 0,
            indirect: -6680,
            timeframe: 10,
          },
        ],
      },
      {
        group: "Water Management & Flood Alleviation",
        colour: "#084887",
        total: -17277,
        rows: [
          {
            function: "Interception, storage and infiltration of rainwater",
            tool: "Energy and carbon emissions savings from reduced stormwater volume entering combined sewers",
            amount: -36195993,
            unit: "L/yr water diverted from sewers",
            benefit_per_year: 0,
            gross_value: 0,
            indirect: 0,
            timeframe: 10,
          },
          {
            function: "Interception, storage and infiltration of rainwater",
            tool: "Energy and carbon emissions savings from reduced stormwater volume entering combined sewers",
            amount: -32033.45,
            unit: "kWh/yr energy saved",
            benefit_per_year: -1440,
            gross_value: -12396,
            indirect: 0,
            timeframe: 10,
          },
          {
            function: "Interception, storage and infiltration of rainwater",
            tool: "Reduced carbon emissions",
            amount: -12.72,
            unit: "tCO2e/yr carbon saved",
            benefit_per_year: -567,
            gross_value: 0,
            indirect: -4881,
            timeframe: 10,
          },
        ],
      },
      {
        group: "Health & Well-being",
        colour: "#A3BDEC",
        total: -35027,
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
            amount: -300,
            unit: "number of patients",
            benefit_per_year: -45,
            gross_value: 0,
            indirect: -79,
            timeframe: 10,
          },
          {
            function: "Air pollution removal",
            tool: "Reduced air pollution",
            amount: -0.007,
            unit: "t/yr of NO2 removed",
            benefit_per_year: -734,
            gross_value: -6510,
            indirect: 0,
            timeframe: 10,
          },
          {
            function: "Air pollution removal",
            tool: "Reduced air pollution",
            amount: -0.017,
            unit: "t/yr of O3 removed",
            benefit_per_year: -734,
            gross_value: -6510,
            indirect: 0,
            timeframe: 10,
          },
          {
            function: "Air pollution removal",
            tool: "Reduced air pollution",
            amount: -0.001,
            unit: "t/yr of SO2 removed",
            benefit_per_year: -734,
            gross_value: -6510,
            indirect: 0,
            timeframe: 10,
          },
          {
            function: "Air pollution removal",
            tool: "Reduced air pollution",
            amount: -0.039,
            unit: "t/yr of SO2 removed",
            benefit_per_year: -734,
            gross_value: -6510,
            indirect: 0,
            timeframe: 10,
          },
        ],
      },
    ],
    chartData: {
      name: "scenario_d",
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
                  loc: 896,
                },
                {
                  name: "Avoided carbon emissions from building energy saving for heating",
                  color: "hsl(208, 70%, 50%)",
                  loc: 640,
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
                  loc: 21348,
                },
                {
                  name: "Reduced Hospital Costs from Heat-Related Morbidity",
                  color: "hsl(208, 70%, 50%)",
                  loc: 1823,
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
                  loc: 753,
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
                  loc: 1440,
                },
                {
                  name: "Energy and carbon emissions savings from reduced stormwater volume entering combined sewers",
                  color: "hsl(349, 70%, 50%)",
                  loc: 567,
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
                  loc: 45,
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
                  loc: 734,
                },
                {
                  name: "Reduced air pollution - O3",
                  color: "hsl(260, 70%, 50%)",
                  loc: 734,
                },
                {
                  name: "Reduced air pollution - SO2",
                  color: "hsl(260, 70%, 50%)",
                  loc: 734,
                },
                {
                  name: "Reduced air pollution - PM2.5",
                  color: "hsl(260, 70%, 50%)",
                  loc: 734,
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
        value: -1536,
      },
      {
        benefit: "Reduction of urban heat island effect",
        value: -23171,
      },
      {
        benefit: "Carbon storage and sequestration",
        value: -753,
      },
      {
        benefit: "Interception, storage and inflitration of rainwater",
        value: -2007,
      },
      {
        benefit: "Provision of attractive opportunities for exercise",
        value: 0,
      },
      {
        benefit: "Stress and mental illness alleviation",
        value: -45,
      },
      {
        benefit: "Air pollution removal",
        value: -734 * 4,
      },
    ],
  },
];

const data_de = [
  {
    id: 0,
    title: "Ausgangslage",
    description:
      "Wert der Ökosystemdienstleistungen durch alle vorhandenen Bäume in einem Puffer von 50m von der Straße.",
    trees: 357,
    canopy_cover: 2.56,
    total_benefit: 10510563,
    map: "scenario_a_canopy.geojson",
    tram: "tram_route.geojson",
    benefits: [
      {
        group: "Anpassung an den Klimawandel und Abschwächung seiner Folgen",
        colour: "#06E29E",
        total: 7608822,
        cumulatedData: [
          {
            benefit: "Schutz vor Wind",
            value: 103965,
          },
          {
            benefit: "Reduzierung des städtischen Wärmeinseleffekts",
            value: 751983,
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
            amount: 311371,
            unit: "kgCO2/Jahr nicht emittiert",
            benefit_per_year: 61340,
            gross_value: 0,
            indirect: 544329,
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
            amount: 0.2,
            unit: "Gerettete Leben pro Jahr",
            benefit_per_year: 692819,
            gross_value: 0,
            indirect: 6148048,
            timeframe: 10,
          },
          {
            function: "Reduzierung des städtischen Wärmeinseleffekts",
            tool: "Reduzierte Krankenhauskosten durch hitzebedingte Morbidität",
            amount: 16,
            unit: "Patiententage pro Jahr",
            benefit_per_year: 59164,
            gross_value: 0,
            indirect: 525015,
            timeframe: 10,
          },
          {
            function: "Kohlenstoffspeicherung und -bindung",
            tool: "Bäume binden Kohlenstoff",
            amount: 701.43,
            unit: "kgCO2e beschlagnahmt",
            benefit_per_year: 2764,
            gross_value: 0,
            indirect: 24524,
            timeframe: 10,
          },
        ],
      },
      {
        group: "Wassermanagement und Hochwasserschutz",
        colour: "#084887",
        total: 164085,
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
            timeframe: 10,
          },
          {
            function: "Auffangen, Speichern und Versickern von Regenwasser",
            tool: "Energie- und CO2-Einsparungen durch geringere Regenwassermengen in der Mischkanalisation",
            amount: 68865.58,
            unit: "kWh/yr Energie gespart",
            benefit_per_year: 13677,
            gross_value: 260347,
            indirect: 0,
            timeframe: 10,
          },
          {
            function: "Auffangen, Speichern und Versickern von Regenwasser",
            tool: "Energie- und CO2-Einsparungen durch geringere Regenwassermengen in der Mischkanalisation",
            amount: 27.34,
            unit: "Eingesparte tCO2e/Jahr",
            benefit_per_year: 5386,
            gross_value: 0,
            indirect: 102525,
            timeframe: 10,
          },
        ],
      },
      {
        group: "Gesundheit & Wohlbefinden",
        colour: "#A3BDEC",
        total: 2737656,
        cumulatedData: [
          {
            benefit: "Bereitstellung attraktiver Bewegungsmöglichkeiten",
            value: 286158,
          },
          {
            benefit: "Linderung von Stress und psychischen Erkrankungen",
            value: 120546,
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
            amount: 0.07,
            unit: "Gerettete Leben pro Jahr",
            benefit_per_year: 286158,
            gross_value: 0,
            indirect: 2446937,
            timeframe: 10,
          },
          {
            function: "Linderung von Stress und psychischen Erkrankungen",
            tool: "Einsparungen bei den Gesundheitskosten durch verbesserte psychische Gesundheit aus Sicht der Umwelt im Haushalt",
            amount: 333,
            unit: "Personenzahl",
            benefit_per_year: 120546,
            gross_value: 0,
            indirect: 211027,
            timeframe: 10,
          },
          {
            function: "Beseitigung der Luftverschmutzung",
            tool: "Reduzierte Luftverschmutzung",
            amount: 0.01,
            unit: "t/Jahr entferntes NO2",
            benefit_per_year: 8980,
            gross_value: 79692,
            indirect: 0,
            timeframe: 10,
          },
          {
            function: "Beseitigung der Luftverschmutzung",
            tool: "Reduzierte Luftverschmutzung",
            amount: 0.03,
            unit: "t/Jahr entferntes O3",
            benefit_per_year: 8980,
            gross_value: 79692,
            indirect: 0,
            timeframe: 10,
          },
          {
            function: "Beseitigung der Luftverschmutzung",
            tool: "Reduzierte Luftverschmutzung",
            amount: 0.0,
            unit: "t/Jahr entferntes SO2",
            benefit_per_year: 8980,
            gross_value: 79692,
            indirect: 0,
            timeframe: 10,
          },
          {
            function: "Beseitigung der Luftverschmutzung",
            tool: "Reduzierte Luftverschmutzung",
            amount: 0.07,
            unit: "t/Jahr entferntes PM2.5",
            benefit_per_year: 8980,
            gross_value: 79692,
            indirect: 0,
            timeframe: 10,
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
                  loc: 61340,
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
                  loc: 692819,
                },
                {
                  name: "Reduzierte Krankenhauskosten durch hitzebedingte Morbidität",
                  color: "hsl(208, 70%, 50%)",
                  loc: 59164,
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
                  loc: 19063,
                },
                {
                  name: "Energie- und CO2-Einsparungen durch geringere Regenwassermengen in der Mischkanalisation",
                  color: "hsl(349, 70%, 50%)",
                  loc: 13677,
                },
                {
                  name: "Energie- und CO2-Einsparungen durch geringere Regenwassermengen in der Mischkanalisation",
                  color: "hsl(349, 70%, 50%)",
                  loc: 5386,
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
                  loc: 286158,
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
                  loc: 120546,
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
      ],
    },
    cumulatedData: [
      {
        benefit: "Schutz vor Wind",
        value: 103965,
      },
      {
        benefit: "Reduzierung des städtischen Wärmeinseleffekts",
        value: 751983,
      },
      {
        benefit: "Kohlenstoffspeicherung und -bindung",
        value: 2764,
      },
      {
        benefit: "Auffangen, Speichern und Versickern von Regenwasser",
        value: 38125,
      },
      {
        benefit: "Bereitstellung attraktiver Bewegungsmöglichkeiten",
        value: 286158,
      },
      {
        benefit: "Linderung von Stress und psychischen Erkrankungen",
        value: 120546,
      },
      {
        benefit: "Beseitigung der Luftverschmutzung",
        value: 8980 * 4,
      },
    ],
  },
  {
    id: 1,
    title: "Szenario A - Optimistisch",
    description:
      "Wert der Ökosystemdienstleistungen von Bäumen, die gefällt werden sollen, laut einer technischen Untersuchung im Auftrag der BVG.",
    trees: -35,
    canopy_cover: 0.31,
    total_benefit: -2882491,
    map: "scenario_b_canopy.geojson",
    tram: "tram_route.geojson",
    benefits: [
      {
        group: "Anpassung an den Klimawandel und Abschwächung seiner Folgen",
        colour: "#06E29E",
        total: -939055,
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
            amount: -25032,
            unit: "kgCO2/Jahr nicht emittiert",
            benefit_per_year: -4931,
            gross_value: 0,
            indirect: -43760,
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
            benefit_per_year: -86264,
            gross_value: 0,
            indirect: -765506,
            timeframe: 10,
          },
          {
            function: "Reduzierung des städtischen Wärmeinseleffekts",
            tool: "Reduzierte Krankenhauskosten durch hitzebedingte Morbidität",
            amount: -2,
            unit: "Patiententage pro Jahr",
            benefit_per_year: -7367,
            gross_value: 0,
            indirect: -65371,
            timeframe: 10,
          },
          {
            function: "Kohlenstoffspeicherung und -bindung",
            tool: "Bäume binden Kohlenstoff",
            amount: -87,
            unit: "kg CO2e gebunden",
            benefit_per_year: -344,
            gross_value: 0,
            indirect: -3054,
            timeframe: 10,
          },
        ],
      },
      {
        group: "Wassermanagement und Hochwasserschutz",
        colour: "#084887",
        total: -14632,
        rows: [
          {
            function: "Auffangen, Speichern und Versickern von Regenwasser",
            tool: "Energie- und CO2-Einsparungen durch geringere Regenwassermengen in der Mischkanalisation",
            amount: -6939182,
            unit: "L/Jahr aus der Kanalisation abgeleitetes Wasser",
            benefit_per_year: 0,
            gross_value: -0,
            indirect: 0,
            timeframe: 10,
          },
          {
            function: "Auffangen, Speichern und Versickern von Regenwasser",
            tool: "Energie- und CO2-Einsparungen durch geringere Regenwassermengen in der Mischkanalisation",
            amount: -6141.18,
            unit: "Eingesparte Energie in kWh/Jahr",
            benefit_per_year: -1220,
            gross_value: -10498,
            indirect: 0,
            timeframe: 10,
          },
          {
            function: "Auffangen, Speichern und Versickern von Regenwasser",
            tool: "Energie- und CO2-Einsparungen durch geringere Regenwassermengen in der Mischkanalisation",
            amount: -2.44,
            unit: "Eingesparte tCO2e/Jahr",
            benefit_per_year: -480,
            gross_value: 0,
            indirect: -4134,
            timeframe: 10,
          },
        ],
      },
      {
        group: "Gesundheit & Wohlbefinden",
        colour: "#A3BDEC",
        total: -81458,
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
            amount: -115,
            unit: "Anzahl der Patienten",
            benefit_per_year: -41630,
            gross_value: 0,
            indirect: -72877,
            timeframe: 10,
          },
          {
            function: "Beseitigung der Luftverschmutzung",
            tool: "Reduzierte Luftverschmutzung",
            amount: -0.002,
            unit: "t/Jahr entferntes NO2",
            benefit_per_year: -967,
            gross_value: -8581,
            indirect: 0,
            timeframe: 10,
          },
          {
            function: "Beseitigung der Luftverschmutzung",
            tool: "Reduzierte Luftverschmutzung",
            amount: -0.004,
            unit: "t/Jahr entferntesf O3",
            benefit_per_year: -967,
            gross_value: -8581,
            indirect: 0,
            timeframe: 10,
          },
          {
            function: "Beseitigung der Luftverschmutzung",
            tool: "Reduzierte Luftverschmutzung",
            amount: 0.0,
            unit: "t/Jahr entferntes SO2",
            benefit_per_year: -967,
            gross_value: -8581,
            indirect: 0,
            timeframe: 10,
          },
          {
            function: "Beseitigung der Luftverschmutzung",
            tool: "Reduzierte Luftverschmutzung",
            amount: -0.009,
            unit: "t/Jahr entferntes PM2.5",
            benefit_per_year: -967,
            gross_value: -8581,
            indirect: 0,
            timeframe: 10,
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
                  loc: 4931,
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
                  loc: 86264,
                },
                {
                  name: "Reduzierte Krankenhauskosten durch hitzebedingte Morbidität",
                  color: "hsl(208, 70%, 50%)",
                  loc: 7367,
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
                  loc: 480,
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
                  loc: 41630,
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
      ],
    },
    cumulatedData: [
      {
        benefit: "Schutz vor Wind",
        value: -12060,
      },
      {
        benefit: "Reduzierung des städtischen Wärmeinseleffekts",
        value: -93631,
      },
      {
        benefit: "Kohlenstoffspeicherung und -bindung",
        value: -344,
      },
      {
        benefit: "Auffangen, Speichern und Versickern von Regenwasser",
        value: -1700,
      },
      {
        benefit: "Bereitstellung attraktiver Bewegungsmöglichkeiten",
        value: 0,
      },
      {
        benefit: "Linderung von Stress und psychischen Erkrankungen",
        value: -41630,
      },
      {
        benefit: "Beseitigung der Luftverschmutzung",
        value: -947 * 4,
      },
    ],
  },
  {
    id: 2,
    title: "Szenario B - Realistisch",
    description:
      "Der Wert der Ökosystemdienstleistungen aller Bäume gilt als vom Fällen bedroht, wenn sie innerhalb der Baufläche liegen oder ihr Kronendurchmesser auf Grundlage der Berliner Baumschutzverordnung mit der Baufläche überlappt.",
    trees: -131,
    canopy_cover: 1.38,
    total_benefit: -4159576,
    map: "scenario_c_canopy.geojson",
    tram: "tram_route.geojson",
    benefits: [
      {
        group: "Anpassung an den Klimawandel und Abschwächung seiner Folgen",
        colour: "#06E29E",
        total: -3856015,
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
            amount: -58853,
            unit: "kgCO2/Jahr nicht emittiert",
            benefit_per_year: -11594,
            gross_value: 0,
            indirect: -102885,
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
            benefit_per_year: -373181,
            gross_value: 0,
            indirect: -3311595,
            timeframe: 10,
          },
          {
            function: "Reduzierung des städtischen Wärmeinseleffekts",
            tool: "Reduzierte Krankenhauskosten durch hitzebedingte Morbidität",
            amount: -9,
            unit: "Patiententage pro Jahr",
            benefit_per_year: -31868,
            gross_value: 0,
            indirect: -282795,
            timeframe: 10,
          },
          {
            function: "Kohlenstoffspeicherung und -bindung",
            tool: "Bäume binden Kohlenstoff",
            amount: -378,
            unit: "kg CO2e gebunden",
            benefit_per_year: -1489,
            gross_value: 0,
            indirect: -13210,
            timeframe: 10,
          },
        ],
      },
      {
        group: "Water Management & Flood Alleviation",
        colour: "#084887",
        total: -76326,
        rows: [
          {
            function: "Abfangen, Speichern und Versickern von Regenwasser",
            tool: "Energie- und CO2-Einsparungen durch geringere Regenwassermengen in der Mischkanalisation",
            amount: -36195993,
            unit: "L/Jahr aus der Kanalisation abgeleitetes Wasser",
            benefit_per_year: 0,
            gross_value: 0,
            indirect: 0,
            timeframe: 10,
          },
          {
            function: "Abfangen, Speichern und Versickern von Regenwasser",
            tool: "Energie- und CO2-Einsparungen durch geringere Regenwassermengen in der Mischkanalisation",
            amount: -32033.45,
            unit: "Eingesparte Energie in kWh/Jahr",
            benefit_per_year: -6362,
            gross_value: -54761,
            indirect: 0,
            timeframe: 10,
          },
          {
            function: "Abfangen, Speichern und Versickern von Regenwasser",
            tool: "Reduzierte CO2-Emissionen",
            amount: -12.72,
            unit: "Eingesparte tCO2e/Jahr",
            benefit_per_year: -2505,
            gross_value: 0,
            indirect: -21565,
            timeframe: 10,
          },
        ],
      },
      {
        group: "Gesundheit & Wohlbefinden",
        colour: "#A3BDEC",
        total: -227235,
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
            amount: -300,
            unit: "Anzahl der Patienten",
            benefit_per_year: -108600,
            gross_value: 0,
            indirect: -190114,
            timeframe: 10,
          },
          {
            function: "Beseitigung der Luftverschmutzung",
            tool: "Reduzierte Luftverschmutzung",
            amount: -0.007,
            unit: "t/yr of NO2 removed",
            benefit_per_year: -4183,
            gross_value: -37121,
            indirect: 0,
            timeframe: 10,
          },
          {
            function: "Beseitigung der Luftverschmutzung",
            tool: "Reduzierte Luftverschmutzung",
            amount: -0.017,
            unit: "t/Jahr O3 entfernt",
            benefit_per_year: -4183,
            gross_value: -37121,
            indirect: 0,
            timeframe: 10,
          },
          {
            function: "Beseitigung der Luftverschmutzung",
            tool: "Reduzierte Luftverschmutzung",
            amount: -0.001,
            unit: "t/Jahr of SO2 entfernt",
            benefit_per_year: -4183,
            gross_value: -37121,
            indirect: 0,
            timeframe: 10,
          },
          {
            function: "Beseitigung der Luftverschmutzung",
            tool: "Reduzierte Luftverschmutzung",
            amount: -0.039,
            unit: "t/Jahr of SO2 entfernt",
            benefit_per_year: -4183,
            gross_value: -37121,
            indirect: 0,
            timeframe: 10,
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
                  loc: 11594,
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
                  loc: 373181,
                },
                {
                  name: "Reduzierte Krankenhauskosten durch hitzebedingte Morbidität",
                  color: "hsl(208, 70%, 50%)",
                  loc: 31868,
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
                  loc: 6362,
                },
                {
                  name: "Energie- und CO2-Einsparungen durch geringere Regenwassermengen in der Mischkanalisation",
                  color: "hsl(349, 70%, 50%)",
                  loc: 2505,
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
                  loc: 108600,
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
        value: -28591,
      },
      {
        benefit: "Reduzierung des städtischen Wärmeinseleffekts",
        value: -405049,
      },
      {
        benefit: "Kohlenstoffspeicherung und -bindung",
        value: -1489,
      },
      {
        benefit: "Auffangen, Speichern und Versickern von Regenwasser",
        value: -8867,
      },
      {
        benefit: "Bereitstellung attraktiver Bewegungsmöglichkeiten",
        value: 0,
      },
      {
        benefit: "Linderung von Stress und psychischen Erkrankungen",
        value: -108600,
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
  {
    id: 3,
    title: "Szenario C - Alternative",
    description:
      "Eine neue Trasse wird auf Grundlage anderer, in den Bauantragsunterlagen aufgeführter Verlängerungsoptionen geprüft. Alle Bäume gelten als gefährdet, gefällt zu werden, wenn ein 1,5 m breiter Puffer von ihrer Krone in den Baubereich hineinragt.",
    trees: -45,
    canopy_cover: 0.242,
    total_benefit: -249555,
    map: "alternative_canopy_loss.geojson",
    tram: "alternative_tram_route.geojson",
    benefits: [
      {
        group: "Anpassung an den Klimawandel und Abschwächung seiner Folgen",
        colour: "#06E29E",
        total: -221325,
        rows: [
          {
            function: "Schutz vor Wind",
            tool: "Reduzierter Energieverbrauch des Gebäudes für die Heizung",
            amount: -184000,
            unit: "Eingesparte Energie in kWh/Jahr",
            benefit_per_year: -896,
            gross_value: -7712,
            indirect: 0,
            timeframe: 10,
          },
          {
            function: "Schutz vor Wind",
            tool: "Vermeidung von CO2-Emissionen durch Gebäudeenergieeinsparung beim Heizen",
            amount: -58853,
            unit: "kgCO2/Jahr nicht emittiert",
            benefit_per_year: -640,
            gross_value: 0,
            indirect: -5679,
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
            benefit_per_year: -21348,
            gross_value: 0,
            indirect: -189440,
            timeframe: 10,
          },
          {
            function: "Reduzierung des städtischen Wärmeinseleffekts",
            tool: "Reduzierte Krankenhauskosten durch hitzebedingte Morbidität",
            amount: -9,
            unit: "Patiententage pro Jahr",
            benefit_per_year: -1823,
            gross_value: 0,
            indirect: -16177,
            timeframe: 10,
          },
          {
            function: "Kohlenstoffspeicherung und -bindung",
            tool: "Bäume binden Kohlenstoff",
            amount: -378,
            unit: "kg CO2e gebunden",
            benefit_per_year: -753,
            gross_value: 0,
            indirect: -6680,
            timeframe: 10,
          },
        ],
      },
      {
        group: "Wassermanagement und Hochwasserschutz",
        colour: "#084887",
        total: -17277,
        rows: [
          {
            function: "Abfangen, Speichern und Versickern von Regenwasser",
            tool: "Energie- und CO2-Einsparungen durch geringere Regenwassermengen in der Mischkanalisation",
            amount: -36195993,
            unit: "L/Jahr aus der Kanalisation abgeleitetes Wasser",
            benefit_per_year: 0,
            gross_value: 0,
            indirect: 0,
            timeframe: 10,
          },
          {
            function: "Abfangen, Speichern und Versickern von Regenwasser",
            tool: "Energie- und CO2-Einsparungen durch geringere Regenwassermengen in der Mischkanalisation",
            amount: -32033.45,
            unit: "Eingesparte Energie in kWh/Jahr",
            benefit_per_year: -1440,
            gross_value: -12396,
            indirect: 0,
            timeframe: 10,
          },
          {
            function: "Abfangen, Speichern und Versickern von Regenwasser",
            tool: "Reduzierte CO2-Emissionen",
            amount: -12.72,
            unit: "Eingesparte tCO2e/Jahr",
            benefit_per_year: -567,
            gross_value: 0,
            indirect: -4881,
            timeframe: 10,
          },
        ],
      },
      {
        group: "Gesundheit & Wohlbefinden",
        colour: "#A3BDEC",
        total: -35027,
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
            amount: -300,
            unit: "Anzahl der Patienten",
            benefit_per_year: -45,
            gross_value: 0,
            indirect: -79,
            timeframe: 10,
          },
          {
            function: "Beseitigung der Luftverschmutzung",
            tool: "Reduzierte Luftverschmutzung",
            amount: -0.007,
            unit: "t/yr of NO2 removed",
            benefit_per_year: -734,
            gross_value: -6510,
            indirect: 0,
            timeframe: 10,
          },
          {
            function: "Beseitigung der Luftverschmutzung",
            tool: "Reduzierte Luftverschmutzung",
            amount: -0.017,
            unit: "t/Jahr O3 entfernt",
            benefit_per_year: -734,
            gross_value: -6510,
            indirect: 0,
            timeframe: 10,
          },
          {
            function: "Beseitigung der Luftverschmutzung",
            tool: "Reduzierte Luftverschmutzung",
            amount: -0.001,
            unit: "t/Jahr of SO2 entfernt",
            benefit_per_year: -734,
            gross_value: -6510,
            indirect: 0,
            timeframe: 10,
          },
          {
            function: "Beseitigung der Luftverschmutzung",
            tool: "Reduzierte Luftverschmutzung",
            amount: -0.039,
            unit: "t/Jahr of SO2 entfernt",
            benefit_per_year: -734,
            gross_value: -6510,
            indirect: 0,
            timeframe: 10,
          },
        ],
      },
    ],
    chartData: {
      name: "scenario_d",
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
                  loc: 896,
                },
                {
                  name: "Vermeidung von CO2-Emissionen durch Gebäudeenergieeinsparungen beim Heizen",
                  color: "hsl(208, 70%, 50%)",
                  loc: 640,
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
                  loc: 21348,
                },
                {
                  name: "Reduzierte Krankenhauskosten durch hitzebedingte Morbidität",
                  color: "hsl(208, 70%, 50%)",
                  loc: 1823,
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
                  loc: 753,
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
                  loc: 1440,
                },
                {
                  name: "Energie- und CO2-Einsparungen durch geringere Regenwassermengen in der Mischkanalisation",
                  color: "hsl(349, 70%, 50%)",
                  loc: 567,
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
                  loc: 45,
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
                  loc: 734,
                },
                {
                  name: "Reduzierte Luftverschmutzung - O3",
                  color: "hsl(260, 70%, 50%)",
                  loc: 734,
                },
                {
                  name: "Reduzierte Luftverschmutzung - SO2",
                  color: "hsl(260, 70%, 50%)",
                  loc: 734,
                },
                {
                  name: "Reduzierte Luftverschmutzung - PM2.5",
                  color: "hsl(260, 70%, 50%)",
                  loc: 734,
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
        value: -1536,
      },
      {
        benefit: "Reduzierung des städtischen Wärmeinseleffekts",
        value: -23171,
      },
      {
        benefit: "Kohlenstoffspeicherung und -bindung",
        value: -753,
      },
      {
        benefit: "Auffangen, Speichern und Versickern von Regenwasser",
        value: -2007,
      },
      {
        benefit: "Bereitstellung attraktiver Bewegungsmöglichkeiten",
        value: 0,
      },
      {
        benefit: "Linderung von Stress und psychischen Erkrankungen",
        value: -45,
      },
      {
        benefit: "Beseitigung der Luftverschmutzung",
        value: -734 * 4,
      },
    ],
  },
];

const tempData = [
  {
    scenario: "Scenario C:  Alternative",
    "Interception, storage and infiltration of rainwater": -2007,
    "Shelter from wind": -1536,
    "Reduced Urban heat island effect": -23171,
    "Carbon Storage and Sequestration": -753,
    "Provision of opportunities for exercise": 0,
    "Stress and mental illness alleviation": -45,
    "Air Pollution Removal": -734,
  },
  {
    scenario: "Scenario B: Realistic",
    "Interception, storage and infiltration of rainwater": -8867,
    "Shelter from wind": -28501,
    "Reduced Urban heat island effect": -405049,
    "Carbon Storage and Sequestration": -1489,
    "Provision of opportunities for exercise": 0,
    "Stress and mental illness alleviation": -108600,
    "Air Pollution Removal": -4183,
  },
  {
    scenario: "Scenario A: Optimistic",
    "Interception, storage and infiltration of rainwater": -1700,
    "Shelter from wind": -12060,
    "Reduced Urban heat island effect": -93631,
    "Carbon Storage and Sequestration": -344,
    "Provision of opportunities for exercise": 0,
    "Stress and mental illness alleviation": -41630,
    "Air Pollution Removal": -967,
  },
  {
    scenario: "Baseline",
    "Interception, storage and infiltration of rainwater": 38125,
    "Shelter from wind": 103965,
    "Reduced Urban heat island effect": 751983,
    "Carbon Storage and Sequestration": 2764,
    "Provision of opportunities for exercise": 286158,
    "Stress and mental illness alleviation": 120546,
    "Air Pollution Removal": 8980,
  },
];

const tempData_de = [
  {
    scenario: "Szenario C: Alternative",
    "Auffangen, Speichern und Versickern von Regenwasser": -2007,
    "Schutz vor Wind": -1536,
    "Reduzierter städtischer Wärmeinseleffekt": -23171,
    "Kohlenstoffspeicherung und -bindung": -753,
    "Bereitstellung von Bewegungsmöglichkeiten": 0,
    "Linderung von Stress und psychischen Erkrankungen": -45,
    "Beseitigung der Luftverschmutzung": -734,
  },
  {
    scenario: "Szenario B: Realistisch",
    "Auffangen, Speichern und Versickern von Regenwasser": -8867,
    "Schutz vor Wind": -28501,
    "Reduzierter städtischer Wärmeinseleffekt": -405049,
    "Kohlenstoffspeicherung und -bindung": -1489,
    "Bereitstellung von Bewegungsmöglichkeiten": 0,
    "Linderung von Stress und psychischen Erkrankungen": -108600,
    "Beseitigung der Luftverschmutzung": -4183,
  },
  {
    scenario: "Szenario A: Optimistisch",
    "Auffangen, Speichern und Versickern von Regenwasser": -1700,
    "Schutz vor Wind": -12060,
    "Reduzierter städtischer Wärmeinseleffekt": -93631,
    "Kohlenstoffspeicherung und -bindung": -344,
    "Bereitstellung von Bewegungsmöglichkeiten": 0,
    "Linderung von Stress und psychischen Erkrankungen": -41630,
    "Beseitigung der Luftverschmutzung": -967,
  },
  {
    scenario: "Ausgangslage",
    "Auffangen, Speichern und Versickern von Regenwasser": 38125,
    "Schutz vor Wind": 103965,
    "Reduzierter städtischer Wärmeinseleffekt": 751983,
    "Kohlenstoffspeicherung und -bindung": 2764,
    "Bereitstellung von Bewegungsmöglichkeiten": 286158,
    "Linderung von Stress und psychischen Erkrankungen": 120546,
    "Beseitigung der Luftverschmutzung": 8980,
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

const allFillLayer = {
  id: "scenario-layer",
  type: "fill",
  paint: {
    "fill-color": [
      "match",
      ["get", "scenario"],
      "A",
      "#413075", // Color for scenario A
      "B",
      "#000", // Color for scenario B
      "C",
      "#FFAAAA", // Color for scenario C
      "#000", // Default fallback color
    ],
    "fill-opacity": 0.6,
  },
};

const altFillLayer = {
  id: "alt-layer",
  type: "fill",
  paint: {
    "fill-color": [
      "match",
      ["get", "scenario"],
      "A",
      "#06E29E", // Color for scenario A
      "B",
      "#084887", // Color for scenario B
      "C",
      "#A3BDEC", // Color for scenario C
      "#AA9739", // Default fallback color
    ],
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

const tramLayer = {
  id: "Bus Route",
  type: "line",
  source: "Bus Route",
  paint: {
    "line-color": "#FF0000",
    "line-width": 4,
    "line-opacity": 0.3,
  },
  layout: {
    "line-join": "round",
    "line-cap": "round",
  },
};

// TODO: calculate dynamically
const total_valuation_chart = [
  {
    scenario: "Scenario A Baseline",
    value: 10510563,
  },
  {
    scenario: "Scenario B Optimistic",
    value: -1035145,
  },
  {
    scenario: "Scenario C Realistic",
    value: -4159576,
  },
  {
    scenario: "Scenario D Alternative",
    value: -249555,
  },
];

const total_valuation_chart_de = [
  {
    scenario: "Szenario A: Ausgangslage",
    value: 10510563,
  },
  {
    scenario: "Szenario B: Optimistisch",
    value: -1035145,
  },
  {
    scenario: "Szenario C: Realistisch",
    value: -4159576,
  },
  {
    scenario: "Szenario D: Alternative",
    value: -249555,
  },
];

let euro = new Intl.NumberFormat();

function App() {
  const { t, i18n } = useTranslation();

  const [dataLang, setDataLang] = useState(data_de);
  const [selectedScenario, setSelectedScenario] = useState(data_de[0]);
  const [mapData, setMapData] = useState(null);
  const [mapDataAll, setMapDataAll] = useState(null);
  const [altAllMap, setAltAllMap] = useState(null);
  const [tramData, setTramData] = useState(null);

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

    fetch(
      "https://raw.githubusercontent.com/Dark-Matter-Labs/ev-dashboard/refs/heads/main/src/data/alternative_baseline_canopy.geojson",
    )
      .then((resp) => resp.json())
      .then((json) => setAltAllMap(json))
      .catch((err) => console.error("Could not load data", err));
  }, []);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/Dark-Matter-Labs/ev-dashboard/refs/heads/main/src/data/" +
        selectedScenario.tram,
    )
      .then((resp) => resp.json())
      .then((json) => setTramData(json))
      .catch((err) => console.error("Could not load data", err));
  }, [selectedScenario]);

  const handleSelectChange = (event) => {
    const selectedId = Number(event.target.value);
    const scenario = dataLang.find((item) => item.id === selectedId);
    setSelectedScenario(scenario);
  };

  return (
    <>
      <NavBar />
      <div className="global-margin bg-gray-100">
        <div className=" bg-white shadow-lg rounded-lg p-6 space-y-6">
          <h1 className=" text-gray-800">{t("title")}</h1>
          <p className="text-gray-800 book-intro-sm max-w-4xl">
            {t("intro_text")}
          </p>
          <Element name="comp">
            <div className="py-10">
              <h3 className="text-gray-800 pb-8">{t("scenario_comp_title")}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <table className="min-w-full bg-white border book-info-md sm:table-fixed">
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
                    <Layer {...allFillLayer} />
                  </Source>
                  <Source type="geojson" data={altAllMap}>
                    <Layer {...altFillLayer} />
                  </Source>
                </Map>

                <div className="w-full h-[60vh]">
                  {i18n.language === "en" ? (
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
                      axisLeft={{
                        tickSize: 0,
                        tickPadding: 0,
                        tickRotation: 0,
                        legend: "Total Valuation",
                        legendPosition: "middle",
                        legendOffset: -80,
                        truncateTickAt: 0,
                        format: (value) =>
                          `${Number(value).toLocaleString("de", {
                            minimumFractionDigits: 0,
                          })} €`,
                      }}
                    />
                  ) : (
                    <ResponsiveBar
                      data={total_valuation_chart_de}
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
                      axisLeft={{
                        tickSize: 0,
                        tickPadding: 0,
                        tickRotation: 0,
                        legend: "Gesamtbewertung",
                        legendPosition: "middle",
                        legendOffset: -80,
                        truncateTickAt: 0,
                        format: (value) =>
                          `${Number(value).toLocaleString("de", {
                            minimumFractionDigits: 0,
                          })} €`,
                      }}
                    />
                  )}
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
                      <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-800">
                        {t("scenario_d")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-6 py-4 border-b text-sm text-gray-600">
                        {t("total")}
                      </td>
                      <td className="px-6 py-4 border-b text-sm text-gray-600">
                        €10.51M
                      </td>

                      <td className="px-6 py-4 border-b text-sm text-gray-600">
                        -€1.03M
                      </td>

                      <td className="px-6 py-4 border-b text-sm text-gray-600">
                        -€4.15M
                      </td>

                      <td className="px-6 py-4 border-b text-sm text-gray-600">
                        -€0.24M
                      </td>
                    </tr>

                    <tr>
                      <td className="px-6 py-4 border-b text-sm text-gray-600">
                        {t("climate_reg")}
                      </td>
                      <td className="px-6 py-4 border-b text-sm text-gray-600">
                        €7.6M
                      </td>

                      <td className="px-6 py-4 border-b text-sm text-gray-600">
                        -€0.93M
                      </td>

                      <td className="px-6 py-4 border-b text-sm text-gray-600">
                        -3.85M
                      </td>

                      <td className="px-6 py-4 border-b text-sm text-gray-600">
                        -€0.22M
                      </td>
                    </tr>

                    <tr>
                      <td className="px-6 py-4 border-b text-sm text-gray-600">
                        {t("water_mgmt")}
                      </td>
                      <td className="px-6 py-4 border-b text-sm text-gray-600">
                        €0.16M
                      </td>

                      <td className="px-6 py-4 border-b text-sm text-gray-600">
                        -€0.14M
                      </td>

                      <td className="px-6 py-4 border-b text-sm text-gray-600">
                        -€0.07M
                      </td>

                      <td className="px-6 py-4 border-b text-sm text-gray-600">
                        -€0.01M
                      </td>
                    </tr>

                    <tr>
                      <td className="px-6 py-4 border-b text-sm text-gray-600">
                        {t("health")}
                      </td>
                      <td className="px-6 py-4 border-b text-sm text-gray-600">
                        €2.73M
                      </td>

                      <td className="px-6 py-4 border-b text-sm text-gray-600">
                        -€0.08M
                      </td>

                      <td className="px-6 py-4 border-b text-sm text-gray-600">
                        -€0.02M
                      </td>

                      <td className="px-6 py-4 border-b text-sm text-gray-600">
                        -€0.006M
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="w-full h-[60vh]">
                {i18n.language === "en" ? (
                  <ResponsiveBar
                    data={tempData}
                    keys={[
                      "Interception, storage and infiltration of rainwater",
                      "Shelter from wind",
                      "Reduced Urban heat island effect",
                      "Carbon Storage and Sequestration",
                      "Provision of opportunities for exercise",
                      "Stress and mental illness alleviation",
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
                      format: (value) =>
                        `${Number(value).toLocaleString("de", {
                          minimumFractionDigits: 0,
                        })} €`,
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
                        anchor: "bottom",
                        direction: "column",
                        justify: false,
                        translateX: 400,
                        translateY: -20,
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
                      e.id +
                      ": " +
                      e.formattedValue +
                      " in country: " +
                      e.indexValue
                    }
                  />
                ) : (
                  <ResponsiveBar
                    data={tempData_de}
                    keys={[
                      "Auffangen, Speichern und Versickern von Regenwasser",
                      "Schutz vor Wind",
                      "Reduzierter städtischer Wärmeinseleffekt",
                      "Kohlenstoffspeicherung und -bindung",
                      "Bereitstellung von Bewegungsmöglichkeiten",
                      "Linderung von Stress und psychischen Erkrankungen",
                      "Beseitigung der Luftverschmutzung",
                    ]}
                    indexBy="scenario"
                    margin={{ top: 50, right: 130, bottom: 50, left: 180 }}
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
                      legend: "€ pro Jahr",
                      legendPosition: "middle",
                      legendOffset: 32,
                      truncateTickAt: 0,
                      format: (value) =>
                        `${Number(value).toLocaleString("de", {
                          minimumFractionDigits: 0,
                        })} €`,
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
                        anchor: "bottom",
                        direction: "column",
                        justify: false,
                        translateX: 400,
                        translateY: -20,
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
                      e.id +
                      ": " +
                      e.formattedValue +
                      " in country: " +
                      e.indexValue
                    }
                  />
                )}
              </div>
            </div>
          </Element>
          <Element name="analysis">
            <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 py-4">
              <div className=" w-full md:w-1/3">
                <div className="">
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
                </div>
                <div className="w-full mt-4 p-4 bg-gray-50 border rounded-lg ">
                  <h2 className="medium-info-sm text-gray-600">
                    {t("description")}
                  </h2>
                  <p className="book-intro-sm">
                    {selectedScenario.description}
                  </p>
                </div>
              </div>

              <div className="flex flex-col w-full md:w-2/3 space-y-4 md:space-y-0 md:flex-row md:space-x-4">
                <div className="w-full md:w-1/2 p-4 bg-gray-50 border rounded-lg">
                  <h2 className="medium-info-sm text-gray-600">
                    {t("location")}
                  </h2>
                  <p className="text-gray-800 book-intro-sm">{t("berlin")}</p>
                  <h2 className="medium-info-sm text-gray-600 pt-6">
                    {t("area")}
                  </h2>
                  <p className="text-gray-800 book-intro-sm">16.83 Ha</p>

                  <h2 className="medium-info-sm text-gray-600 pt-6">
                    {t("timeframe")}
                  </h2>
                  <p className="text-gray-800 book-intro-sm">10 {t("years")}</p>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                {selectedScenario.id === 0 && (
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
                )}
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

                  <Source type="geojson" data={tramData}>
                    <Layer {...tramLayer} />
                  </Source>
                </Map>
              </div>
            </div>

            <div className="sticky top-20 z-50">
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
            </div>
            <div className="overflow-x-scroll sm:overflow-x-auto pt-4">
              <table className="sm:min-w-full bg-white border book-info-md sm:table-fixed">
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
                  </tr>
                </thead>
                <tbody>
                  {selectedScenario.benefits.map((benefit, benefitIndex) =>
                    benefit.rows.map((row, rowIndex) => (
                      <tr key={`${benefitIndex}-${rowIndex}`}>
                        {rowIndex === 0 && (
                          <td
                            style={{
                              background: benefit.colour,
                              color: "white",
                            }}
                            rowSpan={benefit.rows.length}
                          >
                            {benefit.group}
                          </td>
                        )}

                        {rowIndex === 0 && (
                          <td rowSpan={benefit.rows.length}>
                            {euro.format(benefit.total)}
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
                    modifiers: [["brighter", 30]],
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
                  axisLeft={{
                    tickSize: 0,
                    tickPadding: 0,
                    tickRotation: 0,
                    legend: "Total",
                    legendPosition: "middle",
                    legendOffset: -70,
                    truncateTickAt: 0,
                    format: (value) =>
                      `${Number(value).toLocaleString("de", {
                        minimumFractionDigits: 0,
                      })} €`,
                  }}
                />
              </div>
            </div>
          </Element>
        </div>
        <div className="py-10 px-4">
          <p className="medium-intro-sm">Supported by:</p>
          <img src={TNClogo} alt="TNC logo" />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
