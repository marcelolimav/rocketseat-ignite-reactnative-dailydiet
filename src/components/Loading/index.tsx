import { View, ActivityIndicator } from 'react-native';
import { useTheme} from 'styled-components/native'

export function Loading() {
  const { COLORS } = useTheme();
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.TRANSPARENT,
    }}>
      <ActivityIndicator 
        color={COLORS.GRAY_400}
        size={56}
      />
    </View>
  );
}
