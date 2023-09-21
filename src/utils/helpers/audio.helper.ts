type PlayAudioOptions = {
  isMuted?: boolean;
  isLoop?: boolean;
};

export const playAudio = (
  name: string,
  { isMuted, isLoop }: PlayAudioOptions = {}
) => {
  const audio = new Audio(`/audio/${name}.mp3`);

  audio.volume = isMuted ? 0 : 0.1;

  audio.loop = !!isLoop;

  audio.play();

  return audio;
};
