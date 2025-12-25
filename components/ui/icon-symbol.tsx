// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolViewProps, SymbolWeight } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Partial<Record<SymbolViewProps['name'], ComponentProps<typeof MaterialIcons>['name']>>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING: IconMapping = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'moon.fill': 'nightlight-round',
  'bell.fill': 'notifications',
  'creditcard.fill': 'credit-card',
  'square.grid.2x2.fill': 'category',
  'briefcase.fill': 'work',
  'arrow.down.doc.fill': 'file-download',
  'trash.fill': 'delete',
  'arrow.up.right': 'call-made',
  'arrow.down.right': 'call-received',
  'ellipsis.circle': 'more-vert',
  'plus': 'add',
  'chevron.down': 'expand-more',
  'magnifyingglass': 'search',
  'car.fill': 'directions-car',
  'cross.case.fill': 'medical-services',
  'calendar': 'calendar-today',
  'chart.pie.fill': 'pie-chart',
  'chart.line.uptrend.xyaxis': 'show-chart',
  'doc.text.fill': 'article',
  'chevron.left': 'chevron-left',
  'arrow.right.circle.fill': 'logout',
  'list.bullet.rectangle.fill': 'receipt-long',
  'chart.bar.fill': 'bar-chart',
  'gearshape.fill': 'settings',
  'xmark.circle.fill': 'close',
  'person.circle.fill': 'person',
};

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
