import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native';
import { ChildrenContext, ChildData } from '../contexts';
import { Button, Input, Text } from '../components';
import { getStory } from '../utils/openai';

export enum StoryOptions {
  'SleepStory' = 'Cuento para dormir',
  'ConceptStory' = 'Cuento para explicar un concepto',
  'AnxietyStory' = 'Cuento para ayudar con la ansiedad',
}

const LOADING_TEXT = 'Estamos creando una linda historia...';

const Home: React.FC = () => {
  const childrenContext = useContext(ChildrenContext);
  const [selectedChild, setSelectedChild] = useState<ChildData | null>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [concept, setConcept] = useState<string>('');
  const [modalVisible, setModalVisible] = useState(false);
  const [story, setStory] = useState<string>('');

  const handleShowOptions = (child: ChildData) => {
    setSelectedChild(child);
    setShowOptions(true);
  };

  const handleStoryOption = async (option: StoryOptions) => {
    setShowInput(false);
    switch (option) {
      case StoryOptions.SleepStory:
        setStory(LOADING_TEXT);
        setModalVisible(true);
        const sleepStory = await getStory(selectedChild?.age || 0, option);
        setStory(sleepStory as string);
        break;
      case StoryOptions.ConceptStory:
        setStory(LOADING_TEXT);
        setModalVisible(true);
        const conceptStory = await getStory(
          selectedChild?.age || 0,
          option,
          concept,
        );
        setStory(conceptStory as string);
        break;
      case StoryOptions.AnxietyStory:
        setStory(LOADING_TEXT);
        setModalVisible(true);
        const anxietyStory = await getStory(selectedChild?.age || 0, option);
        setStory(anxietyStory as string);
        break;
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setStory('');
  };

  useEffect(() => {
    if (selectedChild) {
      setShowOptions(true);
    } else {
      setShowOptions(false);
    }
  }, [selectedChild]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView>
        <View style={styles.container}>
          <Text variant="title">Selecciona un cuento</Text>
          <Text style={styles.description}>
            Creémos un cuento para tus hijos
          </Text>
          <Text variant="subtitle" style={styles.sectionTitle}>
            Hijos
          </Text>
        </View>
        {childrenContext?.children?.map((child, index) => (
          <View key={index} style={styles.section}>
            <Text variant="subtitle">Nombre: {child.name}</Text>
            <Text variant="subtitle">Edad: {child.age}</Text>
            <Button
              style={styles.buttonContainer}
              title="Mostar opciones de cuentos"
              onPress={() => handleShowOptions(child)}
            />
          </View>
        ))}
        {showOptions && selectedChild && (
          <View style={styles.container}>
            <Text variant="subtitle" style={styles.sectionTitle}>
              Opciones para - {selectedChild.name}
            </Text>
            <Button
              style={styles.buttonContainer}
              title={StoryOptions.SleepStory}
              onPress={() => handleStoryOption(StoryOptions.SleepStory)}
            />
            <Button
              style={styles.buttonContainer}
              title={StoryOptions.ConceptStory}
              onPress={() => setShowInput(true)}
            />
            <Button
              style={styles.buttonContainer}
              title={StoryOptions.AnxietyStory}
              onPress={() => handleStoryOption(StoryOptions.AnxietyStory)}
            />
          </View>
        )}
        {showInput && (
          <View style={styles.container}>
            <Input
              label="Concepto"
              onChangeText={(text) => setConcept(text)}
              value={concept}
              style={styles.input}
            />
            <Button
              style={styles.buttonContainer}
              title="Crear Cuento"
              onPress={() => handleStoryOption(StoryOptions.ConceptStory)}
            />
          </View>
        )}
      </ScrollView>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <ScrollView style={styles.modalView}>
            <Text style={styles.modalText}>{story}</Text>
            <Button
              title="Cerrar"
              onPress={handleCloseModal}
              style={styles.buttonModal}
            />
          </ScrollView>
        </View>
      </Modal>
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
  section: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginTop: 12,
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 8,
  },
  input: {
    marginTop: 12,
  },
  buttonModal: {
    marginTop: 8,
    marginBottom: 50,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default Home;
