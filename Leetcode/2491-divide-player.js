// https://leetcode.com/problems/divide-players-into-teams-of-equal-skill/
// 2491. Divide Players Into Teams of Equal Skill
// Diff: Medium
// Tags: Freq Counter (Not this one the actuall better time complexity is Freq counter)

/**
 * @param {number[]} skill
 * @return {number}
 */
var dividePlayers = function (skill) {
  const sum = skill.reduce((a, b) => a + b);
  const singleSum = parseInt((sum * 2) / skill.length);
  skill.sort((a, b) => a - b);
  let chem = 0;

  for (let i = 0; i < skill.length / 2; i++) {
    if (skill[i] + skill[skill.length - 1 - i] != singleSum) return -1;
    chem += skill[i] * skill[skill.length - 1 - i];
  }

  return chem;
};
