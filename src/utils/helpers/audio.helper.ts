import { DEFAULT_VOLUME, LOCAL_STORAGE_VOLUME } from "../constants/constants";

type PlayAudioOptions = {
  isLoop?: boolean;
  isMuted?: boolean;
};

export const playAudio = (
  name: string,
  { isMuted, isLoop }: PlayAudioOptions = {}
) => {
  const audio = new Audio(`/audio/${name}.mp3`);

  audio.volume = isMuted
    ? 0
    : +(localStorage.getItem(LOCAL_STORAGE_VOLUME) || DEFAULT_VOLUME);

  audio.loop = !!isLoop;

  audio.play();

  return audio;
};
