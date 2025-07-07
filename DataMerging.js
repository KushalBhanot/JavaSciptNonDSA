export default function mergeData(sessions) {
  let userMap = new Map();

  sessions.forEach((session, index) => {
    const { user, duration, equipment } = session;

    if (!userMap.has(user)) {
      userMap.set(user, {
        duration,
        equipment: new Set(equipment),
        firstIndex: index,
      });
    } else {
      const entry = userMap.get(user);
      entry.duration += duration;
      equipment.forEach((item) => entry.equipment.add(item));
    }
  });

  const entries = Array.from(userMap.entries());
  // Add userMap.keys() to the front of entries and also remove firstIndex key/value pair
  return entries.map(([user, { duration, equipment }]) => {
    return {
      user,
      duration,
      equipment: Array.from(equipment).sort(),
    };
  });
}
