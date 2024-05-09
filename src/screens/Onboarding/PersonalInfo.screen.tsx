import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Text, Input, Button } from '../../components';
import { useUser } from '../../contexts';
import { navigate } from '../../utils';

const PersonalInfo = () => {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [email, setEmail] = useState('');
  const [nombreHelper, setNombreHelper] = useState('');
  const [edadHelper, setEdadHelper] = useState('');
  const [emailHelper, setEmailHelper] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const { updateUser } = useUser();

  const handleNombreChange = (text: string) => {
    setNombre(text);
    setNombreHelper('');
    validateForm();
  };

  const handleEdadChange = (text: string) => {
    const numericText = text.replace(/\D/g, '');
    setEdad(numericText);
    setEdadHelper('');
    if (numericText !== '' && parseInt(numericText, 10) < 18) {
      setEdadHelper('Debes ser mayor de 18 años');
    }
    validateForm();
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setEmailHelper('');
    validateForm();
  };

  const validateForm = () => {
    const isNombreValid = nombre.trim() !== '';
    const isEdadValid =
      edad.trim() !== '' && /^\d+$/.test(edad) && parseInt(edad, 10) >= 18;
    const isEmailValid = email.trim() !== '' && /\S+@\S+\.\S+/.test(email);

    setIsFormValid(isNombreValid && isEdadValid && isEmailValid);
  };

  const handleOnboardingSubmit = () => {
    if (nombre.trim() === '') {
      setNombreHelper('Por favor ingresa tu nombre');
      return;
    }

    if (edad.trim() === '') {
      setEdadHelper('Por favor ingresa tu edad');
      return;
    }

    if (!/^\d+$/.test(edad)) {
      setEdadHelper('Por favor ingresa una edad válida');
      return;
    }

    if (parseInt(edad, 10) < 18) {
      setEdadHelper('Debes ser mayor de 18 años');
      return;
    }

    if (email.trim() === '') {
      setEmailHelper('Por favor ingresa tu email');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailHelper('Por favor ingresa un email válido');
      return;
    }
    updateUser({ name: nombre, age: parseInt(edad, 10), email });
    setNombre('');
    setEdad('');
    setEmail('');
    navigate('ChildrenInfo');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.container}>
          <Text variant="title">Bienvenido</Text>
          <Text style={styles.description}>
            Para iniciar nos gustaría conocerte mejor
          </Text>
        </View>
        <View style={styles.container}>
          <Input
            label="Nombre"
            value={nombre}
            onChangeText={handleNombreChange}
            helperText={nombreHelper}
          />
          <Input
            label="Edad"
            value={edad}
            onChangeText={handleEdadChange}
            numericKeyboard
            helperText={edadHelper}
            maxLength={2}
          />
          <Input
            label="Email"
            value={email}
            emailKeyboard
            onChangeText={handleEmailChange}
            capitalize={false}
            helperText={emailHelper}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Enviar"
            onPress={handleOnboardingSubmit}
            disabled={!isFormValid}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
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
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
});

export default PersonalInfo;
