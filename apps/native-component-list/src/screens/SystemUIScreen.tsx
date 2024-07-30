import SegmentedControl from '@react-native-segmented-control/segmented-control';
import * as SystemUI from 'expo-system-ui';
import * as React from 'react';
import { ColorValue, ScrollView, Switch, Text, View } from 'react-native';

import Button from '../components/Button';
import { Page, Section } from '../components/Page';
import { getRandomColor } from '../utilities/getRandomColor';

export default function SystemUIScreen() {
  return (
    <ScrollView>
      <Page>
        <Section title="Background Color">
          <BackgroundColorExample />
        </Section>
        <Section title="System Bars">
          <SystemBarsExample />
        </Section>
      </Page>
    </ScrollView>
  );
}

SystemUIScreen.navigationOptions = {
  title: 'System UI',
};

function BackgroundColorExample() {
  const [color, setColor] = React.useState<ColorValue | null>(null);

  return (
    <>
      <Button
        onPress={() => SystemUI.setBackgroundColorAsync(getRandomColor())}
        title="Set background color to random color"
      />
      <Button
        onPress={async () => setColor(await SystemUI.getBackgroundColorAsync())}
        title={`Get background color: ${color?.toString()}`}
      />
    </>
  );
}

const STYLES_VALUES: SystemUI.SystemBarStyle[] = ['auto', 'light', 'dark'];

function SystemBarsExample() {
  const [hidden, setHidden] = React.useState(false);
  const [style, setStyle] = React.useState(STYLES_VALUES[0]);

  return (
    <>
      <View
        style={{
          marginTop: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text>Hidden</Text>
        <Switch value={hidden} onValueChange={setHidden} />
      </View>

      <SegmentedControl
        values={STYLES_VALUES}
        selectedIndex={STYLES_VALUES.indexOf(style)}
        onChange={(event) => {
          setStyle(STYLES_VALUES[event.nativeEvent.selectedSegmentIndex]);
        }}
      />

      <SystemUI.SystemBars hidden={hidden} style={style} />
    </>
  );
}
