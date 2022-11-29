import axios from "axios";

export const displayFact = () => {
  const getRandomFact = async () => {
    const randomFactData = await axios.get(
      "https://uselessfacts.jsph.pl/random.json"
    );
    return randomFactData.data;
  };

  return getRandomFact();
};
