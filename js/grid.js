(function draw() {
        const canvas =document.querySelector('canvas')
        const context = canvas.getContext('2d');

        const resolution = 10;
        canvas.width = 800;
        canvas.height = 800;

        const COLS = canvas.width / resolution; // Creates specified number of cells in columns. 
        const ROWS = canvas.height / resolution; // Creates speicified number of cells in row. 

        function buildGrid() {
        return new Array(COLS).fill(null)
            .map(() => new Array(ROWS).fill(null) // interates over the columns array and creates ROWS of null
                .map(() => Math.floor(Math.random() * 2))); // Randomly chooses 1 or 0 to place in the 2d array. 
        }

        let grid = buildGrid();
        render(grid);

        // requestAnimationFrame(draw);

        // Generation counter, calls nextGen again, re-renders and calls requestAnimationFrame again. 
         function update() {
            setTimeout(function(){
                setGen(gen += 1);
                grid = nextGen(grid);
                render(grid);
                requestAnimationFrame(update); // Keeps the ball rolling...
        console.log(speed)
            }, 700)
        // console.log(speed)
        }

        function start() {
            console.log('start')
            requestAnimationFrame(update)
        }

        // setTimeout(update, 50)

        // function update() {
        //  setGen(gen += 1);
        //     grid = nextGen(grid);
        //     render(grid);
        //     requestAnimationFrame(setTimeout); // Keeps the ball rolling...
        // }


        function nextGen(grid) {
            const nextGen = grid.map(arr => [...arr]); // buffer

        // Repopulates the next generation of 1's and 0's...
            for(let col = 0; col < grid.length; col++) {
                for(let row = 0; row < grid[col].length; row++) {
                    const cell = grid[col][row];
                    let numNeighbors = 0;
                    for(let i = -1; i < 2; i++) {
                        for(let j = -1; j < 2; j++) {
                            if(i === 0 && j === 0) {
                                continue;
                            }
                    
                            const x_cell = col + i;
                            const y_cell = row + j;

                            if(x_cell >= 0 && y_cell >= 0 && x_cell < COLS && y_cell < ROWS) {
                                const currentNeighbor = grid[col + i][row + j];
                                numNeighbors += currentNeighbor;
                            }
                        }
                    }
                    // rules of life
                    if(cell === 1 && numNeighbors < 2) {
                        nextGen[col][row] = 0;
                    } else if (cell === 1 && numNeighbors > 3) {
                        nextGen[col][row] = 0;
                    } else if (cell === 0 && numNeighbors === 3) {
                        nextGen[col][row] = 1;
                    }
                }
            }
            return nextGen;
        }

        // Populates grid with 0's or 1's...
        function render(grid) {
                for(let col = 0; col < grid.length; col++) {
                    for(let row = 0; row < grid[col].length; row++) {
                        const cell = grid[col][row]; // grid[][] creates a 2d array or matrix with ROWS and columns. 

                        context.beginPath();
                        context.rect(col * resolution, row * resolution, resolution, resolution); // (x, y, width, height)
                        context.fillStyle = cell ? 'darkred' : 'lightblue';
                        context.fill();
                        context.stroke();
                    }
                }
            }
    })();