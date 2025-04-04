import { useMemo } from "react";
import PropTypes from "prop-types";

const GroupedTable = ({ selectedScenario, t, euro }) => {
  // Process data to identify groups
  const processedBenefits = useMemo(() => {
    return selectedScenario.benefits.map((benefit) => {
      // Group rows by function
      const functionGroups = [];
      let currentGroup = null;

      benefit.rows.forEach((row, index) => {
        if (!currentGroup || currentGroup.function !== row.function) {
          // Start a new group
          currentGroup = {
            function: row.function,
            rows: [row],
            startIndex: index,
          };
          functionGroups.push(currentGroup);
        } else {
          // Add to existing group
          currentGroup.rows.push(row);
        }
      });

      // Group rows by benefit/tool
      const benefitGroups = [];
      let currentBenefitGroup = null;

      benefit.rows.forEach((row, index) => {
        if (!currentBenefitGroup || currentBenefitGroup.tool !== row.tool) {
          // Start a new group
          currentBenefitGroup = {
            tool: row.tool,
            rows: [row],
            startIndex: index,
          };
          benefitGroups.push(currentBenefitGroup);
        } else {
          // Add to existing group
          currentBenefitGroup.rows.push(row);
        }
      });

      return {
        ...benefit,
        functionGroups,
        benefitGroups,
      };
    });
  }, [selectedScenario.benefits]);

  return (
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
        {processedBenefits.map((benefit, benefitIndex) =>
          benefit.rows.map((row, rowIndex) => {
            // Find function group for this row
            const functionGroup = benefit.functionGroups.find((group) =>
              group.rows.includes(row),
            );
            const isFirstInFunctionGroup = functionGroup.rows[0] === row;
            const functionGroupRowSpan = functionGroup.rows.length;

            // Find benefit/tool group for this row
            const benefitGroup = benefit.benefitGroups.find((group) =>
              group.rows.includes(row),
            );
            const isFirstInBenefitGroup = benefitGroup.rows[0] === row;
            const benefitGroupRowSpan = benefitGroup.rows.length;

            return (
              <tr key={`${benefitIndex}-${rowIndex}`}>
                {rowIndex === 0 && (
                  <td
                    style={{
                      background: benefit.colour,
                      color: "white",
                    }}
                    rowSpan={benefit.rows.length}
                    className="px-6 py-4 text-sm font-medium"
                  >
                    {benefit.group}
                  </td>
                )}

                {rowIndex === 0 && (
                  <td
                    rowSpan={benefit.rows.length}
                    className="px-6 py-4 text-sm text-gray-600"
                  >
                    {euro.format(benefit.total)}
                  </td>
                )}

                {isFirstInFunctionGroup ? (
                  <td
                    className="px-6 py-4 border-b text-sm text-gray-600 relative"
                    rowSpan={functionGroupRowSpan}
                  >
                    {row.function}
                    {functionGroupRowSpan > 1 && (
                      <div className="absolute inset-0 flex items-center justify-center bg-opacity-20 font-medium italic text-gray-500 pointer-events-none">
                        {functionGroupRowSpan > 2}
                      </div>
                    )}
                  </td>
                ) : null}

                {isFirstInBenefitGroup ? (
                  <td
                    className="px-6 py-4 border-b text-sm text-gray-600 relative "
                    rowSpan={benefitGroupRowSpan}
                  >
                    {row.tool}
                    {benefitGroupRowSpan > 1 && (
                      <div className="absolute inset-0 flex items-center justify-center bg-opacity-20 font-medium italic text-gray-500 pointer-events-none">
                        {benefitGroupRowSpan > 2}
                      </div>
                    )}
                  </td>
                ) : null}

                <td className="px-6 py-4 border-b text-sm text-gray-600">
                  {row.amount.toLocaleString() + " " + row.unit}
                </td>
                <td className="px-6 py-4 border-b text-sm text-gray-600">
                  {row.benefit_per_year === 0
                    ? "-"
                    : euro.format(row.benefit_per_year)}
                </td>
              </tr>
            );
          }),
        )}
      </tbody>
    </table>
  );
};

export default GroupedTable;

GroupedTable.propTypes = {
  selectedScenario: PropTypes.object,
  t: PropTypes.func.isRequired,
  euro: PropTypes.object.isRequired,
};
