import * as am4core from '@amcharts/amcharts4/core';
import {
  SlicedChart,
  PictorialStackedSeries,
} from '@amcharts/amcharts4/charts';
import { MasterData } from '../data';
import { getNAm4ColorsFromPrimaryPalette } from '../../utils/colors';

const iconPath = 'm346.003 90.996c-24.814 0-45 20.186-45 45v5.728l-30-15v-65.728h-30v65.728l-30.015 15.007v-5.735c0-24.814-20.186-45-45-45-106.699 0-164.77 141.152-165.985 280.576-.328 39.058 26.406 79.424 65.624 79.424 46.304 0 145.361-64.248 145.361-135v-140.72l45.015-22.507 45 22.5v140.728c0 70.752 99.057 135 145.36 135 39.216 0 65.953-40.362 65.625-79.424-1.215-139.425-59.286-280.577-165.985-280.577z';

const getSymptomPictorialData = async () => {
  const masterData = await MasterData.getData();
  const trueKey = 'Có';
  // const dataLength = masterData.filter(
  //   (elm) => elm['Có triệu chứng'] === trueKey,
  // );
  const symptoms = [
    'Sốt',
    'Ho',
    'Rát họng',
    'Sổ mũi',
    'Khó thở/ tức ngực',
    'Mệt, đau mỏi người',
    'Không có triệu chứng',
  ];

  const symptomData = [];
  symptoms.forEach((symptom) => {
    symptomData.push({
      name: symptom,
      value: masterData.filter((elm) => elm[symptom] === trueKey).length,
    });
  });

  return symptomData;
};

export const createSymptomPictorialChart = async (chartName) => {
  const chart = am4core.create(chartName, SlicedChart);
  chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect
  chart.paddingRight = am4core.percent(8);

  chart.data = await getSymptomPictorialData();

  // const title = chart.createChild(am4core.Label);
  // title.text = "Các triệu chứng thường gặp khi mắc COVID-19"
  // title.alignLabels = "right";
  // title.isMeasured = false;
  // title.fontSize = 28;
  // title.fontWeight ='bold';

  const series = chart.series.push(new PictorialStackedSeries());
  series.dataFields.value = 'value';
  series.dataFields.category = 'name';
  series.alignLabels = true;

  series.maskSprite.path = iconPath;
  series.ticks.template.locationX = 0.8;
  series.ticks.template.locationY = 0.6;

  series.labelsContainer.width = 150;
  series.colors.list = getNAm4ColorsFromPrimaryPalette(7);

  // chart.legend = new Legend();
  // chart.legend.position = 'left';
  // chart.legend.valign = 'middle';
  // chart.legend.labels.template.text = '[{color}]{name}[/]';

  return { chart };
};