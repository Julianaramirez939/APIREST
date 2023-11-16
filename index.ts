import express, { Request, Response } from 'express';

const app = express();

app.use(express.json());

interface Estudiante {
    id: number;
    nombre: string;
    edad: number;
    inscrito: boolean;
}

const estudiantes: Estudiante[] = [
    { id: 1, nombre: 'Juliana', edad: 17, inscrito: true },
    { id: 2, nombre: 'Nicolás', edad: 17, inscrito: false },
    { id: 3, nombre: 'Juan', edad: 16, inscrito: false },
];

app.get('/', (req: Request, res: Response) => {
    res.send('Node JS api');
});

app.get('/api/estudiante', (req: Request, res: Response) => {
    res.send(estudiantes);
});

app.get('/api/estudiante/:id', (req: Request, res: Response) => {
    const student = estudiantes.find((c) => c.id === parseInt(req.params.id, 10));
    if (!student) return res.status(404).send('Estudiante no encontrado');
    else res.send(student);
});

app.post('/api/estudiante', (req: Request, res: Response) => {
    const student: Estudiante = {
        id: estudiantes.length + 1,
        nombre: req.body.nombre,
        edad: parseInt(req.body.edad, 10),
        inscrito: req.body.inscrito === 'true',
    };

    estudiantes.push(student);
    res.send(student);
});

app.delete('/api/estudiante/:id', (req: Request, res: Response) => {
    const student = estudiantes.find((c) => c.id === parseInt(req.params.id, 10));
    if (!student) return res.status(404).send('Estudiante no encontrado');

    const index = estudiantes.indexOf(student);
    estudiantes.splice(index, 1);
    res.send(student);
});

const port = process.env.PORT || 80;
app.listen(port, () => console.log(`Escuchando en puerto ${port}...`));
