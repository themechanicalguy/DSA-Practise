class MinBitFlips {
  public int minBitFlips(int start, int goal) {
    return Integer.bitCount(start ^ goal);
  }
}

class MinBitFlips_NotWorking {
  public int minBitFlips(int start, int goal) {
    int fin = start & goal;
    int flip = 0;
    for (int bitVal = 1; bitVal <= goal || bitVal <= goal; bitVal = bitVal << 1) {
      System.out.println(bitVal);
      if ((bitVal & fin) == 0)
        flip++;
    }
    return flip;
  }
}