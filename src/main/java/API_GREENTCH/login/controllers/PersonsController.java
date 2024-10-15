package API_GREENTCH.login.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import API_GREENTCH.login.services.PersonServices;
import API_GREENTCH.models.Person;


@RestController
@RequestMapping("/person")
public class PersonsController {
	
	@Autowired
	private PersonServices service;
	
	@RequestMapping(value ="/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public Person findById(@PathVariable(value = "id")Long id ) {
		return service.findById(id);
	}
	
	@RequestMapping(value ="/{id}",method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public Person update(@RequestBody Person p, @PathVariable(value = "id")Long id) {
		return service.updatePerson(p,id);
	}
	

	@RequestMapping(value ="/{id}", method = RequestMethod.DELETE)
	public void deletePerson(@PathVariable(value = "id")Long id ) {
		 service.deletePerson(id);
	}
	
	
	@RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Person> findAll() {
		return service.findAll();
	}
	
	@RequestMapping(method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public Person create(@RequestBody Person p) {
		return service.createPerson(p);
	}
	

	
	
	 

}