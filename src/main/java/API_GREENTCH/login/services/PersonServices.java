package API_GREENTCH.login.services;

import java.util.List;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import API_GREENTCH.exceptions.ResourceNotFoundException;
import API_GREENTCH.login.repositories.PersonRepository;
import API_GREENTCH.models.Endereco;
import API_GREENTCH.models.Person;

@Service
public class PersonServices {

	private Logger logger = Logger.getLogger(PersonServices.class.getName());

	@Autowired
	PersonRepository repository;

	public List<Person> findAll() {

		return repository.findAll();
	}

	public Person findById(Long id) {

		logger.info("finding a person");

		Person person = new Person();

		
		return repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Id n encontrado"));
	}

	public Person createPerson(Person p) {

		return repository.save(p);
	}

	public Person updatePerson(Long id, Person personUpdates) {
        Person existingPerson = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Person not found"));

        // Atualiza os dados
        existingPerson.setFirstName(personUpdates.getFirstName());
        existingPerson.setLastName(personUpdates.getLastName());
        existingPerson.setGender(personUpdates.getGender());

        // Limpa e adiciona novos endereços
        existingPerson.getEnderecos().clear();
        for (Endereco endereco : personUpdates.getEnderecos()) {
            existingPerson.addEndereco(endereco); // Adiciona e configura a referência
        }

        return repository.save(existingPerson);
    }

	public void deletePerson(Long id) {

		var entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Id n encontrado"));

		repository.delete(entity);

	}

}
