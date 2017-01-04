const round = (number, decimalPlaces = 0) => {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(number * factor) / factor;
};

const Ctrl = {
  bootstrap() {
    const view = View();

    const computeTotalFlourAndWater = () => {
      const hydrationPercentage = view.getValue('dough_hydration_percentage') / 100;
      const totalFlourWeight = round(view.getValue('total_dough_weight') / (1 + hydrationPercentage));
      const totalWaterWeight = round(view.getValue('total_dough_weight') - totalFlourWeight);
      view.setResult('total_flour_weight', totalFlourWeight);
      view.setResult('total_water_weight', totalWaterWeight);
    };

    const computePoolish = () => {
      const poolishFlourWeight = round(view.getResult('total_flour_weight') * view.getValue('poolish_percentage') / 100);
      const poolishWaterWeight = round(poolishFlourWeight * view.getValue('poolish_hydration_percentage') / 100);
      const poolishYeastWeight = round(poolishFlourWeight * view.getValue('poolish_yeast_percentage') / 300, 2);
      view.setResult('poolish_flour_weight', poolishFlourWeight);
      view.setResult('poolish_water_weight', poolishWaterWeight);
      view.setResult('poolish_yeast_weight', poolishYeastWeight);
    };

    const computeRest = () => {
      const totalFlourWeight = view.getResult('total_flour_weight');
      const restFlourWeight = totalFlourWeight - view.getResult('poolish_flour_weight');
      const restWaterWeight = view.getResult('total_water_weight') - view.getResult('poolish_water_weight');
      const restYeastWeight = round(totalFlourWeight * view.getValue('rest_yeast_percentage') / 300, 2);
      const saltWeight = round(totalFlourWeight * view.getValue('salt_percentage') / 100);
      view.setResult('rest_flour_weight', restFlourWeight);
      view.setResult('rest_water_weight', restWaterWeight);
      view.setResult('rest_yeast_weight', restYeastWeight);
      view.setResult('salt_weight', saltWeight);
    };

    const computeYeastTypes = () => {
      const totalWeight = view.getResult('total_flour_weight');
      [1, 2, 3, 4].forEach(typeNumber => view.setResult(
          `flour_type_${typeNumber}_total`,
          round(totalWeight * view.getValue(`flour_type_${typeNumber}_percentage`) / 100)
      ));
    };

    const computeAll = () => {
      computeTotalFlourAndWater();
      computePoolish();
      computeRest();
      computeYeastTypes();
    };

    computeAll();

    view.getValues().forEach(value => value.onChange(computeAll));

    return {};
  }
};