export const getHours = (time: number) => Math.floor(time / 3600);
export const getMinutes = (time: number) => Math.floor(time / 60);
export const getSeconds = (time: number) => Math.floor(time % 60);

export const getTime = (time: { minutes: number; seconds: number }) =>
  time.minutes * 60 + time.seconds;

export const getDisplayTime = (
  time: {
    hours?: number;
    minutes: number;
    seconds: number;
  },
  type: "html" | "text"
) => {
  const floorMinutes = Math.floor(time.minutes % 60);

  return type === "html" ? (
    <>
      {getNumberZeroFallback(floorMinutes)}
      <span className="flex flex-shrink-0 flex-col align-middle justify-evenly p-[7vw]">
        {new Array(2).fill(null).map((_, index) => (
          <div key={index} className="w-[5vw] h-[5vw] bg-current" />
        ))}
        <span
          className={`absolute text-center text-[3vw] bottom-0 left-[50%] translate-y-[-50%] translate-x-[-50%] transition-opacity ${
            time.hours ? "opacity-100" : "opacity-0"
          }`}
        >
          {time.hours || 1}h
        </span>
      </span>
      {getNumberZeroFallback(time.seconds)}
    </>
  ) : (
    `${
      time.hours ? (time.hours > 9 ? `${time.hours}:` : `0${time.hours}:`) : ""
    }${floorMinutes > 9 ? floorMinutes : "0" + floorMinutes}:${
      time.seconds > 9 ? time.seconds : "0" + time.seconds
    }`
  );
};

const getNumberZeroFallback = (number: number) =>
  number > 9 ? (
    new Array(2)
      .fill(number.toString())
      .map((_, index) => <span key={index}>{_[index]}</span>)
  ) : (
    <>
      <span>0</span>
      <span>{number}</span>
    </>
  );
