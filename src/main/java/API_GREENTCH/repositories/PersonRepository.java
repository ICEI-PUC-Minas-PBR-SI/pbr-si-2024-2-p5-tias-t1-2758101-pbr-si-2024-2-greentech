package API_GREENTCH.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import API_GREENTCH.model.Person;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {}
