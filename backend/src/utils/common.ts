export const extractTags = (content: string, tag: string): string[] => {
  // make the content into array of strings
  let strarr = content.split(" ");
  console.log(strarr);
  // filter the array with first character being #.

  strarr = strarr.filter((element) => element.charAt(0) == tag);
  console.log(strarr);
  // make some validation of hashtag using regex.

  // return the array of hashtags
  return strarr;
};
