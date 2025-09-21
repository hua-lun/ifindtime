export const formatString = (template: string, ...args: any[]): string => {
  return template.replace(/{(\d+)}/g, (match, index) => {
    return typeof args[index] !== "undefined" ? args[index] : match;
  });
};
export const joinStringArray = (
  stringArr: string[],
  start: number,
  end: number
) => {
  let temp: string = "";
  for (let i = start; i < end; i++) {
    temp += stringArr[i] + " ";
  }
  return temp.trim();
};

export const getTimezones = (timezones: string[]) => {
  let arr: any[] = [];
  for (const t in timezones) {
    const tz = timezones[t];

    const tempTitle = tz.split("/")[1];
    arr.push({
      key: tz,
      label: tempTitle,
    });
  }
  return arr;
};
