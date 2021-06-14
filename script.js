let gameDataUrl = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json"
let gameData

let canvas = d3.select('#canvas');
let tooltip = d3.select('#tooltip');
const drawTreeMap = (dataset)=>{
    //create hierarchy
    let hierarchy = d3.hierarchy(gameData,(node)=>{
        return node.children;
    }).sum(node=>{
        return node.value;
    }).sort((node1,node2)=>{
        return node2.value-node1.value; 
    });
    
    //create tree_map
    let createTreeMap = d3.treemap()
                            .size([1000,600])
    createTreeMap(hierarchy);

    let gameTiles = hierarchy.leaves()
    console.log(gameTiles);
    let block = canvas.selectAll('g')
            .data(gameTiles)
            .enter()
            .append('g')
            .attr('transform',(game)=>{
                return 'translate('+game.x0+', '+game.y0+')'
            })
    block.append('rect')
            .attr('class','tile')
            .attr('border','1px soild black')
            .attr('fill',(game)=>{
                let category = game.data.category;
                switch(category){
                    case 'Wii': 
                        return 'blue'
                    case 'X360':
                        return 'orange'
                    case 'NES':
                        return 'lightgreen'
                    case 'DS': 
                        return 'lightblue'
                    case 'GB': 
                        return 'forestgreen'
                    case '3DS':
                        return 'pink'
                    case 'PS2': 
                        return 'lightcoral'
                    case 'PS4': 
                        return 'mediumorchid'
                    case 'SNES':
                        return 'slateblue'
                    case 'PS3': 
                        return 'springgreen'
                    case 'PS':
                        return 'peru'
                    case 'N64':
                        return 'rosybrown'
                    case 'GBA':
                        return 'turquoise'
                    case 'PC':
                        return 'gray'
                    case '2600': 
                        return 'lightgray'
                    case 'PSP': 
                        return 'gold'
                    case 'XB': 
                        return 'plum'
                    case 'XOne':
                        return 'magenta'
                }
            })
            .attr('data-name',(game)=>game.data.name)
            .attr('data-category',(game)=>game.data.category)
            .attr('data-value',(game)=>game.data.value)
            .attr('width',(game)=>{
                return game.x1-game.x0;
            })
            .attr('height',(game)=>{
                return game.y1-game.y0;
            })
            .on('mouseover',(game)=>{
                tooltip.transition().style('opacity','1')
                tooltip.append('data-value')
                let val = game.data.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                tooltip.html("$"+val+'<br>'+game.data.name).style("left", (d3.event.pageX) + "px")             
                .style("top", (d3.event.pageY - 28) + "px")
                .attr('data-value',game.data.value)
            })
            .on('mouseout',(game)=>{
                tooltip.transition().style('opacity','0')
            })
    //add text to each blockquote
    block.append('text')
            .text((game)=>game.data.name)
            .attr('x',5)
            .attr('y',20)

    
            
}
d3.json(gameDataUrl).then(function(data,error){
    if(error) console.log(error);
    else {
        gameData = data;
        drawTreeMap(gameData);
    }
})