export const playAudio = (name: string) => {
  const audio = new Audio(`/audio/${name}.mp3`);

  audio.volume = 0.5;

  audio.play();

  return audio;
};
