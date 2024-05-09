import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import { Text, Input, Button } from '../../components';
import { ChildData, useAuth, useChildren } from '../../contexts';
import { dispatch } from '../../utils';
import { StackActions } from '@react-navigation/native';

const ChildrenInfo = () => {
  const [childrenNumber, setChildrenNumber] = useState('');
  const [childrenNumberInt, setChildrenNumberInt] = useState(0);
  const [childrenInfo, setChildrenInfo] = useState<ChildData[]>([]);
  const [disabled, setDisabled] = useState(true);
  const { updateChildren } = useChildren();
  const { login } = useAuth();

  const handlechildrenNumberChange = (text: string) => {
    const numericText = text.replace(/\D/g, '');
    setChildrenNumberInt(parseInt(numericText, 10));
    setChildrenNumber(numericText);
  };

  const handleChildInfoChange = (
    index: number,
    field: string,
    value: string,
  ) => {
    const formattedValue = field === 'age' ? value.replace(/\D/g, '') : value;
    const updatedChildsInfo: ChildData[] = [...childrenInfo];
    updatedChildsInfo[index] = {
      ...updatedChildsInfo[index],
      [field]: formattedValue,
    };
    setChildrenInfo(updatedChildsInfo);
  };

  const handleOnboardingSubmit = () => {
    const isFormValid = childrenInfo.every((child) => {
      return child.name.trim() !== '' && child.age;
    });

    if (isFormValid) {
      updateChildren(childrenInfo);
      setChildrenNumber('');
      setChildrenInfo([]);
      login();
      dispatch(StackActions.replace('Home'));
    }
  };

  useEffect(() => {
    setDisabled(
      !(
        childrenNumber !== '' &&
        childrenNumberInt !== 0 &&
        childrenInfo.length === childrenNumberInt &&
        childrenInfo.every((child) => child.name.trim() !== '' && child.age)
      ),
    );
  }, [childrenInfo, childrenNumber, childrenNumberInt]);

  const renderChildInputs = () => {
    const inputs = [];
    for (let i = 0; i < childrenNumberInt; i++) {
      inputs.push(
        <View key={i} style={styles.childContainer}>
          <Text variant="title">Información del hijo {i + 1}</Text>
          <Input
            label="Nombre"
            value={childrenInfo[i]?.name || ''}
            onChangeText={(text) => handleChildInfoChange(i, 'name', text)}
          />
          <Input
            label="Edad"
            value={(childrenInfo[i]?.age as unknown as string) || ''}
            onChangeText={(text) => handleChildInfoChange(i, 'age', text)}
            numericKeyboard
            maxLength={2}
          />
        </View>,
      );
    }
    return inputs;
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <View style={styles.container}>
            <Text variant="title">Ya casi terminamos</Text>
            <Text style={styles.description}>Cuentanos sobre tus hijos</Text>
          </View>
          <View style={styles.container}>
            <Input
              label="Número de hijos"
              value={childrenNumber.toString()}
              onChangeText={handlechildrenNumberChange}
              numericKeyboard
              maxLength={1}
            />
          </View>
          {renderChildInputs()}
          <View style={styles.buttonContainer}>
            <Button
              title="Enviar"
              onPress={handleOnboardingSubmit}
              disabled={disabled}
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'flex-start',
    height: '100%',
  },
  container: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  description: {
    marginTop: 12,
  },
  childContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
});

export default ChildrenInfo;
