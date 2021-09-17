Surfaces.prototype.hyperbolicParaboloid = (x0 = 0, y0 = 0, z0 = 0, size = 5, q = 2, p = 3, countRing = 5, countPoints = 9) => {
    const points = [];
    const edges = [];
    const polygones = [];
    const deltaY = size / (countRing - 1);
    const deltaZ = 2 * Math.PI / countPoints;
    for (let i = -size / 2; i <= size / 2; i += deltaY) {
        for (let j = -Math.PI; j <= Math.PI; j += deltaZ) {
            const y = y0 + j ** 2 - i ** 2;
            const x = x0 + i * Math.sqrt(2 * q);
            const z = z0 + j * Math.sqrt(2 * p);
            points.push(new Point(x, y, z));
        }
    }

    for (let i = 0; i < points.length - 1; i++) {
        if (points[i].x == points[i + 1].x) {
            edges.push(new Edge(i, i + 1));
        }
        if (i < points.length - countPoints && points[i].z == points[i + countPoints].z) {
            edges.push(new Edge(i, i + countPoints));
        }
    }
    for (let i = 0; i < points.length - 1; i++) {
        if (points[i].x == points[i + 1].x && i < points.length - countPoints - 1 && points[i].z == points[i + countPoints].z) {
            polygones.push(new Polygon([i, i + 1, i + 1 + countPoints, i + countPoints]));
        }
    }
    for (let i = 0; i < polygones.length; i++) {
        polygones[i].num = i;
    }

    return new Subject(points, edges, polygones);
}