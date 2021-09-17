Surfaces.prototype.ellipticalCylinder = (x0 = 0, y0 = 0, z0 = 0, a = 2, b = 3, count = 10, h = 10) => {
    const points = [];
    const edges = [];
    const polygons = [];
    const PI = Math.PI;
    const delta = 2 * PI / count; // Окружность делим на кол-во точек

    for (let p = 0; p < h; p++) { // Двигаемся по вертикали
        const y = y0 + p;
        for (let i = 0; i <= PI; i += delta * 2 + count) {
            for (let j = 0; j < 2 * PI; j += delta) {
                const z = z0 + a * Math.cos(i) * Math.cos(j);
                const x = x0 + b * Math.sin(j);
                points.push(new Point(x, y, z));
            }
        }
    }

    //  Ребра и полигоны 
    for (let i = 0; i < points.length; i++) {
        // Горизонтальные ребрышки
        if ((i + 1) < points.length && (i + 1) % count !== 0) {
            edges.push(new Edge(i, i + 1));
        }
        // Вертикальные ребрышки
        if (i + count < points.length) {
            edges.push(new Edge(i, i + count));
        }
        //  Завершаем горзонтальные ребрышки (последние) 
        if ((i + 1) >= count && (i + 1) % count === 0) {
            edges.push(new Edge(i, i - count + 1));
        }
        //  Полигоны 

        let num=0;

        if (i + 1 + count < points.length && (i + 1) % count !== 0) {

            console.log(num)

            if (num == 1) polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count],`#ADFF2F`));
            if (num == 2) polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count],`#FA8072`));
            if (num == 3) polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count],`#FFEFD5`));
        }
        //  Последние полигоны 
        if ((i + 1) >= count && i + count < points.length && (i + 1) % count === 0) {

            if (num == 1) polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count],`#ADFF2F`));
            if (num == 2) polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count],`#FA8072`));
            if (num == 3) polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count],`#FFEFD5`));   
        }
    }

    let num;
    polygons.forEach((element,index) => {
        num++;
        if (num>3) {
            num=1;
        }

        polygons[index].input=`#ADFF2F`;
        console.log(polygons[index])
    })

    return new Subject(points, edges, polygons);
};