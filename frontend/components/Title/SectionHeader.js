import React from 'react';
import {Button, Text, View, StyleSheet} from 'react-native';
import {SIZES, spacing} from '../../constants/theme';
import {COLORS} from '../../constants/theme';
import ReusableText from '../Reusable/ReusableText';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';
const SectionHeader = ({title, onPress, buttonTitle = 'Button'}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Pressable onPress={() => navigation.navigate("")}>
              <ReusableText
                text={"See all"}
                family={"bold"}
                size={SIZES.medium}
                color={COLORS.red}
              />
            </Pressable>
      {/* <Button title={buttonTitle} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: spacing.l,
    marginRight: spacing.m,
    marginTop: spacing.l,
    marginBottom: 10,
  },
  title: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
  },
});

export default SectionHeader;