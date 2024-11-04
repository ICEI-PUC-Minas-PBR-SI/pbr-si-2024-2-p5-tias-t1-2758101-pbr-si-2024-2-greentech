package API_GREENTCH.login.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import API_GREENTCH.models.Person;


public interface PersonRepository extends JpaRepository<Person, Long> {
    
}
