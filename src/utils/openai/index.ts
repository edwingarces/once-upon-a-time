import 'react-native-url-polyfill/auto';
import Config from 'react-native-config';
import OpenAI from 'openai';
import { StoryOptions } from '../../screens/Home.screen';

const openai = new OpenAI({
  baseURL: 'https://api.openai.com/v1',
  apiKey: Config.OPENAI_API_KEY,
});
const ConceptStory = 'Cuento para explicar el concepto de ';

export const getStory = async (
  age: number,
  storyType: StoryOptions,
  concept: string | null = null,
) => {
  try {
    const formattedConcept = concept ? `"${concept}"` : '';
    const completion = await openai.completions.create({
      model: 'gpt-3.5-turbo-instruct',
      prompt: `Crea un ${
        storyType !== StoryOptions.ConceptStory ? storyType : ConceptStory
      }${formattedConcept} hecha para un niño de ${age} años. La historia debe de ser sencilla, fácil de leer y fácil de entender. No debe superar las 200 palabras.`,
      max_tokens: 300,
    });

    console.log(completion);
    return completion.choices[0].text;
  } catch (error) {
    console.log(error);
  }
};
