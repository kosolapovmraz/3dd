Surfaces.prototype.hyperbolicCylinder = (x0 = 0, y0 = 0, z0 = 0, a = 1, b = 1, size = 5, countRing = 5, countPoints = 8) => {
    const points = [];
    if (countPoints % 2 != 0) {
        countPoints = countPoints - 1;
    }

    const edges = [];
    const polygones = [];
    const deltaY = size / (countRing - 1);
    const deltaZ = 2 * Math.PI / countPoints;
    for (let i = -size / 2; i <= size / 2; i += deltaY) { // Положительные z
        const y = y0 + i;

        for (let j = -Math.PI; j <= Math.PI; j += deltaZ) {
            const x = x0 + a * Math.sinh(j);
            const z = z0 + b * Math.cosh(j);
            points.push(new Point(x, y, z));
        }
    }
    for (let i = -size / 2; i <= size / 2; i += deltaY) { // Отрицательные z
        const y = y0 + i;
        for (let j = -Math.PI; j <= Math.PI; j += deltaZ) {
            const x = x0 + a * Math.sinh(j);
            const z = z0 - b * Math.cosh(j);
            points.push(new Point(x, y, z));
        }
    }

    for (let i = 0; i < points.length - 1; i++) {
        if (points[i].y == points[i + 1].y) { // Горизонтальные ребрышки
            edges.push(new Edge(i, i + 1));
        }
        if (i + 1 + countPoints < points.length) { // Вертикальные ребрышки
            if (points[i].z != -points[i + countPoints + 1].z)
                edges.push(new Edge(i, i + countPoints + 1));
        }
        if (i + countPoints + 2 < points.length) {
            if (points[i].z != -points[i + countPoints + 1].z && points[i + 1].z != -points[i + countPoints + 2].z) {
                if (points[i].y == points[i + 1].y)
                    polygones.push(new Polygon([i, i + 1, i + countPoints + 2, i + countPoints + 1]));
            }

        }
    }

    return new Subject(points, edges, polygones);
};