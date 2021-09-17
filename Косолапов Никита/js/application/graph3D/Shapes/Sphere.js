Surfaces.prototype.sphere = (x0 = 0, y0 = 0, z0 = 0, r = 10, countRing = 9, countPoints = 10) => {
    // Не вводить countRing от 10 до 17!
    const points = [];
    if (countRing % 2 != 0) { // Если кол-во колец четное 
        for (let i = 0; i < Math.PI * 2; i += Math.PI * 2 / countRing) { // Вертикаль
            const y = y0 + r * Math.sin(i);
            let counter = 0;
            let j = 0;
            while (counter != countPoints) {
                const x = x0 + r * Math.cos(i) * Math.cos(j);
                const z = z0 + r * Math.cos(i) * Math.sin(j);
                points.push(new Point(x, y, z));
                j += Math.PI * 2 / countPoints;
                counter++;
            }
            // for (let j = 0; j < Math.round(Math.PI * 2); j += Math.PI * 2 / countPoints) { // Горизонталь}
        }
    } else { // Если кол-во колец нечетное 
        countRing++;
        for (let i = 0; i < Math.PI * 2; i += Math.PI * 2 / countRing) { // Вертикаль
            const y = r * Math.sin(i);
            let counter = 0;
            let j = 0;
            while (counter != countPoints) {
                const x = r * Math.cos(i) * Math.cos(j);
                const z = r * Math.cos(i) * Math.sin(j);
                points.push(new Point(x, y, z));
                j += Math.PI * 2 / countPoints;
                counter++;
            }
        }
    }
    points.sort((p1, p2) => p2.y - p1.y);
    const edges = [];
    const count = countPoints - Math.round(countPoints / 2);
    // * Горизонтальные линии * 
    let prev = 0;
    for (let i = 0; i < points.length - 1; i++) {
        if (points[i].y == points[i + 1].y) {
            edges.push(new Edge(i, i + 1));
        } else {
            edges.push(new Edge(i, prev));
            prev = i + 1;
        }
    }
    edges.push(new Edge(points.length - 1, prev));
    // * Вертикальные линии *
    for (let i = 0; i < countRing; i++) {
        for (let j = 0; j < countPoints; j++) {
            if (j < count && points.length > i * countPoints + j + countPoints - count + countPoints) {
                edges.push(new Edge(i * countPoints + j, i * countPoints + j + countPoints - count + countPoints));
            } else {
                if (i * countPoints + j + countPoints - count < points.length && i < countRing - 1) {
                    edges.push(new Edge(i * countPoints + j, i * countPoints + j + countPoints - count));
                }
            }
        }
    }
    const polygones = [];
    let polygon = [];

    const cnst = countPoints - 1;
    for (let i = 0; i < Math.round(points.length); i++) {
        if (i + points.length < edges.length) {
            if ((i + 1) % countPoints != 0) { // Пропускаем последние по горизонтали точки 

                polygon.push(edges[i + points.length].p1);
                polygon.push(edges[i + points.length + 1].p1);
                polygon.push(edges[i + points.length + 1].p2);
                polygon.push(edges[i + points.length].p2);

                polygones.push(new Polygon(polygon));
                polygon = [];
            } else {
                polygon.push(edges[i + points.length].p1);
                polygon.push(edges[i + points.length].p2);
                polygon.push(edges[i + points.length - cnst].p2);
                polygon.push(edges[i + points.length - cnst].p1);
                polygones.push(new Polygon(polygon));
                polygon = [];
            }

        }

    }
    return new Subject(points, edges, polygones);
};