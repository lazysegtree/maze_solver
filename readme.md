# maze solver

A static website to solve any maze given as an image.
See website for usage instructions.

Demo video : To be uploaded soom
Hosted Url : https://nitin12384.github.io/maze_solver/
Website can be loaded in both desktop and mobile.

# Implementation

## Image processing
- Used HTML Canvas for drawing maze image.
- Used HTML Canvas getImageData for pixel manipution

## Styling
- Used Bootstrap for responsive styling

## Pathfinding
- Used BFS to connect start point to end point, and to find the shortest path.
- In tracing the final path from start to end point, pixels with more distance from opposite color( opposite of the color of the start and end points) are preffered.


# Futher Improvements

First to finish the todo.
## Current Todo With priority

### Implementation : Major
- [ ] (A0) Image blurring Problem
- [x] (A1) Animation of BFS filling
- [x] (A2) BFS filling in varying color
- [x] (B1) Styling
- [x] (B2) Responsive Styling
- [x] (A6) Visible Marking of start and end point
- [x] (A7) Reset Button
- [ ] (A9) Red path does not overlaps the black pixels
- [x] (A10) Avoid choosing pixels adjacent to black pixels for path
- [ ] (A11) Set demo mazes 3


### Implementation : Minor

- [x] (A3) Message if cant find solution of maze
- [x] (A4) Message if solving started on click of solve
- [x] (A5) Check if image is loaded on solve button.
- [x] (A8) Add instructions
- [ ] (C1) Limit the allowed image extensions
 
### Other

- [ ] (D1) Code cleanup
- [ ] (D2) Proper documentation here
- [ ] (D3) Demo video 
- [ ] (D4) code walkthrough video.
