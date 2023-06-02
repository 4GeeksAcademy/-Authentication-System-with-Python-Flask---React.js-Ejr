export const generateSchedule = (startHour, finishHour) => {
  // Convert start and finish hours to minutes
  const startMinutes = startHour * 60;
  const finishMinutes = finishHour * 60;

  const totalBlocks = (finishMinutes - startMinutes) / 60;
  const schedule = [];

  // Generate the schedule blocks
  for (let i = 0; i < totalBlocks; i++) {
    // Calculate the current block's start time in minutes
    const blockStartMinutes = startMinutes + i * 60;

    // Convert the start time back to hours and minutes
    const blockStartHour = Math.floor(blockStartMinutes / 60);
    const blockStartMinute = blockStartMinutes % 60;

    // Create a string representation of the block's start time
    const blockStartTime = `${blockStartHour
      .toString()
      .padStart(2, "0")}:${blockStartMinute.toString().padStart(2, "0")}`;

    // Calculate the current block's end time in minutes
    const blockEndMinutes = blockStartMinutes + 30;

    // Convert the end time back to hours and minutes
    // const blockEndHour = Math.floor(blockEndMinutes / 60);
    // const blockEndMinute = blockEndMinutes % 60;

    // Create a string representation of the block's end time
    // const blockEndTime = `${blockEndHour
    //   .toString()
    //   .padStart(2, "0")}:${blockEndMinute.toString().padStart(2, "0")}`;

    // Push the current block's start and end time to the schedule array
    schedule.push(`${blockStartTime}`);
  }

  // Return the generated schedule
  return schedule;
};
