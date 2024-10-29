package API_GREENTCH.login.controllers;

import java.net.http.HttpResponse;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import API_GREENTCH.login.services.PersonServices;
import API_GREENTCH.models.Endereco;
import API_GREENTCH.models.Person;


@RestController
@RequestMapping("/person")
public class PersonsController {
	
	@Autowired
	private PersonServices service;
	
	@GetMapping(value ="/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public Person findById(@PathVariable(value = "id")Long id ) {
		return service.findById(id);
	}
	
	@PutMapping(value ="/{id}", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public Person update(@RequestBody Person p, @PathVariable(value = "id")Long id) {
		return service.updatePerson(id,p);
	}


	@DeleteMapping("/{id}")
	public ResponseEntity<?> deletePerson(@PathVariable(value = "id")Long id ) {
		 service.deletePerson(id);
		 return ResponseEntity.noContent().build();
	}
	
	
	@GetMapping( produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Person> findAll() {
		return service.findAll();
	}
	
	@PostMapping( produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Person>create(@RequestBody Person p) {
		if (p.getEnderecos() != null) {
			for (Endereco endereco : p.getEnderecos()) {
				endereco.setPerson(p);
			}
		}
		return ResponseEntity.ok(service.createPerson(p));
	}
	


	 

}
