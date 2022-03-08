import { TimeLeftPipe } from './time-left.pipe';

describe('TimeLeftPipe', () => {
  let pipe: TimeLeftPipe;

  beforeEach(() => {
    pipe = new TimeLeftPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should correctly transform `seconds left number` in a `time left string` with `00h:00m:00s` format', () => {
    const fiftySeconds = 50;
    const expectedFiftySecondsString = '00h:00m:50s';

    expect(pipe.transform(fiftySeconds)).toBe(expectedFiftySecondsString);

    const fortyFiveMinutes = 2700;
    const expectedFortyFiveMinutesString = '00h:45m:00s';

    expect(pipe.transform(fortyFiveMinutes)).toBe(
      expectedFortyFiveMinutesString
    );

    const fortyFiveMinutesFiftySeconds = 2750;
    const expectedFortyFiveMinutesFiftySecondsString = '00h:45m:50s';

    expect(pipe.transform(fortyFiveMinutesFiftySeconds)).toBe(
      expectedFortyFiveMinutesFiftySecondsString
    );

    const oneHour = 3600;
    const expectedOneHourString = '01h:00m:00s';

    expect(pipe.transform(oneHour)).toBe(expectedOneHourString);

    const oneHourFortyFiveMinutes = 6300;
    const expectedOneHourFortyFiveMinutesString = '01h:45m:00s';

    expect(pipe.transform(oneHourFortyFiveMinutes)).toBe(
      expectedOneHourFortyFiveMinutesString
    );

    const oneHourFortyFiveMinutesFiftySeconds = 6350;
    const expectedOneHourFortyFiveMinutesFiftySecondsString = '01h:45m:50s';

    expect(pipe.transform(oneHourFortyFiveMinutesFiftySeconds)).toBe(
      expectedOneHourFortyFiveMinutesFiftySecondsString
    );
  });
});
