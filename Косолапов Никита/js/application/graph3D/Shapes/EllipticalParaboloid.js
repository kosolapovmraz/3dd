Surfaces.prototype.ellipticalParaboloid = (x0 = 0, y0 = -5, z0 = 0, p = 1, q = 1, size = 5, countRing = 10, countPoints = 8) => {
    const points = [];
    const edges = [];
    const polygones = [];
    const deltaY = size / (countRing - 1);
    const deltaZ = 2 * Math.PI / countPoints;
    for (let i = 0; i <= size; i += deltaY) {
        const y = y0 + (i ** 2) / 2;
        for (let j = -Math.PI; j <= Math.PI; j += deltaZ) {
            const x = x0 + i * Math.sin(j) * Math.sqrt(p);
            const z = z0 + i * Math.cos(j) * Math.sqrt(q);
            points.push(new Point(x, y, z));
        }
    }
    if (countPoints % 2 == 0) {
        for (let i = 0; i < points.length - 1; i++) {
            if (points[i].y == points[i + 1].y) {
                edges.push(new Edge(i, i + 1));
            }
            if (i + 1 + countPoints < points.length) {
                edges.push(new Edge(i, i + countPoints + 1));
            }
            if (i + countPoints + 2 < points.length) {
                polygones.push(new Polygon([i, i + 1, i + countPoints + 2, i + countPoints + 1]));
            }
        }
    } else {
        let iPrev = 0;
        for (let i = 0; i < points.length - 1; i++) {
            if (points[i].y == points[i + 1].y) {
                edges.push(new Edge(i, i + 1));
                if (i + countPoints + 1 < points.length) {
                    polygones.push(new Polygon([i, i + 1, i + countPoints + 1, i + countPoints]));
                }
            } else {
                edges.push(new Edge(i, iPrev));
                if (i + countPoints < points.length) {
                    polygones.push(new Polygon([i, iPrev, i + 1, i + countPoints]));
                }
                iPrev = i + 1;
            }
            if (i + countPoints < points.length) {
                edges.push(new Edge(i, i + countPoints));
            }
        }
        edges.push(new Edge(points.length - 1, iPrev));
    }
    // console.log(polygones);
    return new Subject(points, edges, polygones);
};