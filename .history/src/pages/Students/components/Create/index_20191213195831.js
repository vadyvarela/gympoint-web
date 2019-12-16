export default function StudentForm() {
  const { id } = useParams();
  const [student, setStudent] = useState({});
  const dispath = useDispatch();

  function handleSubmit(data) {
    dispath(studentsSaveRequest({ ...data, id }));
  }

  if (id) {
    useEffect(() => {
      async function fetchData() {
        const response = await api.get(
          `students?page=${page}&student_name=${studentToSearch}`
        );
        setStudents(response.data);
      }

      fetchData();
    }, [id]);
  }
  useEffect(() => {
    if (id) {
      async function loadStudent() {
        const res = await api.get(`students/${id}`);
        setStudent(res.data);
      }

      loadStudent();
    }
  }, [id]);

  return (
    <Container>
      <HeaderPage>
        <Title>{id > 0 ? 'Edição de aluno' : 'Cadastro de aluno'}</Title>
        <Controls>
          <ButtonLink to="/alunos" color={colors.second}>
            <MdArrowBack size={24} color="#fff" />
            <span>Voltar</span>
          </ButtonLink>
          <Button
            type="submit"
            label="Salvar"
            icon={<MdDone size={24} color="#fff" />}
            form="formStudent"
          />
        </Controls>
      </HeaderPage>

      <Panel>
        <Form
          id="formStudent"
          initialData={student}
          schema={schema}
          onSubmit={handleSubmit}
        >
          <Input name="id" type="hidden" />
          <Label>NOME COMPLETO</Label>
          <Input name="name" placeholder="Digite seu nome completo" />

          <Label>E-MAIL</Label>
          <Input
            name="email"
            type="email"
            placeholder="Digite seu endereço de e-Mail"
          />
          <Row>
            <Column mobile="12" desktop="4">
              <FormGroup>
                <Label>IDADE</Label>
                <Input type="number" name="age" placeholder="Sua Idade" />
              </FormGroup>
            </Column>
            <Column mobile="12" desktop="4">
              <FormGroup>
                <Label>PESO (em kg)</Label>
                <Input
                  step="0.01"
                  type="number"
                  name="weight"
                  placeholder="Seu Peso"
                />
              </FormGroup>
            </Column>
            <Column mobile="12" desktop="4">
              <FormGroup>
                <Label>ALTURA</Label>
                <Input
                  step="0.01"
                  type="number"
                  name="feet_tall"
                  placeholder="Sua Altura"
                />
              </FormGroup>
            </Column>
          </Row>
        </Form>
      </Panel>
    </Container>
  );
}
