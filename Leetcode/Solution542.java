class Solution {
    final static int d[][] = {
            {0,1},
            {1,0},
            {0,-1},
            {-1,0}
    };
    
    public int[][] updateMatrix(int[][] matrix) {
        int h = matrix.length;
        int w = matrix[0].length;
        int[][] dist = new int[h][w];

        for(int i=0;i<h;i++) {
            for(int j=0;j<w;j++) {
                dist[i][j]=Integer.MAX_VALUE;
            }
        }

        Queue<int[]> queue = new LinkedList<int[]>();
        for(int i=0;i<h;i++) {
            for(int j=0;j<w;j++) {
                if (matrix[i][j]==0) {
                    dist[i][j]=0;
                    queue.add(new int[]{i,j});
                }
            }
        }

        while (!queue.isEmpty()) {
            int[] curr = queue.poll();
            int row = curr[0];
            int col = curr[1];
            for (int i = 0; i < 4; i++) {
                int x = row + d[i][0];
                int y = col + d[i][1];
                if (isValid(matrix, h, w, x, y)) {
                    if (dist[x][y]>dist[row][col]+1) {
                        dist[x][y] = dist[row][col]+1;
                        queue.add(new int[]{x,y});
                    }
                }
            }
        }

        return dist;        
    }
    
    private boolean isValid(int[][] grid, int width, int height, int row, int col) {
        return (row >= 0) && (row < width) && (col >= 0) && (col < height);
    }    
}