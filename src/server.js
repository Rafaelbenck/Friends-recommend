const express = require("express");
const { restart } = require("nodemon");
const app = express();

app.use(express.json());

const Persons = [];

//validando a entrada no servidor (remover)
app.get("/persons", (req, res) => {
  return res.status(200).json(Persons);
});

app.post("/person", (req, res) => {
  const { name, cpf } = req.body;

  if (name && cpf) {
    const newPerson = { name: name, cpf: cpf, relations: [] };
    const cpfAlredyExist = Persons.find((person) => person.cpf === cpf);

    if (!name || !cpf)
      return res.status(400).json({ message: "Incompleted data" });
    if (cpf.length !== 11)
      return res.status(400).json({ message: "Cpf invalid" });

    if (cpfAlredyExist)
      return res.status(400).json({ message: "User already exist" });

    if (!cpfAlredyExist) {
      Persons.push(newPerson);

      return res.status(200).json(Persons);
    }
  }
});

app.get("person/:cpf", (req, res) => {
  const { name, cpf } = req.params;
  const personCpf = Persons.find((person) => person.cpf === cpf);
  const personName = Persons.find((person) => person.name === name);

  if (!personCpf || !personName) return res.status(404).json();

  res.json(Persons);
});

app.delete("/clean", (req, res) => {
  Persons = [];

  return res.status(200).json({ message: "All persons deleted" });
});

app.post("/relationship", (req, res) => {
  const { cpf1, cpf2 } = req.body;

  const person1Index = Persons.findIndex((person) => person.cpf === cpf1);
  const person2Index = Persons.findIndex((person) => person.cpf === cpf2);

  //ENTENDER ISSO
  if (person1Index !== -1 && person2Index !== -1) {
    const relationshipPerson1 = Persons[person1Index].relations;
    const relationshipPerson2 = Persons[person2Index].relations;

    if (relationshipPerson1 === relationshipPerson2)
      return res.status(404).json({ message: "Input invalid" });

    if (
      !relationshipPerson1.includes(cpf1) &&
      !relationshipPerson1.includes(cpf2)
    ) {
      if (
        !relationshipPerson2.includes(cpf1) &&
        !relationshipPerson2.includes(cpf2)
      ) {
        relationshipPerson2.push(cpf1);
        relationshipPerson1.push(cpf2);

        Persons[person1Index].relations = relationshipPerson1;
        Persons[person2Index].relations = relationshipPerson2;

        return res.status(200).json();
      }
    }
  }

  return res.status(404).json({ message: "Input invalid" });
});

app.get("/recommendations/:cpf", (req, res) => {});

app.listen(3000, () => {
  console.log("server is running");
});
