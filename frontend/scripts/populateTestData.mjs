import fetch from "node-fetch";

const populateTestData = async () => {
  const baseUrl = "http://localhost:8080/person";

  const genders = ["Feminino", "Masculino", "Outros"];
  const cities = [
    { cidade: "São Paulo", estado: "SP", cep: "01001-000" },
    { cidade: "Rio de Janeiro", estado: "RJ", cep: "20010-000" },
    { cidade: "Belo Horizonte", estado: "MG", cep: "30110-000" },
    { cidade: "Curitiba", estado: "PR", cep: "80010-000" },
    { cidade: "Salvador", estado: "BA", cep: "40010-000" },
    { cidade: "Porto Alegre", estado: "RS", cep: "90010-000" },
    { cidade: "Brasília", estado: "DF", cep: "70040-000" },
    { cidade: "Fortaleza", estado: "CE", cep: "60010-000" },
    { cidade: "Recife", estado: "PE", cep: "50010-000" },
    { cidade: "Manaus", estado: "AM", cep: "69010-000" },
    { cidade: "Belém", estado: "PA", cep: "66010-000" },
    { cidade: "Goiânia", estado: "GO", cep: "74010-000" },
    { cidade: "Campinas", estado: "SP", cep: "13010-000" },
    { cidade: "São Luís", estado: "MA", cep: "65010-000" },
    { cidade: "Maceió", estado: "AL", cep: "57010-000" },
    { cidade: "João Pessoa", estado: "PB", cep: "58010-000" },
    { cidade: "Natal", estado: "RN", cep: "59010-000" },
    { cidade: "Aracaju", estado: "SE", cep: "49010-000" },
    { cidade: "Florianópolis", estado: "SC", cep: "88010-000" },
    { cidade: "Vitória", estado: "ES", cep: "29010-000" },
  ];

  const generateRandomUser = (index) => {
    const cityData = cities[Math.floor(Math.random() * cities.length)];
    return {
      firstName: `User${index}`,
      lastName: `Last${index}`,
      gender: genders[Math.floor(Math.random() * genders.length)],
      email: `user${index}@example.com`,
      password: "password123",
      confirmPassword: "password123",
      enderecos: [
        {
          logradouro: `Rua Teste ${index}`,
          number: `${100 + index}`,
          cep: cityData.cep,
          cidade: cityData.cidade,
          estado: cityData.estado,
        },
      ],
    };
  };

  const createUser = async (userData) => {
    try {
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log(`Usuário ${userData.firstName} registrado com sucesso.`);
      } else {
        const errorData = await response.json();
        console.error(
          `Erro ao registrar ${userData.firstName}: ${errorData.message}`
        );
      }
    } catch (error) {
      console.error(
        `Erro ao registrar ${userData.firstName}:`,
        error.message || error
      );
    }
  };

  console.log("Iniciando o registro de usuários de teste...");

  for (let i = 1; i <= 1500; i++) {
    const userData = generateRandomUser(i);
    await createUser(userData);

    // Delay de 200ms entre registros para atualização gradual
    await new Promise((resolve) => setTimeout(resolve, 200));

    if (i % 100 === 0) {
      console.log(`${i} registros criados até agora.`);
    }
  }

  console.log("Registro de usuários de teste concluído.");
};

populateTestData();
