Surfaces.prototype.sfera = ( 
    R = 15, 
    count = 30, 
    point = new Point(0, 0, 0), 
    color = '#FF69B4',
    animation =  null) => {

	const points = [];
	const edges = [];
    const polygons = [];
    
    const da = 2 * Math.PI / count;
    //точки
    for(let i = 0; i < Math.PI; i += da){
        for (let j = 0; j < 2 * Math.PI; j += da) {
            const x = point.x + R * Math.sin(i) * Math.cos(j);
            const y = point.y + R * Math.sin(i) * Math.sin(j);
            const z = point.z + R * Math.cos(i);
            points.push(new Point(x, y, z));
        }
	}

    //ребра
    for(let i = 0; i < points.length; i++){
        if(i + count < points.length){
            edges.push(new Edge( i, i + count));
        }

        if(i + 1 < points.length && (i + 1) % count != 0){
            edges.push(new Edge(i, i + 1));
        } else if((i + 1) % count == 0){
            edges.push(new Edge(i, i + 1 - count));
        }

    }
    edges.push( new Edge( points.length-1,0));


    //полигоны
    for(let i = 0; i < points.length; i++){
        if(i + 1 + count < points.length && (i + 1) % count != 0){
            polygons.push(new Polygon([i, i+1, i + 1 + count, i + count], color));
        } else if((i + 1) % count == 0   &&   i + count < points.length){
            polygons.push(new Polygon([i, i + 1 - count, i + 1 , i + count], color));
        }  
     }
    return new Subject(points, edges, polygons, animation);
}
    