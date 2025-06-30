# LC 205 Isomorphic Strings

- Given two strings `s` and `t`, determine if they are isomorphic.
- Two strings `s` and t are isomorphic if the characters in `s` can be replaced to get `t`.
- All occurrences of a character must be replaced with another character while preserving the order of characters.
- No two characters may map to the same character, but a character may map to itself.

### Problem Understanding

Two strings `s` and `t` are isomorphic if the characters in `s` can be replaced to get `t` with the following rules:

1. **Preservation of Order**: The order of characters must remain the same.
2. **Consistent Mapping Rule**:

- **Every occurrence of a character in `s` must be replaced with the same character in `t`**: This means if a character `'x'` in `s` is mapped to `'y'` in `t`, then **all** occurrences of `'x'` in `s` must be replaced with `'y'` in `t`. You cannot map the same character in `s` to different characters in `t`.

**Example**:

- Let `s = "egg"` and `t = "add"`.

1. First character: `'e'` in `s` maps to `'a'` in `t`.
2. Second character: `'g'` in `s` maps to `'d'` in `t`.
3. Third character: `'g'` in `s` maps to `'d'` in `t` (same as the second character).

**Check for Consistent Mapping**:

- `'e'` in `s` always maps to `'a'` in `t` (only one occurrence, so trivially consistent).
- `'g'` in `s` appears twice, and both times it maps to `'d'` in `t`. This is consistent.

**Conclusion**: The strings `"egg"` and `"add"` are **isomorphic** because the mapping is consistent.

**Example**:

- Let `s = "foo"` and `t = "bar"`.

1. First character: `'f'` in `s` maps to `'b'` in `t`.
2. Second character: `'o'` in `s` maps to `'a'` in `t`.
3. Third character: `'o'` in `s` maps to `'r'` in `t`.

**Problem**:

- The character `'o'` in `s` is mapped to `'a'` in the second position but to `'r'` in the third position. This violates the **consistent mapping rule** because `'o'` cannot map to two different characters (`'a'` and `'r'`) in `t`.

**Conclusion**: The strings `"foo"` and `"bar"` are **not isomorphic** because the mapping is inconsistent.

3. **Bijective Mapping Rule**:

- **No two characters in `s` can map to the same character in `t`**: This means each character in `t` must be uniquely mapped from a character in `s`. In other words, if `'a'` in `s` maps to `'x'` in `t`, then no other character in `s` (like `'b'`) can also map to `'x'` in `t`.
- **Vice versa**: Similarly, no two characters in `t` can map to the same character in `s`. If `'x'` in `t` maps back to `'a'` in `s`, then no other character in `t` (like `'y'`) can map back to `'a'` in `s`.

**Example**:

- Let `s = "badc"` and `t = "baba"`.

1. `'b'` in `s` maps to `'b'` in `t`.
2. `'a'` in `s` maps to `'a'` in `t`.
3. `'d'` in `s` maps to `'b'` in `t`.
4. `'c'` in `s` maps to `'a'` in `t`.

**Violation of Bijective Mapping**:

- Here, `'b'` in `t` is being mapped by both `'b'` and `'d'` from `s`. This violates the rule that no two characters in `s` can map to the same character in `t`.
- Similarly, `'a'` in `t` is being mapped by both `'a'` and `'c'` from `s`, which is also a violation.

**Conclusion**: The strings `"badc"` and `"baba"` are **not isomorphic** because the mapping is not bijective.

### Correct Example of Bijective Mapping

**Example**:

- Let `s = "paper"` and `t = "title"`.

**Mapping**:

1. `'p'` in `s` maps to `'t'` in `t`.
2. `'a'` in `s` maps to `'i'` in `t`.
3. `'p'` in `s` maps to `'t'` in `t` (consistent with previous mapping).
4. `'e'` in `s` maps to `'l'` in `t`.
5. `'r'` in `s` maps to `'e'` in `t`.

**Check for Bijective Mapping**:

- Each character in `s` maps to a unique character in `t`:
  - `'p'` → `'t'`
  - `'a'` → `'i'`
  - `'e'` → `'l'`
  - `'r'` → `'e'`
- No two characters in `s` map to the same character in `t`:
  - `'p'` and `'a'` map to `'t'` and `'i'` respectively (unique).
  - `'e'` and `'r'` map to `'l'` and `'e'` respectively (unique).
- Similarly, no two characters in `t` map to the same character in `s`:
  - `'t'` in `t` maps back to `'p'` in `s`.
  - `'i'` in `t` maps back to `'a'` in `s`.
  - `'l'` in `t` maps back to `'e'` in `s`.
  - `'e'` in `t` maps back to `'r'` in `s`.

**Conclusion**: The strings `"paper"` and `"title"` are **isomorphic** because the mapping is bijective.

### Key Takeaway

For two strings to be isomorphic, the mapping between their characters must be **one-to-one and onto** (bijective). This ensures that:

1. Every character in `s` maps to exactly one unique character in `t`.
2. Every character in `t` is mapped by exactly one unique character in `s`.

This prevents any overlaps or conflicts in the mappings, ensuring the strings can be perfectly transformed into each other by character replacements.

### Approach 1: Two Hash Maps (Bijective Mapping Check)

- **Intuition**: We need to ensure that each character in `s` maps to exactly one character in `t` and vice versa.
- **Steps**:
  1. If lengths of `s` and `t` are different, return `false`.
  2. Create two maps: `sToT` (maps characters from `s` to `t`) and `tToS` (maps characters from `t` to `s`).
  3. Iterate through each character in `s` and `t` simultaneously:
     - If `s[i]` is in `sToT` but `sToT[s[i]] !== t[i]`, return `false`.
     - If `t[i]` is in `tToS` but `tToS[t[i]] !== s[i]`, return `false`.
     - Otherwise, add mappings `sToT[s[i]] = t[i]` and `tToS[t[i]] = s[i]`.
  4. If loop completes, return `true`.

```javascript
/**
 * Determines if two strings are isomorphic using two hash maps.
 * @param {string} s - The first string.
 * @param {string} t - The second string.
 * @return {boolean} - True if isomorphic, false otherwise.
 */
function isIsomorphic(s, t) {
  if (s.length !== t.length) return false;

  const sToT = new Map(); // Maps characters from s to t
  const tToS = new Map(); // Maps characters from t to s

  for (let i = 0; i < s.length; i++) {
    const charS = s[i];
    const charT = t[i];

    // Check if charS is already mapped to a different charT
    if (sToT.has(charS)) {
      if (sToT.get(charS) !== charT) {
        return false;
      }
    } else {
      sToT.set(charS, charT);
    }

    // Check if charT is already mapped to a different charS
    if (tToS.has(charT)) {
      if (tToS.get(charT) !== charS) {
        return false;
      }
    } else {
      tToS.set(charT, charS);
    }
  }

  return true;
}
```

- **Time Complexity**: O(n), where n is the length of the strings. We iterate through each character once.
- **Space Complexity**: O(1) or O(min(m, n)), where m is the size of the character set (ASCII has 256 characters, so O(1)).

### Approach 2: Using Index Tracking

- **Intuition**: Two strings are isomorphic if the first occurrence of each character in `s` and `t` happens at the same position.
- **Steps**:
  1. If lengths are different, return `false`.
  2. For each character in `s` and `t`, check if the index of their first occurrence is the same.
  3. If any mismatch, return `false`; else, `true`.

```javascript
/**
 * Determines if two strings are isomorphic by comparing the indices of first occurrences.
 * @param {string} s - The first string.
 * @param {string} t - The second string.
 * @return {boolean} - True if isomorphic, false otherwise.
 */
function isIsomorphic(s, t) {
  if (s.length !== t.length) return false;

  for (let i = 0; i < s.length; i++) {
    // Check if the first occurrence index of s[i] in s is the same as t[i] in t
    if (s.indexOf(s[i]) !== t.indexOf(t[i])) {
      return false;
    }
  }

  return true;
}
```

- **Time Complexity**: O(n^2), because `indexOf` is O(n) for each character, and we do this for each of the n characters.
- **Space Complexity**: O(1), no extra space used besides variables.

### Dry Run of Optimal Approach (Approach 1: Two Hash Maps)

#### Example 1: s = "egg", t = "add"

- Initialize `sToT = {}`, `tToS = {}`.
- i = 0:
  - charS = 'e', charT = 'a'.
  - `sToT` doesn't have 'e', `tToS` doesn't have 'a'.
  - `sToT = {e: a}`, `tToS = {a: e}`.
- i = 1:
  - charS = 'g', charT = 'd'.
  - `sToT` doesn't have 'g', `tToS` doesn't have 'd'.
  - `sToT = {e: a, g: d}`, `tToS = {a: e, d: g}`.
- i = 2:
  - charS = 'g', charT = 'd'.
  - `sToT` has 'g' mapped to 'd' (consistent), `tToS` has 'd' mapped to 'g' (consistent).
- Loop completes → return `true`.

#### Example 2: s = "foo", t = "bar"

- Initialize `sToT = {}`, `tToS = {}`.
- i = 0:
  - charS = 'f', charT = 'b'.
  - `sToT = {f: b}`, `tToS = {b: f}`.
- i = 1:
  - charS = 'o', charT = 'a'.
  - `sToT = {f: b, o: a}`, `tToS = {b: f, a: o}`.
- i = 2:
  - charS = 'o', charT = 'r'.
  - `sToT` has 'o' mapped to 'a' ≠ 'r' → return `false`.

#### Example 3: s = "paper", t = "title"

- Initialize `sToT = {}`, `tToS = {}`.
- i = 0:
  - charS = 'p', charT = 't'.
  - `sToT = {p: t}`, `tToS = {t: p}`.
- i = 1:
  - charS = 'a', charT = 'i'.
  - `sToT = {p: t, a: i}`, `tToS = {t: p, i: a}`.
- i = 2:
  - charS = 'p', charT = 't'.
  - `sToT` has 'p' mapped to 't' (consistent), `tToS` has 't' mapped to 'p' (consistent).
- i = 3:
  - charS = 'e', charT = 'l'.
  - `sToT = {p: t, a: i, e: l}`, `tToS = {t: p, i: a, l: e}`.
- i = 4:
  - charS = 'r', charT = 'e'.
  - `sToT` doesn't have 'r', but `tToS` has 'e' mapped to 'l' ≠ 'r' → but wait, no: `tToS` checks if 'e' is already mapped to something else. Here, 'e' is not in `tToS` yet.
  - `sToT = {p: t, a: i, e: l, r: e}`, `tToS = {t: p, i: a, l: e, e: r}`.
- Loop completes → return `true`.

### Edge Cases Covered

1. **Different Lengths**: Automatically `false`.
2. **All Unique Characters**: Always `true` (e.g., `s = "abc"`, `t = "def"`).
3. **Same Characters**: `true` (e.g., `s = "aaa"`, `t = "bbb"`).
4. **Inconsistent Mapping**: `false` (e.g., `s = "aa"`, `t = "ab"`).

### Final Thoughts

The two hash maps approach is optimal with O(n) time and O(1) space (since the maps store a fixed number of characters). The index tracking approach is simpler but less efficient for large strings. The first approach is preferred for its efficiency and clarity.
