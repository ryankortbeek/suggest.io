import { StyleSheet } from 'react-native';

const PRIMARY_COLOR = '#1073AA';
export const SECONDARY_COLOR = '#90CAEA';
const TEXT_COLOR = '#FFFFFF';

export const baseStyles = StyleSheet.create({
  basic_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: PRIMARY_COLOR,
  },
  title: {
    fontSize: 36,
    fontFamily: 'System',
    fontWeight: 'bold',
    color: TEXT_COLOR,
  },
  body: {
    fontSize: 22,
    fontFamily: 'System',
    color: TEXT_COLOR,
  },
  main_component: {
    flex: 2,
  },
  header_container: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 100,
    paddingTop: 50,
  },
  scrollable: {
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
  },
  spacing: {
    marginTop: 10,
    marginBottom: 10,
  },
});
