package API_GREENTCH.login.services;

import java.util.List;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import API_GREENTCH.exceptions.ResourceNotFoundException;
import API_GREENTCH.login.repositories.PersonRepository;
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

	public Person updatePerson(Person p, Long id) {
		var entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Id n encontrado"));

		entity.setFirstName(p.getFirstName());
		entity.setLastName(p.getLastName());
		entity.setAddress(p.getAddress());
		entity.setGender(p.getGender());

		return repository.save(entity);
	}

	public void deletePerson(Long id) {

		var entity = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Id n encontrado"));

		repository.delete(entity);

	}

}
